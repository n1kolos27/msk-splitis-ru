<?php
/**
 * API endpoint для отправки форм через Resend
 * Путь: /api/contact.php
 * Использование: для VPS с PHP (Apache/Nginx)
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Обработка OPTIONS запроса (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Только POST запросы
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Получаем данные из тела запроса
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// Валидация
$name = isset($data['name']) ? trim($data['name']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$message = isset($data['message']) ? trim($data['message']) : '';

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['error' => 'Имя и телефон обязательны для заполнения']);
    exit;
}

// Получаем API ключ Resend из переменных окружения или конфига
$resendApiKey = getenv('RESEND_API_KEY') ?: 're_RfkBrEkZ_7gYxeyyNDhtR6AvYTQBmem3j';
$recipientEmail = getenv('CONTACT_EMAIL') ?: 'info@msk.splitis.ru';

if (empty($resendApiKey)) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка конфигурации сервера']);
    exit;
}

// Формируем тему письма
$subject = 'Новая заявка с сайта msk.splitis.ru' . ($name ? ' от ' . $name : '');

// Формируем тело письма
$emailBody = '<h2>Новая заявка с сайта</h2>';
$emailBody .= '<p><strong>Имя:</strong> ' . htmlspecialchars($name) . '</p>';
$emailBody .= '<p><strong>Телефон:</strong> ' . htmlspecialchars($phone) . '</p>';
if ($email) {
    $emailBody .= '<p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>';
}
if ($message) {
    $emailBody .= '<p><strong>Сообщение:</strong><br>' . nl2br(htmlspecialchars($message)) . '</p>';
}
$emailBody .= '<hr>';
$emailBody .= '<p><small>Дата отправки: ' . date('d.m.Y H:i:s', time() + 3 * 3600) . ' (MSK)</small></p>';
$emailBody .= '<p><small>IP адрес: ' . ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'неизвестно') . '</small></p>';

// Отправка через Resend API
$resendUrl = 'https://api.resend.com/emails';

$postData = [
    'from' => 'noreply@msk.splitis.ru', // Замените на ваш верифицированный домен
    'to' => $recipientEmail,
    'reply_to' => $email ?: $recipientEmail,
    'subject' => $subject,
    'html' => $emailBody
];

$ch = curl_init($resendUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $resendApiKey,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    error_log('Resend API Error: ' . $curlError);
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка при отправке письма. Попробуйте позже или свяжитесь с нами по телефону.']);
    exit;
}

$responseData = json_decode($response, true);

if ($httpCode !== 200 || isset($responseData['error'])) {
    error_log('Resend API Error: ' . ($responseData['error']['message'] ?? 'Unknown error'));
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка при отправке письма. Попробуйте позже или свяжитесь с нами по телефону.']);
    exit;
}

// Успешная отправка
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Заявка успешно отправлена',
    'id' => $responseData['id'] ?? null
]);
?>

