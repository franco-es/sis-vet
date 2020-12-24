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
  update: async (req, res) => {
    const { idVacuna } = req.query;
    const { fecha, nombre, prox_aplicacion } = req.body;
    try {
      await Vacuna.findByIdAndUpdate(
        { _id: idVacuna },
        {
          $set: {
            fecha: fecha,
            nombre: nombre,
            prox_aplicacion: prox_aplicacion,
          },
        },
        {
          new: true,
          upsert: true,
        },
        (err, updateConsult) => {
          Pet.findOneAndUpdate(
            { "vacunas._id": idConsulta },
            {
              $set: {
                "vacunas.$.fecha": fecha,
                "vacunas.$.nombre": nombre,
                "vacunas.$.prox_aplicacion": prox_aplicacion,
              },
            },
            { new: true, upsert: true },
            (err, updateResult) => {
              err
                ? res.send(err)
                : res.status(200).send({ resultado: updateResult });
            }
          );
        }
      );
    } catch (err) {
      return console.error(err);
    }
  },
};
module.exports = controller;
