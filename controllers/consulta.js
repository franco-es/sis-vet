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
    const { fecha, contenido, diagnostico, tratamiento } = req.body;
    const consulta = new Consulta({
      fecha: fecha,
      contenido: contenido,
      diagnostico: diagnostico,
      tratamiento: tratamiento,
    });
    console.log(consulta);
    await consulta.save((err, result) => {
      console.log(result);
      Pet.updateOne(
        { _id: idPet },
        {
          $push: { consultas: result },
        }, (e, petupdated) => {
          console.log(petupdated)
          Pet.findOne({ _id: idPet })
            .populate("Consultas")
            .populate("Cirugia")
            .populate("Vacuna").exec((e, result) => {
              return res.send({
                result
              })
            });
        }
        );
      });
  },
};
module.exports = controller;
