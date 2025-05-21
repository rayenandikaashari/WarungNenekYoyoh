function loadCartItems() {
    const cartJson = localStorage.getItem('cart');

    if (cartJson) {
        const cart = JSON.parse(cartJson);
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        document.querySelector('h1').textContent = `${cart.length} Items In Cart`;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Keranjang Anda kosong. <a href="katalog.html">Kembali belanja</a></p>';
            document.querySelector('.cart-total').style.display = 'none';
            document.querySelector('.checkout-button').style.display = 'none';
            return;
        }

        let totalPrice = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.harga * item.jumlah;
            totalPrice += itemTotal;

            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.gambar}" alt="${item.nama}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.nama}</div>
                    <div class="cart-item-price">Rp${item.harga.toLocaleString('id-ID')}</div>
                    <div class="quantity-control">
                        <button class="quantity-button" onclick="decreaseQuantity(${index})">-</button>
                        <span class="quantity">${item.jumlah}</span>
                        <button class="quantity-button" onclick="increaseQuantity(${index})">+</button>
                    </div>
                </div>
                <button class="remove-button" onclick="removeItem(${index})">×</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        document.querySelector('.total-price').textContent = `Rp. ${totalPrice.toLocaleString('id-ID')}`;
        document.querySelector('.cart-total').style.display = 'block';
        document.querySelector('.checkout-button').style.display = 'inline-block';
    } else {
        document.querySelector('h1').textContent = '0 Items In Cart';
        document.getElementById('cart-items').innerHTML = '<p>Keranjang Anda kosong. <a href="katalog.html">Kembali belanja</a></p>';
        document.querySelector('.cart-total').style.display = 'none';
        document.querySelector('.checkout-button').style.display = 'none';
    }
}

function increaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart[index].jumlah += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

function decreaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart[index].jumlah > 1) {
        cart[index].jumlah -= 1;
    } else {
        removeItem(index);
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

document.addEventListener('DOMContentLoaded', loadCartItems);
