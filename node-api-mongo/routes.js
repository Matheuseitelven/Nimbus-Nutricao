// Importando as dependências do projeto
const express = require("express");
const routes = express.Router();

const PacienteController = require("./controllers/PacienteController.js");
const ConsultaController = require("./controllers/ConsultaController.js");
const AcessoController = require("./controllers/AcessoController.js");
const HistoricoController = require("./controllers/HistoricoController.js");
const LoginController = require("./controllers/LoginController.js");

// associa as rotas ao seu método do Controller
routes.get("/pacientes", PacienteController.index);
routes.post('/paciente',PacienteController.store);
routes.put('/paciente/:id',PacienteController.update);
routes.delete('/paciente/:id',PacienteController.delete);

routes.get("/consultas", ConsultaController.index);
routes.post('/consulta', ConsultaController.store);
routes.put('/consulta/:id', ConsultaController.update);
routes.delete('/consulta/:id', ConsultaController.delete);

routes.post('/acesso', AcessoController.store);
routes.delete('/acesso/:id', AcessoController.delete);

routes.get("/historicos/:id", HistoricoController.index);

routes.post('/login', LoginController.index);

module.exports = routes;