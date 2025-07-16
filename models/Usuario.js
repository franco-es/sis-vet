"use strict";

import {DataTypes, Model} from 'sequelize';
import {sequelize} from "../services/sequelize.js";
import bcrypt from "bcrypt";

class Usuario extends Model {
    static associate(models) {
        Usuario.belongsToMany(models.Veterinaria, {
            through: models.UsuarioVeterinaria,
            foreignKey: 'id_usuario',
        });
    }
}

export default (sequelize) => {
    Usuario.init(
        {
            id_usuario: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            nombre: {type: DataTypes.STRING, allowNull: false},
            apellido: {type: DataTypes.STRING, allowNull: true},
            email: {type: DataTypes.STRING, allowNull: false, unique: true},
            password: {type: DataTypes.STRING, allowNull: false},
            habilitado: {type: DataTypes.BOOLEAN, allowNull: false},
            telefono: {type: DataTypes.STRING, allowNull: false},
            eliminado: {type: DataTypes.BOOLEAN, allowNull: false},
            rol: {type: DataTypes.ENUM('admin_veterinaria', 'veterinario', 'asistente'), allowNull: false},
        },
        {sequelize, modelName: 'Usuario', tableName: 'usuarios', timestamps: false}
    );
    Usuario.beforeCreate(async (user) => {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
    })

    return Usuario;
};


