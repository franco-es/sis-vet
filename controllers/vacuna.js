"use strict";

const { Vacuna, Pet } = require("./../models/owner_pet");
// const petController = require("./pets");

const controller = {
  save: async (req, res) => {
    const { idPet } = req.query;
    const { sub } = req.user;
    const { fecha, nombre, prox_aplicacion } = req.body;
    const vacuna = new Vacuna({
      nombre: nombre,
      fecha: fecha,
      prox_aplicacion: prox_aplicacion,
      vete: sub,
    });
    console.log(vacuna);
    await vacuna.save((err, result) => {
      console.log(result);
      Pet.updateOne(
        { _id: idPet },
        {
          $push: { vacunas: result },
        },
        (e, petupdated) => {
          console.log(petupdated);
          Pet.findOne({ _id: idPet })
            .populate("Consultas")
            .populate("Cirugia")
            .populate("Vacuna")
            .exec((e, result) => {
              return res.send({
                result,
              });
            });
        }
      );
    });
  },
};
module.exports = controller;
