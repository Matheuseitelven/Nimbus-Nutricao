'use strict';
// npx sequelize-cli db:migrate

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('consultas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paciente_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dieta: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data_consulta: {
        type: Sequelize.DATE,
        allowNull: true
      },
      finalizada: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      peso: {
        type: Sequelize.STRING,
        allowNull: false
      },
      altura: {
        type: Sequelize.STRING,
        allowNull: false
      },
      imc: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('consultas');
  }
};
