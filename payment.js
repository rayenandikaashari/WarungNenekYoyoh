function payWithCash() {
    localStorage.removeItem('cart');
    
    alert('Anda memilih untuk membayar menggunakan cash. Terima kasih!');
    window.location.href = 'ayobelanjalagi.html'; // Navigasi ke halaman baru
}