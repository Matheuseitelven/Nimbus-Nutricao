const jwt = require('jsonwebtoken');
const Consulta = require('../models/Consulta');
const Paciente = require('../models/Paciente');

module.exports = {

  async index(req, res) {
    const { id } = req.params;

    try {

      // Busca todas as consultas do paciente
      const consultas = await Consulta.findAll({ where: { paciente_id: id } });

      if (consultas.length === 0) {
        return res.status(404).json({ ok: false, error: 'Nenhuma consulta encontrada para este paciente.' });
      }

      // Busca o paciente pelo id
      const paciente = await Paciente.findByPk(id);

      if (!paciente) {
        return res.status(404).json({ ok: false, error: 'Paciente não encontrado.' });
      }

      // Mapeia as consultas adicionando o nome do paciente em um novo objeto
      const newList = consultas.map((consulta) => ({
        ...consulta.toJSON(), // transforma em objeto simples
        nome: paciente.nome,
      }));

      return res.json(newList);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ ok: false, error: 'Erro ao listar as historicos' });
    }

  }

};
