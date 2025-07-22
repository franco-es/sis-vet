import bcrypt from 'bcrypt';
import log from 'npmlog';
import createToken from '../services/jwt.js';
import registerEmail from '../services/send.js';
import {FileSystem} from '../services/uploadImage.js';
import Usuario from '../models/Usuario.js';
import {UserService} from '../services/userService.js';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

class VeteController {
  async save(req, res) {

    let userService = new UserService();

    try {
      let data = await userService.saveUser(req);
      let name = data.dataValues.nombre;
      let email = data.dataValues.email;
      //let send = registerEmail.registerEmail(email, name);
      return res.status(200).send({
        message: 'GENIAL! SE GUARDO EL User',
        user: data.dataValues,
      });
    } catch (err) {
      log.error(err)
      return res.status(400).send({
        status: 'error',
        message: 'Hubo un error al crear el User',
        error: err,
      });
    }
  }

  async login(req, res) {
    let userService = new UserService();
    const { email, password, getToken } = req.body;
    const Email = email.toLowerCase();

    try {
      const user = await userService.findByEmail(email);
      console.log(user)
      if (!user) {
        return res.status(400).send({
          status: 'DENIED',
          message: 'LAS CREDENCIALES NO SON CORRECTAS',
        });
      }

      bcrypt.compare(password, user.password, (err, isChecked) => {
        if (!isChecked) {
          return res.status(400).send({
            status: 'DENIED',
            message: 'LAS CREDENCIALES NO SON CORRECTAS',
          });
        }

        if (!getToken) {
          return res.status(500).send({
            status: 'error',
            message: 'No mando getToken',
          });
        }

        return res.status(200).send({
          token: createToken(user),
          user: user,
        });
      });
    } catch (err) {
      return res.status(400).send({
        error: err,
      });
    }
  }

  async update(req, res) {
    
    let userService = new UserService();
    const { email, nombre, telefono } = req.body;
    const { sub } = req.user;
    console.log(req.user)
    try {
      let user;
      user = await userService.findByPk(sub);

      if (!user) {
        return res.status(404).send({
          message: 'User no encontrado',
        });
      }

      user.nombre = nombre;
      user.telefono = telefono;
      user.email = email.toLowerCase();

      await userService.updateUser(user);

      return res.status(200).send({
        message: 'user updated',
        user: user,
        message2: 'please log in again.',
      });
    } catch (err) {
      return res.status(404).send({
        message: err,
      });
    }
  }

  async uploadImage(req, res) {
    const fileSystem = new FileSystem();
    const image = req.file.img;

    if (!image) {
      return res.status(400).send({
        estado: 'error',
        message: 'no se envio una imagen',
      });
    }

    const validateImageType = image.mimetype.includes('image');
    if (!validateImageType) {
      return res.status(400).send({
        status: 'error',
        message: 'el archivo no es una imagen',
      });
    }

    const saveFile = fileSystem.guardarImagenTemp(req.sub, image);
    return res.status(200).json({
      estado: 'success',
      imagen: image,
      guardarArchivo: saveFile,
    });
  }

  async getAll(req, res){

    const userService = new UserService();
    let vetes = [];
    vetes = await userService.getAllVeterinarias();
    return res.status(200).send({
        data: JSON.parse(vetes),
      });

  }

}

export {VeteController};
