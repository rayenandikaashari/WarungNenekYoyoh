// Function to redirect to search page
function redirectToSearchPage() {
    const query = document.getElementById('search-input').value.trim();
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
}

// Function to load products from backend
function loadProducts(category = 'all') {
    fetch(`get_products.php?kategori=${category}`)
        .then(response => response.json())
        .then(data => displayProducts(data))
        .catch(error => console.error('Gagal memuat produk:', error));
}

// Function to search products via keyword (name/category)
function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();

    fetch(`get_products.php?kategori=all`)
        .then(response => response.json())
        .then(products => {
            const filtered = products.filter(product =>
                product.nama.toLowerCase().includes(query) ||
                product.kategori.toLowerCase().includes(query)
            );
            displayProducts(filtered);
        })
        .catch(error => console.error('Gagal memuat produk:', error));
}

// Function to render product cards
function displayProducts(products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.gambar}" alt="${product.nama}">
            </div>
            <div class="product-name">${product.nama}</div>
            <div class="product-price">Rp${parseInt(product.harga).toLocaleString('id-ID')}</div>
            <button class="add-button" onclick="viewProduct(${product.id})">+</button>
        `;
        productGrid.appendChild(productElement);
    });
}

// Simpan data produk yang diklik ke localStorage
function viewProduct(productId) {
    fetch(`get_products.php?kategori=all`)
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);
            if (product) {
                localStorage.setItem('currentProduct', JSON.stringify(product));
                window.location.href = `detail.html?id=${productId}`;
            }
        })
        .catch(error => console.error('Gagal mengambil detail produk:', error));
}

// Filter berdasarkan kategori
function filterByCategory(category, element) {
    loadProducts(category);
    document.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    const searchInput = document.getElementById('search-input');
    if (query) {
        searchInput.value = query;
        searchProducts();
    } else {
        loadProducts();
    }
});
