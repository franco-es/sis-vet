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
    const { idConsulta, idPet } = req.query;
    const { fecha, contenido, diagnostico, tratamiento } = req.body;
    try {
      await Consulta.findByIdAndUpdate(
        { _id: idConsulta },
        {
          $set: {
            fecha: fecha,
            contenido: contenido,
            diagnostico: diagnostico,
            tratamiento: tratamiento,
          },
        },
        {
          new: true,
          upsert: true,
        },
        (err, updateConsult) => {
          Pet.findOneAndUpdate(
            { "consultas._id": idConsulta },
            {
              $set: {
                "consultas.$.fecha": fecha,
                "consultas.$.contenido": contenido,
                "consultas.$.diagnostico": diagnostico,
                "consultas.$.tratamiento": tratamiento,
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
  delete: async (req, res) => {
    const { idConsulta } = req.query;
    Consulta.findOneAndDelete({ _id: idConsulta });
  },
};
module.exports = controller;
