const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

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

// --- CRUD de Usuários ---

let usuarios = [];
let proximoId = 1;

// CREATE — POST /usuarios
app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: "Os campos 'nome' e 'email' são obrigatórios." });
  }

  const novoUsuario = { id: proximoId++, nome, email };
  usuarios.push(novoUsuario);

  res.status(201).json(novoUsuario);
});

// READ ALL — GET /usuarios
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// READ ONE — GET /usuarios/:id
app.get('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === Number(req.params.id));

  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado." });
  }

  res.json(usuario);
});

// UPDATE — PUT /usuarios/:id
app.put('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === Number(req.params.id));

  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado." });
  }

  const { nome, email } = req.body;
  if (nome) usuario.nome = nome;
  if (email) usuario.email = email;

  res.json(usuario);
});

// DELETE — DELETE /usuarios/:id
app.delete('/usuarios/:id', (req, res) => {
  const index = usuarios.findIndex(u => u.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ erro: "Usuário não encontrado." });
  }

  usuarios.splice(index, 1);

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`🚀 Servidor pronto!`);
});
