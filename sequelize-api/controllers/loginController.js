const jwt = require('jsonwebtoken');
const Acesso = require('../models/Acesso');

module.exports = {

  async login(req, res) {
    const { email, senha } = req.body;

    try {
      // Procurar o usuário pelo email
      const user = await Acesso.findOne({ where: { email } });
      if (!user) {
        return res.json({ ok: false, error: 'Usuário não encontrado' });
      }

      // Verificar se a senha está correta
      const validPassword = await Acesso.checkPassword(senha, user.senha);

      if (!validPassword) {
        return res.json({ ok: false, error: 'Senha incorreta' });
      }

      let tokenAdmin = null

      if (user.admin) {

        // Gerar o token JWT
        tokenAdmin = jwt.sign({ id: user.id, email: user.email, admin: user.admin }, 'seu_segredo_admin', {
          expiresIn: '1h', // O token vai expirar em 1 hora
        });

      }

      const token = jwt.sign({ id: user.id, email: user.email, admin: user.admin }, 'seu_segredo', {
        expiresIn: '1h', // O token vai expirar em 1 hora
      });

      return res.json({ ok: true, admin: user.admin, id: user.paciente_id, token, tokenAdmin });
    } catch (error) {
      return res.json({ ok: false, error: 'Erro ao realizar o login' });
    }
  }

};
