const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Consulta extends Model {
  static async setPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  // Método para verificar a senha
  static async checkPassword(password, senha) {
    return bcrypt.compare(password, senha);
  }
}

Consulta.init(
  {
    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dieta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_consulta: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    finalizada: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Consulta',
    tableName: 'consultas',
    timestamps: true,
  }
);

module.exports = Consulta;
