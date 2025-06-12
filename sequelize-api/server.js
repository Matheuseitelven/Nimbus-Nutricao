const express = require('express');
const sequelize = require('./database');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); // Importando o pacote cors

const app = express();
app.use(cors()); // Isso permite qualquer origem. 
app.use(express.json()); // Para ler o corpo das requisições como JSON

// Usar as rotas de usuário
app.use('/api', userRoutes);

// Iniciar o servidor
const startServer = async () => {
  try {
    await sequelize.sync(); // Sincronizar o banco de dados
    console.log('Banco de dados sincronizado');

    const port = 3001;
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
};

startServer();
