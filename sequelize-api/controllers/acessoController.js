const Acesso = require('../models/Acesso');

// Vamos exportar um objeto com algumas funções
module.exports = {

    async register(req, res) {
        try {

            const { paciente_id, email, senha } = req.body;

            const hashedPassword = senha ? await Acesso.setPassword(senha) : "";

            await Acesso.create({ paciente_id, email, senha: hashedPassword, admin: false });
        
            return res.status(201).json({ ok: true });

        } catch (error) {
            return res.json({ ok: false, error: 'Erro ao criar acesso' });
        }

    },
    async delete(req, res) {

        const { id } = req.params;

        try {
          const acesso = await Acesso.findByPk(id);

          if (!acesso) {
            return res.json({ ok: false, error: 'Acesso não encontrado' });
          }
      
          await Acesso.destroy();

          return res.json({ ok: true, message: 'Acesso excluído com sucesso!' });

        } catch (error) {
          return res.json({ ok: false, error: 'Erro ao excluir o acesso' });
        }

    },

};