const express = require('express');
const app = express();
const port = 3000;

app.get('/teste', (req, res) => {
  res.json({
    mensagem: "Hello World!",
    status: "Sucesso",
    dev: "Ruan Máximo"
  });
});

app.listen(port, () => {
    console.log(`🚀 Servidor pronto!`);
});