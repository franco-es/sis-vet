"use strict";

const Owner = require("../models/owner_pet");

const controller = {
  save: (req, res) => {
    const { nombre, apellido, telefono, direccion } = req.body;
    const { sub } = req.user;

    const owner = new Owner();
    owner.nombre = nombre;
    owner.apellido = apellido;
    owner.telefono = telefono;
    owner.direccion = direccion;
    owner.vete = req.user.sub;

    owner.save((err, ownerStored) => {
      if (err) {
        return res.status(500).send({
          status: "fail",
          message: "error al guardar el duenio",
        });
      }
      if (!ownerStored) {
        return res.status(500).send({
          status: "error",
          message: "el duenio no se guardo correctamente",
        });
      }
      return res.status(200).send({
        status: "success",
        message: "el duenio se guardo correctamente",
      });
    });
  },
};

module.exports = controller;
