import { Model, DataTypes } from 'sequelize';
import {sequelize} from "../services/sequelize.js";

class Cliente extends Model {
  static associate(models) {
    Cliente.hasMany(models.Paciente, { foreignKey: 'id_cliente' });
  }
}

export default (sequelize) => {
  Cliente.init(
    {
      id_cliente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: DataTypes.STRING, allowNull: false },
      apellido: { type: DataTypes.STRING, allowNull: false },
      telefono: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      direccion: { type: DataTypes.STRING },
    },
    { sequelize, modelName: 'Cliente', tableName: 'clientes', timestamps: false }
  );

  return Cliente;
};
