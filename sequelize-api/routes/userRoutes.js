const express = require('express');
const router = express.Router();
const { autenticarUsuario } = require('../auth.js');
const { autenticarAdmin } = require('../authAdmin.js');

const pacienteController = require("../controllers/pacienteController.js");
const consultaController = require("../controllers/consultaController.js");
const acessoController = require("../controllers/acessoController.js");
const historicoController = require("../controllers/historicoController.js");
const loginController = require("../controllers/loginController.js");

router.get("/admin/pacientes", autenticarAdmin, pacienteController.index);
router.post('/admin/paciente', autenticarAdmin, pacienteController.register);
router.put('/admin/paciente/:id', autenticarAdmin, pacienteController.update);
router.delete('/admin/paciente/:id', autenticarAdmin, pacienteController.delete);

router.get("/admin/consultas", autenticarAdmin, consultaController.index);
router.post('/admin/consulta', autenticarAdmin, consultaController.register);
router.put('/admin/consulta/:id', autenticarAdmin, consultaController.update);
router.delete('/admin/consulta/:id', autenticarAdmin, consultaController.delete);

router.post('/admin/acesso', autenticarAdmin, acessoController.register);
router.delete('/admin/acesso/:id', autenticarAdmin, acessoController.delete);

router.get("/historicos/:id", autenticarUsuario, historicoController.index);

router.post('/login', loginController.login);

module.exports = router;