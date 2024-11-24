"use strict";
const { Model, DataTypes } = require('sequelize');

class Veterinario extends Model {}
class Usuario extends Model {}

module.exports = (sequelize) => {
  // Definimos el modelo Veterinario
  Veterinario.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      matricula: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Veterinario',
      timestamps: false,
    }
  );

  // Definimos el modelo Usuario
  Usuario.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      habilitado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      eliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Usuario',
      timestamps: false,
    }
  );

  // Relación: Un usuario tiene muchos veterinarios
  Usuario.hasMany(Veterinario, { foreignKey: 'usuarioId', as: 'veterinarios' });
  Veterinario.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

  return { Usuario, Veterinario };
};