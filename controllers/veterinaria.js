"use strict";

const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const { Vete, User } = require("./../models/users");
const jwt = require("../services/jwt");
const registerEmail = require("../services/send");
const FileSystem = require("../services/uploadImage");
// const { default: validator } = require("validator");

const saltRouds = 10;
const salt = bcrypt.genSaltSync(saltRouds);

class VeteController {
  constructor() {}

  save(req, res) {
    const { nombre, telefono, email, password } = req.body;

    const user = {};
    user.name = nombre;
    user.phone = telefono;
    user.email = email;
    user.role = "veterinaria";
    user.img_url = null;
    user.active = 1;
    user.deleted = 0;

    bcrypt.hash(password, salt, (err, hash) => {
      user.pass = hash;
      try {
        User.create(user).then((data) => {
          res.status(200).send({
            message: "GENIAL! SE GUARDO EL USUARIO",
            user: data,
          });
        });
      } catch (err) {
        res.status(400).send({ error: err });
      }
    });
  }

  login(req, res) {
    const { email, password, getToken } = req.body;
    const Email = email.toLowerCase();
    // BUSCAR EL USUARIO QUE COINCIDA CON EL EMAIL
    try {
      User.findOne({ where: { email: email } }).then((data) => {
        data == null
          ? res.status(500).json({ message: "user not Found" })
          : bcrypt.compare(password, data.pass, (err, check) => {
              check
                ? getToken
                  ? res
                      .status(200)
                      .cookie('token', jwt.createToken(data), { maxAge: 900000, httpOnly: true })
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
  }
  update(req, res) {
    const { email, nombre, telefono } = req.body;
    const { sub } = req.user;
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
  }
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

module.exports = { VeteController };
