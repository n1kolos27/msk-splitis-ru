/**
 * RunPod Image Generator - Утилита для генерации изображений через RunPod API
 * 
 * Использование:
 * node scripts/generate-images.js --type products --count 5
 * node scripts/generate-images.js --type blog --article "kak-vybrat-kondicioner"
 */

const fs = require('fs');
const path = require('path');

// Загрузка переменных окружения из .env файла
try {
  require('dotenv').config();
} catch (e) {
  // dotenv не критичен, можно работать без него
  if (process.env.NODE_ENV !== 'production') {
    console.log('ℹ️  dotenv не установлен, используем только process.env\n');
  }
}

// Конфигурация RunPod API
const RUNPOD_API_KEY = process.env.RUNPOD_API_KEY;
const ENDPOINT_ID = process.env.RUNPOD_ENDPOINT_ID || 'r1c37wn8la';

// RunPod Serverless API endpoints
// Для Serverless endpoints используется api.runpod.ai, а не api.runpod.io
const RUNPOD_API_BASE = 'https://api.runpod.ai/v2';
const RUN_URL = `${RUNPOD_API_BASE}/${ENDPOINT_ID}/run`;
const STATUS_URL = `${RUNPOD_API_BASE}/${ENDPOINT_ID}/status`;
const STREAM_URL = `${RUNPOD_API_BASE}/${ENDPOINT_ID}/stream`;

// Проверка наличия API ключа
if (!RUNPOD_API_KEY) {
  console.error('❌ Ошибка: RUNPOD_API_KEY не установлен в переменных окружения');
  console.log('\nДобавьте в .env файл:');
  console.log('RUNPOD_API_KEY=RUNPOD_API_KEY_ABC123XYZ456DEF789');
  console.log('RUNPOD_ENDPOINT_ID=r1c37wn8la\n');
  console.log('Или через секреты платформы:');
  console.log('Secret Name: runpod_api_key');
  console.log('Secret Value: ваш_api_ключ\n');
  process.exit(1);
}

console.log(`🔑 Используется Endpoint ID: ${ENDPOINT_ID}`);
console.log(`🔗 API Base: ${RUNPOD_API_BASE}\n`);

/**
 * Генерация изображения через RunPod Serverless API
 * 
 * @param {string} prompt - Промпт для генерации
 * @param {number} width - Ширина изображения (по умолчанию 1024)
 * @param {number} height - Высота изображения (по умолчанию 1024)
 * @returns {Promise<string>} - Base64 изображение или URL
 */
async function generateImage(prompt, width = 1024, height = 1024) {
  try {
    console.log(`🔄 Генерация изображения:`);
    console.log(`   Промпт: ${prompt.substring(0, 80)}...`);
    console.log(`   Размер: ${width}×${height}px\n`);
    
    // Запуск задачи генерации через RunPod Serverless API
    const runResponse = await fetch(RUN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RUNPOD_API_KEY}`
      },
      body: JSON.stringify({
        input: {
          prompt: prompt,
          num_inference_steps: 50,
          guidance_scale: 7.5,
          width: width,
          height: height,
          negative_prompt: 'blurry, low quality, distorted, watermark, text, signature, logo',
          sampler_name: 'DPM++ 2M Karras',
          seed: -1, // Случайный seed для уникальности
        }
      })
    });

    if (!runResponse.ok) {
      const errorText = await runResponse.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      
      // Детальная информация об ошибке для диагностики
      console.error('\n🔍 Детали ошибки:');
      console.error(`   URL: ${RUN_URL}`);
      console.error(`   Статус: ${runResponse.status}`);
      console.error(`   Ответ: ${errorText.substring(0, 200)}`);
      
      throw new Error(`API Error ${runResponse.status}: ${errorData.message || errorData.error || errorText}`);
    }

    const runData = await runResponse.json();
    
    // Проверка ответа RunPod API
    if (runData.error) {
      throw new Error(`RunPod API Error: ${runData.error}`);
    }

    const jobId = runData.id;

    if (!jobId) {
      console.error('Полный ответ API:', JSON.stringify(runData, null, 2));
      throw new Error('Не получен job ID от API. Проверьте endpoint ID и формат запроса.');
    }

    console.log(`✅ Задача создана: ${jobId}`);
    console.log(`⏳ Ожидание завершения генерации...\n`);

    // Ожидание завершения генерации
    let status = 'IN_QUEUE';
    let attempts = 0;
    const maxAttempts = 120; // Максимум 10 минут (120 × 5 сек)
    let lastStatus = '';

    while (status !== 'COMPLETED' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Ждем 5 секунд

      const statusResponse = await fetch(`${STATUS_URL}/${jobId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RUNPOD_API_KEY}`
        }
      });

      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        throw new Error(`Status check failed: ${statusResponse.status} - ${errorText}`);
      }

      const statusData = await statusResponse.json();
      
      // RunPod может возвращать статус в разных форматах
      status = statusData.status || statusData.status || 'UNKNOWN';
      
      if (status !== lastStatus) {
        console.log(`   📊 Статус: ${status}`);
        lastStatus = status;
      }

      if (status === 'FAILED') {
        console.error('Полный ответ с ошибкой:', JSON.stringify(statusData, null, 2));
        throw new Error(`Генерация провалилась: ${statusData.error || JSON.stringify(statusData)}`);
      }

      // Если статус COMPLETED, получаем результат
      if (status === 'COMPLETED') {
        const output = statusData.output || statusData;
        
        // Проверяем разные форматы ответа RunPod
        if (output.image) {
          return output.image;
        } else if (output.images && output.images.length > 0) {
          return output.images[0]; // Берем первое изображение
        } else if (output.url) {
          return output.url;
        } else if (Array.isArray(output) && output.length > 0) {
          return output[0];
        } else {
          console.error('Неожиданный формат ответа:', JSON.stringify(statusData, null, 2));
          throw new Error('Изображение не найдено в ответе API. Проверьте формат ответа.');
        }
      }

      attempts++;
      
      // Показываем прогресс каждые 10 попыток
      if (attempts % 10 === 0) {
        process.stdout.write(`   ⏳ Попытка ${attempts}/${maxAttempts}...\r`);
      }
    }

    console.log(''); // Новая строка

    if (status !== 'COMPLETED') {
      throw new Error(`Превышено время ожидания (${maxAttempts * 5} секунд). Последний статус: ${status}`);
    }

  } catch (error) {
    console.error(`\n❌ Ошибка генерации: ${error.message}`);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    throw error;
  }
}

/**
 * Сохранение изображения
 */
async function saveImage(imageData, outputPath) {
  try {
    // Если изображение в base64
    if (imageData.startsWith('data:image')) {
      const base64Data = imageData.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(outputPath, buffer);
    } 
    // Если это URL
    else if (imageData.startsWith('http')) {
      const response = await fetch(imageData);
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(outputPath, Buffer.from(buffer));
    }
    // Если уже base64 без префикса
    else {
      const buffer = Buffer.from(imageData, 'base64');
      fs.writeFileSync(outputPath, buffer);
    }

    console.log(`✅ Изображение сохранено: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Ошибка сохранения: ${error.message}`);
    throw error;
  }
}

/**
 * Промпты для разных типов изображений
 */
const PROMPTS = {
  products: {
    'daikin-ftxs25k': 'Professional product photography of Daikin FTXS25K air conditioner, white modern design, clean white background, studio lighting, high quality commercial photo, 8K resolution, sharp focus',
    'mitsubishi-msz-ln25': 'Professional product photography of Mitsubishi MSZ-LN25 air conditioner, white modern design, clean white background, studio lighting, high quality commercial photo, 8K resolution',
    'lg-s12eq3': 'Professional product photography of LG S12EQ3 air conditioner, white modern design, clean white background, studio lighting, high quality commercial photo, 8K resolution',
  },
  services: {
    ustanovka: 'Professional photo of air conditioner installation in modern apartment in Moscow, skilled technician working with tools, realistic interior, natural lighting, high detail, commercial photography style',
    obsluzhivanie: 'Professional photo of air conditioner maintenance service, technician cleaning filters, modern apartment interior in Moscow, natural lighting, realistic, high quality',
    remont: 'Professional photo of air conditioner repair service, technician diagnosing problems, modern apartment interior in Moscow, natural lighting, realistic, high quality',
    zapravka: 'Professional photo of air conditioner refrigerant refilling service, technician working with equipment, modern apartment interior in Moscow, natural lighting, realistic, high quality',
  },
  blog: {
    'kak-vybrat-kondicioner': 'Professional illustration guide for choosing air conditioner for apartment in Moscow, infographic style, modern design, clear and informative, high quality',
    'rejting-konicionerov-2024': 'Professional photography of top air conditioner models 2024 in Moscow, comparison layout, modern design, high quality commercial photo',
  }
};

/**
 * Главная функция
 */
async function main() {
  const args = process.argv.slice(2);
  const type = args.find(arg => arg.startsWith('--type'))?.split('=')[1];
  const count = parseInt(args.find(arg => arg.startsWith('--count'))?.split('=')[1] || '1');
  const article = args.find(arg => arg.startsWith('--article'))?.split('=')[1];

  if (!type) {
    console.log('Использование:');
    console.log('  node scripts/generate-images.js --type=products --count=5');
    console.log('  node scripts/generate-images.js --type=services --count=4');
    console.log('  node scripts/generate-images.js --type=blog --article=kak-vybrat-kondicioner');
    process.exit(1);
  }

  console.log(`🎨 Генерация изображений типа: ${type}`);
  console.log(`📊 Количество: ${count}`);
  console.log(`🔑 Endpoint ID: ${ENDPOINT_ID}\n`);

  try {
    const prompts = PROMPTS[type];
    if (!prompts) {
      throw new Error(`Неизвестный тип: ${type}`);
    }

    const outputDir = path.join(__dirname, '../assets/images', type);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Генерация изображений
    const entries = Object.entries(prompts);
    let generated = 0;
    
    for (const [key, prompt] of entries) {
      if (article && key !== article) continue; // Фильтр по статье если указана
      
      try {
        console.log(`\n📸 [${generated + 1}/${entries.length}] Генерация: ${key}`);
        
        // Определяем размеры в зависимости от типа
        let width = 1024, height = 1024;
        if (type === 'services') {
          width = 1920; height = 1080; // Hero изображения
        } else if (type === 'blog') {
          width = 1920; height = 1080; // Hero для статей
        } else if (type === 'products') {
          width = 800; height = 600; // Продукты
        }
        
        const imageData = await generateImage(prompt, width, height);
        
        // Сохраняем в PNG (позже можно конвертировать в WebP + JPG)
        const outputPath = path.join(outputDir, `${key}.png`);
        await saveImage(imageData, outputPath);
        
        generated++;
        console.log(`   ✅ Успешно сгенерировано: ${key}\n`);
      } catch (error) {
        console.error(`   ❌ Ошибка при генерации ${key}: ${error.message}\n`);
        // Продолжаем генерацию других изображений
      }
    }

    console.log('\n✅ Все изображения успешно сгенерированы!');
  } catch (error) {
    console.error(`\n❌ Критическая ошибка: ${error.message}`);
    process.exit(1);
  }
}

// Запуск
if (require.main === module) {
  main();
}

module.exports = { generateImage, saveImage };

