"use strict";

const validator = require("validator");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const { Veterinaria } = require("./../models/users");
const jwt = require("../services/jwt");
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

    Veterinaria.findOne({ email: user.email }, (err, issetUser) => {
      if (err) {
        return res.status(500).send({
          message: `el usuario ${user.email} esta duplicado`,
        });
      }
      if (!issetUser) {
        bcrypt.hash(password, salt, (err, hash) => {
          user.password = hash;

          user.save((err, userStored) => {
            if (err) {
              return res.status(400).send({
                status: "FAIL",
                message:
                  "error al guardar el usuario, no se ha copmletado la operacion.",
              });
            }
            if (!userStored) {
              return res.status(400).send({
                message:
                  "EL USUARIO NO SE HA GUARDADO EN EL IF DE SI NO HAY USERSTORED",
              });
            }
            return res.status(200).send({
              message: "GENIAL! SE GUARDO EL USUARIO",
              user: userStored,
            });
          });
        });
      } else {
        return res.status(500).send({
          message: "ERROR EL USUARIO YA ESTA REGISTRADO",
        });
      }
    });
  },
  saveVeterinario: (req, res) => {
    const { nombre, telefono, email, password } = req.body;

    const user = new Veterinaria();
    user.nombre = nombre;
    user.telefono = telefono;
    user.email = email.toLowerCase();
    user.role = "veterinario";
    user.imagen = null;
    user.habilitado = 1;
    user.eliminado = 0;

    Veterinaria.findOne({ email: user.email }, (err, issetUser) => {
      if (err) {
        return res.status(500).send({
          message: "ERROR AL COMPROBAR LA DUPLICIDAD DEL USUARIO",
        });
      }
      if (!issetUser) {
        // SI NO EXISTE
        // CIFRAR LA CONTRASENIA
        bcrypt.hash(password, salt, (err, hash) => {
          user.password = hash;

          user.save((err, userStored) => {
            if (err) {
              return res.status(400).send({
                message: "EL USUARIO NO SE HA GUARDADO.",
              });
            }
            if (!userStored) {
              return res.status(200).send({
                message:
                  "EL USUARIO NO SE HA GUARDADO EN EL IF DE SI NO HAY USERSTORED",
              });
            }
            return res.status(200).send({
              message: "GENIAL! SE GUARDO EL USUARIO",
              user: userStored,
            });
          }); //CLOSE SAVE
        }); // CLOASE BCRYPT
      } else {
        return res.status(500).send({
          message: "ERROR EL USUARIO YA ESTA REGISTRADO",
        });
      }
    });
  },
  login: (req, res) => {
    const { email, password, getToken } = req.body;

    // BUSCAR EL USUARIO QUE COINCIDA CON EL EMAIL
    Veterinaria.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return res.status(500).send({
          message: "ERROR AL INTENTAR IDENTIFICARSE",
        });
      }
      if (!user) {
        return res.status(500).send({
          message: "EL USUARIO NO EXISTE",
        });
      }
      bcrypt.compare(password, user.password, (err, check) => {
        if (check) {
          // GENERAR TOKEN DE JWT
          // el getToken debe tener algun valor escrito, no vale solo con pasarle un parametro en blanco.
          if (getToken) {
            return res.status(200).send({
              token: jwt.createToken(user),
            });
          } else {
            user.password = undefined;
            user.__v = undefined;
            return res.status(200).send({
              status: "SUCCESS",
              user,
              getToken,
            });
          }
          // LIMPIAR EL OBJETO
        } else {
          return res.status(200).send({
            status: "DENIED",
            message: "LAS CREDENCIALES NO SON CORRECTAS",
          });
        }
      });
    });
  },
  update: (req, res) => {
    const params = req.body;
    const userId = req.user.sub;
    if (req.user.email != params.email) {
      Veterinaria.findOne({ email: params.email.toLowerCase() }, (err, user) => {
        if (err) {
          return res.status(400).send({
            message: "error al intentar identificarse",
          });
        }
        if (user && user.email == params.email) {
          return res.status(400).send({
            message:
              "ERROR AL CAMBIAR EL EMAIL, YA HAY OTRO USUARIO CON ESE EMAIL",
          });
        } else {
          Veterinaria.findByIdAndUpdate(
            { _id: userId },
            params,
            { new: true },
            (err, userUpdated) => {
              if (err) {
                return res.status(400).send({
                  status: "ERROR",
                  message: "ha ocurrido un error",
                });
              }
              if (!userUpdated) {
                return readdirSync.status(400).send({
                  status: "error",
                  message: "ha ocurrido un error",
                });
              }
              return res.status(200).send({
                status: "SUCCESS",
                user: userUpdated,
              });
            }
          );
        }
      });
    }
  },
};

module.exports = controller;
