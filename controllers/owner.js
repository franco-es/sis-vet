"use strict";

const { Pet } = require("../models/owner_pet");

const controller = {
  save: async (req, res) => {
    const { nombre, apellido, telefono, direccion } = req.body;
    const { idPet } = req.query;

    const mascota = await Pet.findOne({ _id: idPet });

    mascota.owner = {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      direccion: direccion,
    };
    const owneradded = await mascota.save();
    owneradded
      ? res.status(200).send({
          status: "200",
          message: "success",
          owner: owneradded,
        })
      : res.status(400).send({
          status: "400",
          message: "hubo un error",
        });
  },
  // getByVeteId: (req, res) => {
  //   const { sub } = req.user;

  //   Owner.find({ vete: sub }, (err, owner) => {
  //     if (err) {
  //       return res.status(300).send({
  //         message: "ha habido un error en la query",
  //       });
  //     }
  //     if (!owner) {
  //       return res.status(300).send({
  //         message: "lo siento, no se encuentra el duenio",
  //       });
  //     }
  //     return res.status(200).send({
  //       status: "success",
  //       message: "estos son los usuairos encontrados por veterinaria",
  //       owner,
  //     });
  //   });
  // },
  // updateOwner: (req, res) => {
  //   const { nombre, apellido, telefono, direccion } = req.body;
  //   const { id } = req.params;
  //   const owner = {
  //     nombre: nombre,
  //     apellido: apellido,
  //     telefono: telefono,
  //     direccion: direccion,
  //   };
  //   Owner.findByIdAndUpdate({ _id: id }, owner, (err, ownerUpdated) => {
  //     if (err) {
  //       return res.status(300).send({
  //         message: "ha habido un error en la query",
  //       });
  //     }
  //     if (!ownerUpdated) {
  //       return res.status(300).send({
  //         message: "lo siento, no se encuentra el duenio",
  //       });
  //     }
  //     return res.status(200).send({
  //       status: "success",
  //       message: "perfecto, duenio actualizado",
  //       ownerUpdated,
  //     });
  //   });
  // },
  // getOwner: (req, res) => {
  //   const { id } = req.params;
  //   const { sub } = req.user;
  //   Owner.findById({ _id: id, vete: sub }, (err, owner) => {
  //     if (err) {
  //       return res.status(300).send({
  //         message: "ha habido un error en la query",
  //       });
  //     }
  //     if (!owner) {
  //       return res.status(300).send({
  //         message: "lo siento, no se encuentra el duenio",
  //       });
  //     }
  //     return res.status(200).send({
  //       status: "success",
  //       message: "perfecto, aca ta su duenio",
  //       owner,
  //     });
  //   });
  // },
};

module.exports = controller;
