import { Model, DataTypes } from 'sequelize';
import {sequelize} from "../services/sequelize.js";


class UsuarioVeterinaria extends Model {}



export default (sequelize) => {
  UsuarioVeterinaria.init(
    {
      id_usuario_veterinaria: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      id_usuario: { type: DataTypes.INTEGER, allowNull: false },
      id_veterinaria: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, modelName: 'UsuarioVeterinaria', tableName: 'usuarios_veterinarias', timestamps: false }
  );

  return UsuarioVeterinaria;
};
