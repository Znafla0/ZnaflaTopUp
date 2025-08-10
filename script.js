document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const game = document.getElementById('game').value;
  const idgame = document.getElementById('idgame').value.trim();
  const nominal = document.getElementById('nominal').value;
  const payment = document.getElementById('payment').value;

  if (!game || !idgame || !nominal || !payment) {
    alert('Mohon isi semua data dengan benar!');
    return;
  }

  // Buat pesan order untuk WhatsApp
  const message = 
    `Halo, saya ingin order top up game:%0A` +
    `- Game: ${game}%0A` +
    `- ID Game: ${idgame}%0A` +
    `- Nominal: ${nominal}%0A` +
    `- Metode Pembayaran: ${payment}%0A` +
    `%0ATolong diproses ya, terima kasih!`;

  // Ganti nomor WhatsApp sesuai nomor supplier kamu
  const waNumber = '6281234567890';

  const waURL = `https://wa.me/${waNumber}?text=${message}`;

  window.open(waURL, '_blank');
});
