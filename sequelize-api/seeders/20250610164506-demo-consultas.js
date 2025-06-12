'use strict';
// npx sequelize-cli db:seed:all

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('consultas', [
      {
        paciente_id: '1', // ajuste conforme IDs reais existentes em pacientes
        dieta: 'Dieta hipocalórica',
        data_consulta: new Date('2024-12-01'),
        finalizada: true,
        peso: '75',
        altura: '1.75',
        imc: (75 / (1.75 ** 2)).toFixed(2), // 24.49
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        paciente_id: '2',
        dieta: 'Dieta hipercalórica',
        data_consulta: new Date('2024-12-15'),
        finalizada: false,
        peso: '62',
        altura: '1.68',
        imc: (62 / (1.68 ** 2)).toFixed(2), // 21.97
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        paciente_id: '3',
        dieta: 'Dieta low carb',
        data_consulta: new Date('2025-01-10'),
        finalizada: true,
        peso: '80',
        altura: '1.80',
        imc: (80 / (1.80 ** 2)).toFixed(2), // 24.69
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('consultas', null, {});
  }
};
