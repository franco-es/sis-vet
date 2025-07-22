import { UserService } from "./userService.js";
import usuarioVeterinaria from "../models/UsuarioVeterinaria.js";
import usuario from "../models/Veterinaria.js";
import { sequelize } from "./sequelize.js";


import usuarioModels from "../models/Usuario.js";
import log from "npmlog";

class UserVeterinariaService {
  constructor() {}

  async save(req) {
    const UsuarioVeterinaria = usuarioVeterinaria(sequelize);
    //id del veterinario
    const { sub } = req.user;

    let userService = new UserService();
    let user = userService.saveUser(req);
    //id del nuevo usuario
    let usuario_id = (await user).dataValues.id_usuario;
    //creacion del modelo
    const dest = {
      id_usuario: usuario_id,
      id_veterinaria: sub,
    };

    await UsuarioVeterinaria.create(dest);
    return user;
  }

  async getEmployeesByVeterinaria(adminId) {

    const Usuario = usuarioModels(sequelize);
    const adminConVets = await Usuario.findByPk(adminId, {
      where: { rol: "veterinaria_admin" },
      include: [
        {
          model: Usuario,
          as: "Veterinarios",
          where: { rol: "veterinario" }, // opcional, refuerza filtro por rol
          through: { attributes: [] }, // quita datos de la tabla intermedia
        },
      ],
    });

    if (!adminConVets) {
      log.error("No existe ese admin o no es veterinaria_admin");
    }


    console.log(adminConVets.Veterinarios);
  }
}

export { UserVeterinariaService };
