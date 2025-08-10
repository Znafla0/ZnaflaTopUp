const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const API_TOKEN = 'dd29223db6df10a9062abe226fc2c614';
const CALLBACK_TOKEN = 'ED8eLzgiY1eylFdA9XEmtga8YPeRDDRKGTtKB4mT18fKM9';
const CALLBACK_URL = 'https://yourdomain.com/callback'; // Ganti dengan URL server kamu nanti

// Endpoint order top-up
app.post('/api/order', async (req, res) => {
  const { game, idgame, nominal, payment } = req.body;

  if (!game || !idgame || !nominal || !payment) {
    return res.status(400).json({ error: 'Data order tidak lengkap' });
  }

  try {
    const response = await axios.post('https://api.mitragamers.com/order', {
      api_token: API_TOKEN,
      service: game,
      user_id: idgame,
      nominal: nominal,
      payment_method: payment,
      callback_url: CALLBACK_URL
    });
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint callback dari MitraGamers
app.post('/callback', (req, res) => {
  const token = req.headers['x-callback-token'];
  if (token !== CALLBACK_TOKEN) {
    return res.status(401).send('Unauthorized');
  }

  console.log('Callback data diterima:', req.body);
  // Simpan atau proses status transaksi sesuai kebutuhan

  res.send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
