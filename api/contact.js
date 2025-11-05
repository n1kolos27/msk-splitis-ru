/**
 * Vercel Serverless Function для отправки формы через Resend
 * Путь: /api/contact
 */

const { Resend } = require('resend');

module.exports = async (req, res) => {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  // Обработка OPTIONS запроса (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Получаем данные формы
    const { name, phone, email, message } = req.body;

    // Валидация
    if (!name || !phone) {
      return res.status(400).json({ error: 'Имя и телефон обязательны для заполнения' });
    }

    // Получаем API ключ Resend из переменных окружения
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY не установлен');
      return res.status(500).json({ error: 'Ошибка конфигурации сервера' });
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
      <p><small>IP адрес: ${req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'неизвестно'}</small></p>
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
      return res.status(500).json({ error: 'Ошибка при отправке письма. Попробуйте позже или свяжитесь с нами по телефону.' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Заявка успешно отправлена',
      id: data?.id 
    });

  } catch (error) {
    console.error('Ошибка обработки запроса:', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

