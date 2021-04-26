"use strict";

const { Pet } = require("./../models/owner_pet");
// const petController = require("./pets");

const controller = {
  save: async (req, res) => {
    const { idPet } = req.query;
    const { fecha, contenido } = req.body;

    Pet.findById(idPet, (err, result) => {
      try {
        result.cirugia.push({
          fecha: fecha,
          contenido: contenido,
        });
        result.save();
        res.status(200).send({
          status: "success",
          message: "Cirugia agregada",
          Cirugia: result,
        });
      } catch (err) {
        res.status(400).send({ message: "ocurrio un error", error: err });
      }
    });
  },
  update: async (req, res) => {
    const { idPet, idCirugia } = req.query;
    const { fecha, contenido } = req.body;
    Pet.updateOne(
      { _id: idPet, "cirugia._id": idCirugia },
      {
        $set: {
          "cirugia.$.fecha": fecha,
          "cirugia.$.contenido": contenido,
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
              message: "Cirugia modificado",
              Cirugia: result,
            });
      }
    );
  },
  getcirugia: (req, res) => {
    const { idPet } = req.query;
    Pet.findById(idPet, (err, result) => {
      res.status(200).send({
        status: "success",
        resultado: result.cirugia,
      });
    });
  },
  delete: async (req, res) => {
    const { idPet, idCirugia } = req.query;
    Pet.updateOne(
      { _id: idPet },
      {
        $pull: {
          cirugia: { _id: idCirugia },
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
              message: "Cirugia eliminado",
              Cirugia: result,
            });
      }
    );
  },
};
module.exports = controller;
