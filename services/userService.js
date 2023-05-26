import { User } from "../models/users.js";
// import { sequelize } from "../services/sequelize";
import { hash as _hash } from "bcrypt";


class UserService{
  constructor(){};

  copyProperties(dest, req){
    const { nombre, telefono, email, password } = req.body;
  
    dest.name = nombre;
    dest.phone = telefono;
    dest.email = email;
    dest.role = "veterinaria";
    dest.img_url = null;
    dest.active = 1;
    dest.deleted = 0;
    let salt = 3;
    _hash(password, salt, (err, hash) => {
      dest.pass = hash;
    });
  }

  findByEmail(email){
    User.findOne({where:{email: email}})
      .then((data) => {return data;})
  }
  async saveOrUpdate(req){
    const user = {};
    try {
      this.copyProperties(user, req);
      if(req.user != undefined){
        User.update({
          name: user.name,
          phone: user.phone,
          email: user.email},{where:{id: req.user.sub}})
          .then(data => data);
      }else{
        User.create(user).then((data) => {return data});
      }
    } catch (error) {
      throw new Error("error al crear o modificar un usuario")
    }
  }
}


export {UserService};