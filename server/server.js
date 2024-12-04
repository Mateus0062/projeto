const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json()); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/login.html'));
});

app.get('/recadastramento', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/index.html'));
})

app.get('/verificar', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/verificar.html'));
})

app.post('/proxy/Recadastramento', async (req, res) => {
  const fetch = (await import('node-fetch')).default;

  try {
    const response = await fetch('https://api.cofeci.gov.br/api/Recadastramento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
