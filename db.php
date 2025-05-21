<?php
$host = "localhost";
$user = "root";         // Ganti jika user bukan 'root'
$password = "";         // Ganti jika pakai password
$dbname = "warung_db";  // Sesuaikan nama database kamu

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>
