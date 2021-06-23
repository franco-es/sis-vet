"use strict";

const { Pet } = require("./../models/owner_pet");
// const petController = require("./pets");

const controller = {
  save: async (req, res) => {
    const { idPet } = req.query;
    const { fecha, prox_aplicacion, vacuna } = req.body;

    Pet.findById(idPet, (err, result) => {
      try {
        result.vacunas.push({
          fecha: fecha,
          nombre: vacuna,
          prox_aplicacion: prox_aplicacion,
        });
        result.save();
        res.status(200).send({
          status: "success",
          message: "consulta agregada",
          Vacuna: result,
        });
      } catch (err) {
        res.status(400).send({ message: "ocurrio un error", error: err });
      }
    });
  },
  update: async (req, res) => {
    const { idPet, idConsulta } = req.query;
    const { fecha, prox_aplicacion } = req.body;
    Pet.updateOne(
      { _id: idPet, "vacunas._id": idConsulta },
      {
        $set: {
          "vacunas.$.fecha": fecha,
          "vacunas.$.prox_aplicacion": prox_aplicacion,
        },
      },
      (err, result) => {
        !result
          ? res.status(400).send({
              status: "error",
              message: "ocurrio un error en la query",
            })
          : err
          ? res.status(400).send({
              status: "error",
              message: "ocurrio un error en la query",
              error: err,
            })
          : res.status(200).send({
              status: "success",
              message: "consulta modificado",
              Vacuna: result,
            });
      }
    );
  },
  getvacunas: (req, res) => {
    const { idPet } = req.query;
    Pet.findById(idPet, (err, result) => {
      res.status(200).send({
        status: "success",
        resultado: result.vacunas,
      });
    });
  },
  delete: async (req, res) => {
    const { idPet, idConsulta } = req.query;
    Pet.updateOne(
      { _id: idPet },
      {
        $pull: {
          vacunas: { _id: idConsulta },
        },
      },
      (err, result) => {
        !result
          ? res.status(400).send({
              status: "error",
              message: "ocurrio un error en la query",
            })
          : err
          ? res.status(400).send({
              status: "error",
              message: "ocurrio un error en la query",
              error: err,
            })
          : res.status(200).send({
              status: "success",
              message: "Vacuna eliminado",
              Vacuna: result,
            });
      }
    );
  },
};
module.exports = controller;
