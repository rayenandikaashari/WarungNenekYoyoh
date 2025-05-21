// Ambil parameter ID dari URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', function () {
    if (!productId) {
        console.error('ID produk tidak ditemukan di URL');
        return;
    }

    // Ambil data produk dari backend
    fetch(`get_product_detail.php?id=${productId}`)
        .then(response => response.json())
        .then(product => {
            if (product.error) {
                console.error('Error dari server:', product.error);
                return;
            }

            // Tampilkan data ke halaman
            document.getElementById('detail-image').src = product.gambar;
            document.getElementById('product-detail-name').textContent = product.nama;
            document.getElementById('product-detail-price').textContent = 'Rp' + parseInt(product.harga).toLocaleString('id-ID');
            document.getElementById('product-detail-description').textContent = product.deskripsi;

            // Simpan produk di variabel global untuk digunakan saat add to cart
            window.currentProduct = product;
        })
        .catch(error => console.error('Gagal memuat detail produk:', error));
});

function addToCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id == window.currentProduct.id);

    if (existing) {
        existing.jumlah += 1;
    } else {
        cart.push({ ...window.currentProduct, jumlah: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produk ditambahkan ke keranjang');
}
