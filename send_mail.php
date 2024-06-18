<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $phone = trim($_POST['phone']);

    if (empty($name) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Пожалуйста, заполните все поля.']);
        exit;
    }

    $to = 'dkuzmenko380@gmail.com';
    $subject = 'Обратный звонок';
    $message = "Имя: $name\nТелефон: $phone";
    $headers = 'From: no-reply@example.com' . "\r\n" .
               'Reply-To: no-reply@example.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка при отправке электронной почты.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Неверный метод запроса.']);
}
?>
