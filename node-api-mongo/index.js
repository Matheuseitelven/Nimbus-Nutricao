// Importando as dependências do projeto
const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const cors = require("cors");

// Cria uma aplicação Express
const app = express();

//Permitir enviar dados para a App no formato JSON
app.use(express.json());

//Permite o uso do CORS (acesso a domínios externos da nossa API)
app.use(cors());

//const uri = "<connection string>";
const uri = "mongodb://127.0.0.1:27017";

mongoose.connect(uri, {dbName: 'db_NIMBUS',});

//Registra o Model em index.js
requireDir("./models");

// Redireciona o caminho http://localhost:3001/api para o routes
app.use('/api', require('./routes'));

// Inicia o servidor na porta '3001'
app.listen(3001, () => {

  console.log("Exemplo de aplicativo ouvindo a porta 3001");

});
