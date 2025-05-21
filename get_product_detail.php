<?php
require 'db.php';

if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'ID produk tidak ditemukan']);
    exit;
}

$id = intval($_GET['id']);
$query = $conn->prepare("SELECT * FROM produk WHERE id = ?");
$query->bind_param("i", $id);
$query->execute();

$result = $query->get_result();
if ($result->num_rows === 0) {
    echo json_encode(['error' => 'Produk tidak ditemukan']);
} else {
    $product = $result->fetch_assoc();

    // Tambahkan path folder jika perlu
    if (!str_starts_with($product['gambar'], 'images/')) {
        $product['gambar'] = 'images/' . $product['gambar'];
    }

    echo json_encode($product);
}
?>
