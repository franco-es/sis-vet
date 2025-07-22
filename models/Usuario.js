"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../services/sequelize.js";
import UsuarioVeterinaria from "./UsuarioVeterinaria.js";
import Veterinaria from "./Veterinaria.js";
import bcrypt from "bcrypt";

class Usuario extends Model {
  static associate(models) {
    Usuario.hasOne(models.Veterinaria, {
      as: "veterinarias",
      foreignKey: "id_usuario",
      sourceKey: "id_usuario",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      hooks: false
    });

    Usuario.belongsToMany(models.Usuario, {
        as: 'Veterinarios',                     // ? alias ?Veterinarios?
        through: models.UsuarioVeterinaria,     // tu modelo join
        foreignKey: 'id_usuario_admin',         // columna en usuarios_veterinarias
        otherKey:   'id_usuario_veterinario',   // apunta al vet
        timestamps: false,
      });
      // Un veterinario puede pertenecer a muchos admins
      Usuario.belongsToMany(models.Usuario, {
        as: 'Administradores',                  // ? alias ?Administradores?
        through: models.UsuarioVeterinaria,
        foreignKey: 'id_usuario_veterinario',
        otherKey:   'id_usuario_admin',
        timestamps: false,
      });
  }
}

export default (sequelize) => {
  Usuario.init(
    {
      id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: { type: DataTypes.STRING, allowNull: false },
      apellido: { type: DataTypes.STRING, allowNull: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      habilitado: { type: DataTypes.BOOLEAN, allowNull: false },
      telefono: { type: DataTypes.STRING, allowNull: false },
      eliminado: { type: DataTypes.BOOLEAN, allowNull: false },
      matricula: { type: DataTypes.INTEGER, allowNull: true },
      rol: {
        type: DataTypes.ENUM(
          "admin_veterinaria",
          "veterinario",
          "asistente",
          "admin"
        ),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "usuarios",
      timestamps: false,
    }
  );
  Usuario.beforeCreate(async (user) => {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
  });

  return Usuario;
};
