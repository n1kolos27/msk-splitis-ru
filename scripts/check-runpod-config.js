/**
 * Скрипт проверки конфигурации RunPod API
 * Проверяет наличие переменных окружения и их формат
 * 
 * Использование:
 * node scripts/check-runpod-config.js
 */

// Загрузка переменных окружения из .env файла
let envLoaded = false;
try {
  const result = require('dotenv').config();
  if (result.error) {
    console.log('⚠️  Ошибка загрузки .env файла:', result.error.message);
    console.log('   Проверьте, что файл .env существует в корне проекта\n');
  } else {
    envLoaded = true;
    console.log('✅ Файл .env загружен успешно');
    
    // Показываем какие переменные загружены (без значений)
    const envKeys = Object.keys(result.parsed || {});
    if (envKeys.length > 0) {
      console.log(`   Загружено переменных: ${envKeys.length}`);
      console.log(`   Переменные: ${envKeys.join(', ')}\n`);
    } else {
      console.log('   ⚠️  Файл .env пуст или не содержит переменных\n');
    }
  }
} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') {
    console.log('⚠️  dotenv не установлен. Установите: npm install dotenv\n');
  } else {
    console.log('⚠️  Не удалось загрузить .env файл:', e.message);
    console.log('   Используем только process.env\n');
  }
}

const RUNPOD_API_KEY = process.env.RUNPOD_API_KEY;
const ENDPOINT_ID = process.env.RUNPOD_ENDPOINT_ID || 'r1c37wn8la';

console.log('🔍 Проверка конфигурации RunPod API\n');
console.log('='.repeat(50));

// Проверка RUNPOD_API_KEY
if (!RUNPOD_API_KEY) {
  console.log('❌ RUNPOD_API_KEY: НЕ УСТАНОВЛЕН');
  console.log('   Добавьте в .env файл: RUNPOD_API_KEY=ваш_ключ');
  if (!envLoaded) {
    console.log('   ⚠️  Файл .env не загружен, проверьте его наличие в корне проекта');
  }
  console.log('');
} else {
  if (RUNPOD_API_KEY.length < 20) {
    console.log('⚠️  RUNPOD_API_KEY: Подозрительно короткий');
    console.log(`   Длина: ${RUNPOD_API_KEY.length} символов`);
    console.log(`   Значение: ${RUNPOD_API_KEY.substring(0, 20)}...\n`);
  } else {
    console.log('✅ RUNPOD_API_KEY: Установлен');
    console.log(`   Длина: ${RUNPOD_API_KEY.length} символов`);
    console.log(`   Префикс: ${RUNPOD_API_KEY.substring(0, 20)}...`);
    console.log(`   Формат: ${RUNPOD_API_KEY.startsWith('RUNPOD_API_KEY_') ? '✅ Правильный' : '⚠️  Нестандартный формат'}\n`);
  }
}

// Проверка RUNPOD_ENDPOINT_ID
if (!ENDPOINT_ID) {
  console.log('❌ RUNPOD_ENDPOINT_ID: НЕ УСТАНОВЛЕН');
  console.log('   Будет использован дефолтный: r1c37wn8la\n');
} else {
  console.log('✅ RUNPOD_ENDPOINT_ID: Установлен');
  console.log(`   Значение: ${ENDPOINT_ID}\n`);
}

// Проверка формата endpoint ID
if (ENDPOINT_ID && !/^[a-z0-9]+$/.test(ENDPOINT_ID)) {
  console.log('⚠️  RUNPOD_ENDPOINT_ID: Неверный формат');
  console.log('   Должен содержать только строчные буквы и цифры\n');
}

console.log('='.repeat(50));

// Итоговая проверка
if (RUNPOD_API_KEY && RUNPOD_API_KEY.length >= 20) {
  console.log('\n✅ Конфигурация корректна!');
  console.log('   Можно запускать генерацию изображений:\n');
  console.log('   npm run generate:images -- --type=products');
  console.log('   npm run generate:images -- --type=services');
  console.log('   npm run generate:images -- --type=blog\n');
} else {
  console.log('\n❌ Конфигурация неполная!');
  console.log('   Установите RUNPOD_API_KEY в файле .env\n');
  process.exit(1);
}

// Проверка доступности API (опционально)
if (RUNPOD_API_KEY && RUNPOD_API_KEY.length >= 20) {
  console.log('📡 Проверка доступности RunPod API...\n');
  
  fetch(`https://api.runpod.io/v2/${ENDPOINT_ID}/health`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${RUNPOD_API_KEY}`
    }
  })
  .then(response => {
    if (response.ok) {
      console.log('✅ RunPod API доступен');
    } else {
      console.log(`⚠️  RunPod API вернул статус: ${response.status}`);
      console.log('   Это нормально, если endpoint еще не запущен');
    }
  })
  .catch(error => {
    console.log('⚠️  Не удалось проверить доступность API');
    console.log(`   Ошибка: ${error.message}`);
    console.log('   Это нормально, если endpoint еще не запущен');
  })
  .finally(() => {
    console.log('\n✅ Проверка завершена!\n');
  });
}

