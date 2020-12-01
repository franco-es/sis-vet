"use strict";

const {
  Owner,
  Cirugia,
  Vacuna,
  Pet,
  Consulta,
} = require("./../models/owner_pet");

const controller = {
  save: (req, res) => {
    const { idOwner } = req.query;
    const { nombre, especie, raza, color, f_nacimiento } = req.body;

    const mascota = new Pet({
      nombre: nombre,
      especie: especie,
      raza: raza,
      color: color,
      f_nacimineto: f_nacimiento,
    });
    mascota.save((err, mascota) => {
      console.log(mascota);
      Owner.update(
        { _id: idOwner },
        {
          $push: { mascota: mascota },
        },
        (err, addpet) => {
          return res.status(200).send({
            pet: addpet,
          });
        }
      );
    });
  },
  update: (req, res) => {
    const { idPet } = req.params;
    const { nombre, especie, raza, color } = req.body;

    Owner.findOneAndUpdate(
      { "mascota._id": idPet },
      {
        $set: {
          "mascota.$.nombre": nombre,
          "mascota.$.especie": especie,
          "mascota.$.raza": raza,
          "mascota.$.color": color,
        },
      },
      { new: true },
      (err, petUpdated) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error en la petición",
          });
        }

        if (!petUpdated) {
          return res.status(404).send({
            status: "error",
            message: "No existe el perro / gato/ etc",
          });
        }
        return res.status(200).send({
          status: "success",
          mascota: petUpdated,
        });
      }
    );
  },
  delete: (req, res) => {
    //NO USAR!! ELIMINA EL USUARIO.
    const { idOwner, idPet } = req.query;

    Owner.findById({ _id: idOwner }, (err, duenio) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error en la petición",
          err,
        });
      }

      if (!duenio) {
        return res.status(404).send({
          status: "error",
          message: "No existe el duenio",
        });
      }
      duenio.mascota.remove(idPet);
      duenio.save((err) => {
        return res.status(200).send({
          status: "success",
          duneio: duenio,
        });
      });
    });
  },
  findOne: (req, res) => {
    const { idPet } = req.query;

    Pet.findOne({ _id: idPet })
      .populate("Consultas")
      .populate("Cirugia")
      .populate("Vacuna")
      .exec((e, result) => {
        return res.send({
          result,
        });
      });
  },
};

module.exports = controller;
