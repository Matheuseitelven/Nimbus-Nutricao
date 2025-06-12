const jwt = require('jsonwebtoken');

const JWT_SECRET = 'seu_segredo_admin';

const autenticarAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, "seu_segredo_admin");
    req.usuario = decoded; // Anexa os dados do token para uso nos controllers
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};

module.exports = { autenticarAdmin };
