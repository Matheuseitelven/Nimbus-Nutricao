const { Sequelize } = require('sequelize');

// Conexão com o banco de dados
const sequelize = new Sequelize('db_nimbus', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
