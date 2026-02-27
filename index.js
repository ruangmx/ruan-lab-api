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

app.get('/hello-v2', (req, res) => {
  const nome = req.query.nome;

  if (!nome) {
    return res.status(400).json({
      erro: "Você precisa informar um nome. Exemplo: /hello-v2?nome=Ruan"
    });
  }

  res.json({
    mensagem: `Olá, ${nome}!`
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor pronto!`);
});