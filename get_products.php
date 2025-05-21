<?php
header("Content-Type: application/json");
require_once 'db.php';

$kategori = $_GET['kategori'] ?? 'all';

if ($kategori !== 'all') {
    $stmt = $conn->prepare("SELECT * FROM produk WHERE kategori = ?");
    $stmt->bind_param("s", $kategori);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $result = $conn->query("SELECT * FROM produk");
}

$products = [];

while ($row = $result->fetch_assoc()) {
    $products[] = [
        "id" => $row['id'],
        "nama" => $row['nama'],
        "harga" => $row['harga'],
        "kategori" => $row['kategori'],
        "gambar" => $row['gambar'],
        "deskripsi" => $row['deskripsi']
    ];
}

echo json_encode($products);
?>
