const { Sequelize } = require('sequelize');

// Conexão com o banco de dados
const sequelize = new Sequelize('db_nimbus', 'root', '123456789', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
