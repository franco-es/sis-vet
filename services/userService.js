// import { sequelize } from "../services/sequelize";
import { hash as _hash } from "bcrypt";
import { sequelize } from "./sequelize.js";
import log from "npmlog";

import usuarioModels from "../models/Usuario.js";
class UserService {
  constructor() {} 

  copyProperties(dest, req) {
    const { name, phone, email, password, role, apellido } = req.body;
    dest.nombre = name;
    dest.telefono = phone;
    dest.email = email;
    dest.habilitado = true;
    dest.eliminado = false;
    dest.password = password;
    dest.apellido = apellido;
    dest.rol = role;

    return dest;
  }

  async findByEmail(email) {
    const Usuario = usuarioModels(sequelize);
    let usuario = await Usuario
      .findOne({ where: { email: email } });
    return usuario.dataValues
  }

  async saveUser(req) {
    log.info("creando Usuario.")
    const Usuario = usuarioModels(sequelize);
    let user = {};
    try {
      user = this.copyProperties(user, req);
    } catch (error) {
      log.error(error)
      throw new Error("error al crear o modificar un usuario");
    }
      
    let data = await Usuario.create(user);
    return data    
  }

  async updateUser(user) {
    log.info("actualizando Usuario.")
    const Usuario = usuarioModels(sequelize);
    let data = await Usuario.update(
        {
          nombre: user.nombre,
          telefono: user.telefono,
          email: user.email,
        },
        { where: { id_usuario: user.id_usuario } }
      )
    return data.dataValues
  }


  async findByPk(sub){
    const Usuario = usuarioModels(sequelize);
    let user = await Usuario.findByPk(sub);
    return user.dataValues;
  }

  async getAllVeterinarias(){
    const Usuario = usuarioModels(sequelize);
    let users = await Usuario.findAll();
    let usersJSON = JSON.stringify(users, null, 2);
    return usersJSON;
  }

}

export { UserService };
