"use strict";

import { genSaltSync, compare } from "bcrypt";
import fs from "fs";
import path from "path";
import { Vete, User } from "./../models/users.js";
import { createToken } from "../services/jwt.js";
import registerEmail from "../services/send.js";
import {FileSystem} from "../services/uploadImage.js";
import { UserService } from "../services/userService.js";
// const { default: validator } = require("validator");

const saltRouds = 10;
const salt = genSaltSync(saltRouds);

const controller = {
  save: async (req, res) => {
    const { nombre, telefono, email, password } = req.body;

    const user = new Veterinaria();
    user.nombre = nombre;
    user.telefono = telefono;
    user.email = email.toLowerCase();
    user.role = "veterinaria";
    user.imagen = null;
    user.habilitado = 1;
    user.eliminado = 0;

    let pass = await  bcrypt.hash(password, salt);
    user.password = pass;
    const data = await user.save();
    let name = data.nombre;
    let send = registerEmail.registerEmail(email, name);
    return res.status(200).send({
      message: "GENIAL! SE GUARDO EL USUARIO",
      user: user,
    });
  },
  login: (req, res) => {
    const { email, password, getToken } = req.body;
    const Email = email.toLowerCase();
    // BUSCAR EL USUARIO QUE COINCIDA CON EL EMAIL
    try {
      User.findOne({ where: { email: email } }).then((data) => {
        data == null
          ? res.status(500).json({ message: "user not Found" })
          : compare(password, data.pass, (_, check) => {
              check
                ? getToken
                  ? res
                      .status(200)
                      .cookie('token', createToken(data), { maxAge: 900000, httpOnly: true })
                      .send({
                        user: data,
                      })
                  : (
                    res.status(500).send({
                      status: "error",
                      message: "No mando getToken",
                    })
                    )
                : res.status(400).send({
                    status: "DENIED",
                    message: "LAS CREDENCIALES NO SON CORRECTAS",
                  });
            });
      });
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  update(req, res) {
    const { email, nombre, telefono } = req.body;
    const { sub } = req.user;
    const userService = new UserService();
    User.update(
      {
        name: nombre,
        phone: telefono,
        email: email,
      },
      {
        where: {
          id: sub,
        },
      }
    ).then((data) => {
      if (data == null) {
        res.status(404).send({
          message: err,
        });
      } else {
        res.status(200).send({
          message: "user updated",
          user: user,
          message2: "please log in again.",
        });
      }
    });
  },
  uploadImage(req, res) {
    const fileSystem = new FileSystem();
    const image = req.file.img;
    if (!image) {
      return res.status(400).send({
        estado: "error",
        message: "no se envio una imagen",
      });
    }
    const validateImagenType = image.mimetype.inlcudes("image");
    if (!validateImagenType) {
      return res.status(400).send({
        status: "error",
        message: "el archivo no es una imagen",
      });
    }
    const saveFile = fileSystem.guardarImagenTemp(req.sub, image);
    res.status(200).json({
      estado: "success",
      imagen: imagen,
      guardarArchivo: saveFile,
    });
  }
}

export { VeteController };
