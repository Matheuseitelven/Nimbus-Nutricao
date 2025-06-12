const Consulta = require('../models/Consulta');

// Vamos exportar um objeto com algumas funções
module.exports = {

    async index(req, res) {
        try {

            const consultas = await Consulta.findAll();

            return res.json(consultas);

        } catch (error) {
            return res.json({ ok: false, error: 'Erro ao carregar consultas.' });
        }
    },
    async register(req, res) {
        try {

            const {
                paciente_id,
                data_consulta,
                dieta,
                finalizada,
                peso,
                altura,
                imc
            } = req.body;

            await Consulta.create({
                paciente_id,
                data_consulta,
                dieta,
                finalizada,
                peso,
                altura,
                imc
            });

            return res.status(201).json({ ok: true });

        } catch (error) {
            return res.json({ ok: false, error: 'Erro ao cadastrar consulta' });
        }

    },
    async show(req, res) {

        const consulta = await Consulta.findByPk(req.params.id);

        return res.json(consulta);

    },
    async update(req, res) {

        const { id } = req.params;
        const {
            paciente_id,
            data_consulta,
            dieta,
            finalizada,
            peso,
            altura,
            imc
        } = req.body;

        const consulta = await Consulta.findByPk(id);

        if (!consulta) {
            return res.status(404).json({ error: 'Consulta não encontrado' });
        }

        await consulta.update({
            paciente_id,
            data_consulta,
            dieta,
            finalizada,
            peso,
            altura,
            imc
        });

        return res.json({ ok: true });

    },
    async delete(req, res) {

        const { id } = req.params;

        try {
            const paciente = await Consulta.findByPk(id);

            if (!paciente) {
                return res.json({ ok: false, error: 'Usuário não encontrado' });
            }

            await paciente.destroy();

            return res.json({ ok: true, message: 'Usuário excluído com sucesso!' });

        } catch (error) {
            return res.json({ ok: false, error: 'Erro ao excluir o usuário' });
        }

    },

};