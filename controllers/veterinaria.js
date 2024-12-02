import bcrypt from 'bcrypt';
import log from 'npmlog';
import createToken from '../services/jwt.js';
import registerEmail from '../services/send.js';
import {FileSystem} from '../services/uploadImage.js';
import { User } from '../models/users.js';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

class VeteController {
  static async encriptPassword(password) {
    return await bcrypt.hash(password, salt);
  }

  async save(req, res) {
    const { nombre, telefono, email, password } = req.body;

    let pass = await VeteController.encriptPassword(password);
    const user = {
      nombre: nombre,
      telefono: telefono,
      email: email.toLowerCase(),
      role: 'veterinaria',
      imagen: null,
      habilitado: 1,
      eliminado: 0,
      password: pass,
    };

    try {
      const data = await User.create(user);
      let name = data.nombre;
      let send = registerEmail.registerEmail(email, name);
      log.info('Veterinaria creada ' + name);
      return res.status(200).send({
        message: 'GENIAL! SE GUARDO EL User',
        user: user,
      });
    } catch (err) {
      return res.status(400).send({
        status: 'error',
        message: 'Hubo un error al crear el User',
        error: err,
      });
    }
  }

  async login(req, res) {
    const { email, password, getToken } = req.body;
    const Email = email.toLowerCase();

    try {
      const user = await User.findOne({ where: { email: Email } });
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
    const { email, nombre, telefono } = req.body;
    const { sub } = req.user;
    const Email = email.toLowerCase();

    try {
      const user = await User.findByPk(sub);

      if (!user) {
        return res.status(404).send({
          message: 'User no encontrado',
        });
      }

      user.nombre = nombre;
      user.telefono = telefono;
      user.email = email;

      await user.save();

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

  uploadImage(req, res) {
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
}

export {VeteController};
