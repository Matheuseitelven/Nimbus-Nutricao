const Paciente = require('../models/Paciente');

// Vamos exportar um objeto com algumas funções
module.exports = {

    async index(req, res) {
        try {

            const user = await Paciente.findAll();

            return res.json(user);

        } catch (error) {
            return res.json({ ok: false, error: 'Erro ao carregar pacientes.' });
        }
    },
    async register(req, res) {
        try {

            const { nome, idade, observacao, sexo, telefone, email, senha } = req.body;

            await Paciente.create({ nome, idade, observacao, sexo, telefone, email, senha });

            return res.status(201).json({ ok: true });

        } catch (error) {
            return res.json({ ok: false, error: 'Erro ao cadastrar o paciente' });
        }

    },
    async show(req, res) {

        const paciente = await Paciente.findByPk(req.params.id);

        // Vamos retornar o paciente que encontramos
        return res.json(paciente);

    },
    async update(req, res) {

        const { id } = req.params;
        const { nome, idade, observacao, sexo, telefone, email, senha } = req.body;

        const user = await Paciente.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Paciente não encontrado.' });
        }

        await user.update({ nome, idade, observacao, sexo, telefone, email, senha });

        return res.json({ ok: true });

    },
    async delete(req, res) {

        const { id } = req.params;

        try {
            const paciente = await Paciente.findByPk(id);

            if (!paciente) {
                return res.json({ ok: false, error: 'Paciente não encontrado.' });
            }

            await paciente.destroy();

            return res.json({ ok: true, message: 'Paciente excluído com sucesso!' });

        } catch (error) {
            return res.json({ ok: false, error: 'Erro ao excluir o paciente.' });
        }

    },

};