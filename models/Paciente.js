import { Model, DataTypes } from 'sequelize';
import {sequelize} from "../services/sequelize.js";

class Paciente extends Model {
  static associate(models) {
    Paciente.belongsTo(models.Cliente, { foreignKey: 'id_cliente' });
    Paciente.belongsTo(models.Veterinaria, { foreignKey: 'id_veterinaria' });
  }
}

export default (sequelize) => {
  Paciente.init(
    {
      id_paciente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: DataTypes.STRING, allowNull: false },
      id_cliente: { type: DataTypes.INTEGER, allowNull: false },
      especie: { type: DataTypes.STRING },
      raza: { type: DataTypes.STRING },
      fecha_nacimiento: { type: DataTypes.DATE },
      peso: { type: DataTypes.FLOAT },
      id_veterinaria: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, modelName: 'Paciente', tableName: 'pacientes', timestamps: false }
  );

  return Paciente;
};
