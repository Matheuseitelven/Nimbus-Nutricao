const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const bcrypt = require('bcryptjs');

class Paciente extends Model {
  // Método para criptografar a senha
  static async setPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  // Método para verificar a senha
  static async checkPassword(password, senha) {
    return bcrypt.compare(password, senha);
  }
}

Paciente.init(
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Paciente',
    tableName: 'pacientes',
    timestamps: true,
  }
);

module.exports = Paciente;
