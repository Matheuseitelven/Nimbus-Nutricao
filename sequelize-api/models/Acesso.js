const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const bcrypt = require('bcryptjs');

class Acesso extends Model {
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

Acesso.init(
  {
    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Acesso',
    tableName: 'acessos',
    timestamps: true,
  }
);

module.exports = Acesso;
