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
    owner.vete = sub;

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
        ownerStored,
      });
    });
  },
  getByVeteId: (req, res) => {
    const { sub } = req.user;

    Owner.find({ vete: sub }, (err, owner) => {
      if (err) {
        return res.status(300).send({
          message: "ha habido un error en la query",
        });
      }
      if (!owner) {
        return res.status(300).send({
          message: "lo siento, no se encuentra el duenio",
        });
      }
      return res.status(200).send({
        status: "success",
        message: "estos son los usuairos encontrados por veterinaria",
        owner,
      });
    });
  },
  updateOwner: (req, res) => {
    const { nombre, apellido, telefono, direccion } = req.body;
    const { id } = req.params;
    const owner = {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      direccion: direccion,
    };
    Owner.findByIdAndUpdate({ _id: id }, owner, (err, ownerUpdated) => {
      if (err) {
        return res.status(300).send({
          message: "ha habido un error en la query",
        });
      }
      if (!ownerUpdated) {
        return res.status(300).send({
          message: "lo siento, no se encuentra el duenio",
        });
      }
      return res.status(200).send({
        status: "success",
        message: "perfecto, duenio actualizado",
        ownerUpdated,
      });
    });
  },
  getOwner: (req, res) => {
    const { id } = req.params;
    const { sub } = req.user;
    Owner.findById({ _id: id, vete: sub }, (err, owner) => {
      if (err) {
        return res.status(300).send({
          message: "ha habido un error en la query",
        });
      }
      if (!owner) {
        return res.status(300).send({
          message: "lo siento, no se encuentra el duenio",
        });
      }
      return res.status(200).send({
        status: "success",
        message: "perfecto, aca ta su duenio",
        owner,
      });
    });
  },
};

module.exports = controller;
