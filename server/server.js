require('dotenv').config();

const { error } = require('console');
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const apiUrl = process.env.apiUrl;
const apiSMS = process.env.apiSMS;

const u = process.env.SMS_API_USER;
const p = process.env.SMS_API_TOKEN;

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
    console.log("Chamando API:", `${apiUrl}`); // Log da URL
    const response = await fetch(apiUrl, {
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

app.post('/proxy/send-sms', async (req, res) => {
  const { phoneNumber } = req.body; 
  
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const o = 'enviar';  
  const f = phoneNumber;
  const m = `Seu código de verificação é: ${verificationCode}`;

  const url = `${apiSMS}&o=${o}&u=${u}&p=${p}&f=${f}&m=${encodeURIComponent(m)}`;

  try {
    const response = await fetch(url, {
      method: 'GET', 
    });

    if (!response.ok) {
      throw new Error(`Erro na API de SMS: ${response.statusText}`);
    }

    const responseBody = await response.text();

    if (responseBody.includes("erro=0")) {
      res.json({ success: true, message: 'Código enviado com sucesso!', verificationCode})
    } else {
      res.status(500).json({ success: false, error: responseBody})
    }

  } catch (error) {
    console.error('Erro ao chamar a API de SMS:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
