const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json()); // Para processar o corpo das requisições JSON

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/login.html'));
});

app.get('/recadastramento', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/index.html'));
})

app.get('/verificar', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/verificar.html'));
})

// Exemplo de rota que pode ser usada para proxy (substitua com a sua lógica)
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
