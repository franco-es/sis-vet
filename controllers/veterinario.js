"use strict";

const { Veterinaria } = require("./../models/users");

const controller = {
  save: (req, res) => {
    const { nombre, apellido, matricula } = req.body;
    const { sub } = req.user;
    if (req.user.role == "veterinaria") {
      Veterinaria.findById(sub).exec((err, user) => {
        if (err) {
          return res.status(500).send({
            status: "fail",
            message: "error en la peticion",
          });
        }
        if (!user) {
          return res.status(500).send({
            status: "fail",
            message: "no hay usuario registrado bajo ese id",
          });
        }
        const veterinario = {
          nombre: nombre,
          apellido: apellido,
          matricula: matricula,
          imagen: null,
        };
        user.veterinarios.push(veterinario);
        user.save((err) => {
          if (err) {
            return res.status(500).send({
              status: "error",
              message: "Error en al guardar el veterinario",
            });
          }
          Veterinaria.findById(sub)
            .populate("veterinarios")
            .exec((err, user) => {
              if (err) {
                return res.status(500).send({
                  status: "error",
                  message: "error en la peticion",
                });
              }
              if (!user) {
                return res.status(500).send({
                  status: "error",
                  message: "error en la peticion",
                });
              }
              return res.status(200).send({
                status: "success",
                user,
              });
            });
        });
      });
    } else {
      return res.status(403).send({
        status: "fail",
        message: "no sos una veterinaria, sos unico usuario",
      });
    }
  },
};

module.exports = controller;
