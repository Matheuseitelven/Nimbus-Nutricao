'use strict';
// npx sequelize-cli db:seed:all
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('acessos', [
      {
        paciente_id: null,
        email: 'admin@admin.com',
        admin: true,
        senha: await bcrypt.hash("1234678", 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('acessos', null, {});
  }
};
