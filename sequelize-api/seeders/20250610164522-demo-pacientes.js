'use strict';
// npx sequelize-cli db:seed:all

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pacientes', [
      {
        nome: 'João Silva',
        observacao: 'Paciente com dieta restrita',
        idade: 30,
        sexo: 'Masculino',
        telefone: '+5554999999999',
        email: 'joao@email.com',
        senha: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Maria Oliveira',
        observacao: 'Acompanhamento pós-cirúrgico',
        idade: 28,
        sexo: 'Feminino',
        telefone: '+5554888889999',
        email: 'maria@email.com',
        senha: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Carlos Souza',
        observacao: 'Necessita controle glicêmico',
        idade: 45,
        sexo: 'Masculino',
        telefone: '+5554888889999',
        email: 'carlos@email.com',
        senha: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pacientes', null, {});
  }
};
