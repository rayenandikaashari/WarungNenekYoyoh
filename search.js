let allProducts = []; // Global variable untuk menyimpan produk dari database

// Function to redirect to search page
function redirectToSearchPage() {
    const query = document.getElementById('search-input').value;
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
}

// Function to save product data to localStorage when a product is clicked
function viewProduct(productId) {
    const product = allProducts.find(p => p.id == productId);

    if (product) {
        localStorage.setItem('currentProduct', JSON.stringify(product));
        window.location.href = 'detail.html?id=' + productId;
    }
}

// Function to load products (from backend)
function loadProducts(category = 'all') {
    fetch(`get_products.php?kategori=${category}`)
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            renderProducts(category);
        })
        .catch(error => console.error('Gagal memuat produk:', error));
}

// Render product cards ke halaman
function renderProducts(category) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    const filteredProducts = category === 'all' 
        ? allProducts 
        : allProducts.filter(product => product.kategori === category);

    filteredProducts.forEach(product => {
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

// Function to search products
function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();

    if (query === '') {
        renderProducts('all');
        return;
    }

    const filteredProducts = allProducts.filter(product =>
        product.nama.toLowerCase().includes(query) ||
        product.kategori.toLowerCase().includes(query)
    );

    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    filteredProducts.forEach(product => {
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

function filterByCategory(category, element) {
    renderProducts(category);

    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => item.classList.remove('active'));
    element.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    searchInput.focus();

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    // Ambil semua data produk dulu
    loadProducts();

    // Setelah produk dimuat, jalankan pencarian jika ada query
    if (query) {
        searchInput.value = query;

        // Tunggu data produk dimuat, lalu cari
        const checkLoaded = setInterval(() => {
            if (allProducts.length > 0) {
                clearInterval(checkLoaded);
                searchProducts();
            }
        }, 100);
    }
});
