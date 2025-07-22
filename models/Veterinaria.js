import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../services/sequelize.js";

class Veterinaria extends Model {
  static associate(models) {
    Veterinaria.belongsTo(models.Usuario, {
      as: "veterinaria",
      foreignKey: 'id_usuario',
      constraints: true,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
    Veterinaria.hasMany(models.Paciente, { foreignKey: 'id_veterinaria' });
    //Veterinaria.hasMany(models.Servicio, { foreignKey: 'id_veterinaria' });
    //Veterinaria.hasMany(models.Producto, { foreignKey: 'id_veterinaria' });
  }
}

export default (sequelize) => {
  Veterinaria.init(
    {
      id_veterinaria: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: DataTypes.STRING, allowNull: false },
      direccion: { type: DataTypes.STRING },
      telefono: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      propietario: { type: DataTypes.STRING },
    },
    { sequelize, modelName: 'Veterinaria', tableName: 'veterinarias', timestamps: false }
  );

  return Veterinaria;
};
