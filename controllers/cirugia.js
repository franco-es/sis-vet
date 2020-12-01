"use strict";

const {
  Owner,
  Cirugia,
  Vacuna,
  Pet,
  Consulta,
} = require("./../models/owner_pet");
// const petController = require("./pets");

const controller = {
  save: async (req, res) => {
    const { idPet, idOwner } = req.query;
    const { sub } = req.user;
    const { fecha, contenido } = req.body;
    const cirugia = new Cirugia({
      fecha: fecha,
      contenido: contenido,
      vete: sub,
    });
    console.log(cirugia);
    await cirugia.save((err, result) => {
      console.log(result);
      Pet.updateOne(
        { _id: idPet },
        {
          $push: { cirugia: result },
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
