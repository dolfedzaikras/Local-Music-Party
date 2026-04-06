<?php
header('Content-Type: application/json; charset=utf-8');

$host = 'localhost';
$dbname = 'ci892312_31231';
$user = 'ci892312_31231';
$pass = '85dRzjHF';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT id, title, artist_name, city, venue, concert_date, description, status, photo
            FROM concert
            WHERE status = 'completed'
            ORDER BY id DESC";

    $stmt = $pdo->query($sql);
    $concerts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($concerts, JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    echo json_encode([
        'error' => true,
        'message' => 'Ошибка подключения к базе: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}