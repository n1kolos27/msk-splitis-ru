/**
 * Netlify Function для отправки формы через Resend
 * Путь: /api/contact
 */

const { Resend } = require('resend');

exports.handler = async (event, context) => {
  // Разрешаем CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Обработка OPTIONS запроса (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Только POST запросы
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Получаем данные формы
    const formData = JSON.parse(event.body);
    const { name, phone, email, message } = formData;

    // Валидация
    if (!name || !phone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Имя и телефон обязательны для заполнения' }),
      };
    }

    // Получаем API ключ Resend из переменных окружения
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY не установлен');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Ошибка конфигурации сервера' }),
      };
    }

    const resend = new Resend(resendApiKey);

    // Получаем email получателя из переменных окружения или используем дефолтный
    const recipientEmail = process.env.CONTACT_EMAIL || 'info@msk.splitis.ru';

    // Формируем тему письма
    const subject = `Новая заявка с сайта msk.splitis.ru${name ? ` от ${name}` : ''}`;

    // Формируем тело письма
    const emailBody = `
      <h2>Новая заявка с сайта</h2>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
      ${message ? `<p><strong>Сообщение:</strong><br>${message.replace(/\n/g, '<br>')}</p>` : ''}
      <hr>
      <p><small>Дата отправки: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</small></p>
      <p><small>IP адрес: ${event.headers['x-forwarded-for'] || event.headers['x-nf-client-connection-ip'] || 'неизвестно'}</small></p>
    `;

    // Отправляем письмо
    const { data, error } = await resend.emails.send({
      from: 'noreply@msk.splitis.ru', // Замените на ваш верифицированный домен в Resend
      to: recipientEmail,
      replyTo: email || recipientEmail,
      subject: subject,
      html: emailBody,
    });

    if (error) {
      console.error('Ошибка отправки через Resend:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Ошибка при отправке письма. Попробуйте позже или свяжитесь с нами по телефону.' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Заявка успешно отправлена',
        id: data?.id 
      }),
    };

  } catch (error) {
    console.error('Ошибка обработки запроса:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Внутренняя ошибка сервера' }),
    };
  }
};

