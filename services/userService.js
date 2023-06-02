import {User} from "../models/users.js";
import {db} from "../services/sequelize.js";
// import { sequelize } from "../services/sequelize";
import bcrypt from 'bcrypt';



class UserService{
  constructor(){};

    async copyProperties(dest, req) {
        const { nombre, telefono, email, password } = req.body;

        dest.name = nombre;
        dest.phone = telefono;
        dest.email = email;
        dest.role = "veterinaria";
        dest.active = true;
        dest.deleted = false;

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        dest.pass = hash;
    }

  findByEmail(email){
    User.findOne({where:{email: email}})
      .then((data) => {return data;})
  }
  async saveOrUpdate(req) {
    try {
        const user = {};

        if (req.user != undefined) {
            user.name = req.body.nombre;
            user.phone = req.body.telefono;
            user.email = req.body.email;

            await User.update(user, {
                where: { id: req.user.sub }
            });
            console.log("Usuario actualizado");
        } else {
            await this.copyProperties(user, req);
            const userCreated = await User.create(user);
            console.log("Usuario creado:", userCreated);
        }
    } catch (err) {
        console.error("Error al crear o modificar un usuario:", err);
        throw new Error("Error al crear o modificar un usuario");
    }
  }
}


export {UserService};