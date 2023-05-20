"use strict";

const { Pet } = require("../models/owner_pet").default;


class OwnerController{
  constructor(){};
  async save (req, res) {
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
  }
  async getOwner(req, res) {
    const { idPet } = req.query;
    Pet.findById(idPet, (err, owner) => {
      !owner
        ? res.status(400).send({
            status: "400",
            message: "No se encuentra un dueño.",
          })
        : err
        ? res.status(400).send({
            status: "400",
            message: "Ocurrio un error en la query",
            error: err,
          })
        : res.status(200).send({
            status: "200",
            message: "success",
            owner: owner.owner,
          });
    });
  }
}


export {OwnerController};
