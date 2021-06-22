"use strict";

const { Pet } = require("./../models/owner_pet");
// const petController = require("./pets");

const controller = {
  save: async (req, res) => {
    const { idPet } = req.query;
    const { fecha, contenido, diagnostico, tratamiento } = req.body;

    Pet.findById(idPet, (err, result) => {
      try {
        result.consultas.push({
          fecha: fecha,
          contenido: contenido,
          diagnostico: diagnostico,
          tratamiento: tratamiento,
        });
        result.save();
        res.status(200).send({
          status: "success",
          message: "consulta agregada",
          consultas: result,
        });
      } catch (err) {
        res.status(400).send({ message: "ocurrio un error", error: err });
      }
    });
  },
  update: async (req, res) => {
    const { idPet, idConsulta } = req.query;
    const { fecha, contenido, diagnostico, tratamiento } = req.body;
    Pet.updateOne(
      { _id: idPet, "consultas._id": idConsulta },
      {
        $set: {
          "consultas.$.fecha": fecha,
          "consultas.$.contenido": contenido,
          "consultas.$.diagnostico": diagnostico,
          "consultas.$.tratamiento": tratamiento,
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
              empleado: result,
            });
      }
    );
  },
  getConsultas: (req, res) => {
    const { idPet } = req.query;
    Pet.findById(idPet, (err, result) => {
      res.status(200).send({
        status: "success",
        resultado: result.consultas,
      });
    });
  },
  delete: async (req, res) => {
    const { idPet, idConsulta } = req.query;
    Pet.updateOne(
      { _id: idPet },
      {
        $pull: {
          consultas: { _id: idConsulta },
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
              message: "empleado eliminado",
              empleado: result,
            });
      }
    );
  },
};
module.exports = controller;
