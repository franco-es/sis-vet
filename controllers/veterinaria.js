"use strict";

const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const { Veterinaria } = require("./../models/users");
const jwt = require("../services/jwt");
const registerEmail = require("../services/send");
const FileSystem = require("../services/uploadImage");
// const { default: validator } = require("validator");

const saltRouds = 10;
const salt = bcrypt.genSaltSync(saltRouds);

const controller = {
  save: (req, res) => {
    const { nombre, telefono, email, password } = req.body;

    const user = new Veterinaria();
    user.nombre = nombre;
    user.telefono = telefono;
    user.email = email.toLowerCase();
    user.role = "veterinaria";
    user.imagen = null;
    user.habilitado = 1;
    user.eliminado = 0;

    bcrypt.hash(password, salt, (err, hash) => {
      user.password = hash;
      try {
        user.save((err, userStored) => {
          let name = userStored.nombre;
          let email = userStored.email;
          let send = registerEmail.registerEmail(email, name);
          return res.status(200).send({
            message: "GENIAL! SE GUARDO EL USUARIO",
            user: userStored,
          });
        });
      } catch (err) {
        return res.status(400).send({ error: err });
      }
    });
  },
  login: (req, res) => {
    const { email, password, getToken } = req.body;
    const Email = email.toLowerCase();
    // BUSCAR EL USUARIO QUE COINCIDA CON EL EMAIL
    Veterinaria.findOne({ email: Email }, (err, user) => {
      try {
        bcrypt.compare(password, user.password, (err, check) => {
          check
            ? getToken
              ? res.status(200).send({
                  token: jwt.createToken(user),
                  user: user,
                })
              : res.status(500).send({
                  status: "error",
                  message: "No mando getToken",
                })
            : res.status(400).send({
                status: "DENIED",
                message: "LAS CREDENCIALES NO SON CORRECTAS",
              });
        });
      } catch (err) {
        return res.status(400).send({
          error: err,
        });
      }
    });
  },
  update: async (req, res) => {
    const { email, nombre, telefono } = req.body;
    const { sub } = req.user;
    const Email = email.toLowerCase();
    Veterinaria.findByIdAndUpdate(
      sub,
      {
        nombre: nombre,
        telefono: telefono,
        email: email,
      },
      { new: true },
      (err, user) => {
        err
          ? res.status(404).send({
              message: err,
            })
          : res.status(200).send({
              message: "user updated",
              user: user,
              message2: "please log in again.",
            });
      }
    );
  },
  uploadImage: (req, res) => {
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
  },
};

module.exports = controller;
