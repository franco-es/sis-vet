"use strict";

const Owner = require("../models/owner_pet");
// const petController = require("./pets");

const controller = {
  save: (req, res) => {
    const { idPet, idOwner } = req.query;
    const { fecha, contenido, diagnostico, tratamiento } = req.params;
    Owner.findById(idOwner, (err, owner) => {
      owner.mascota.id(idPet).consultas.push({
        fecha: fecha,
        contenido: contenido,
        diagnostico: diagnostico,
        tratamiento: tratamiento,
      });
      // owner.markModified("mascota.consultas");
      owner.save((err) => {
        Owner.findById(owner._id)
          .populate("mascota")
          .populate("consulta")
          .populate("vacuna")
          .populate("cirugia")
          .exec((err, result) => {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "ha ocurrido un error linea 45",
              });
            }
            if (!result) {
              return res.status(400).send({
                status: "error",
                message: "no se encontro un ersultado",
              });
            }
            return res.status(200).send({
              status: "SUCCESS",
              result,
            });
          });
      });
    });
  },
};
module.exports = controller;
