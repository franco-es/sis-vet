"use strict";

const Owner = require("./../models/owner_pet");

const controller = {
  save: (req, res) => {
    const { idOwner } = req.params;
    const { nombre, especie, raza, color, f_nacimiento } = req.body;

    Owner.findById(idOwner).exec((err, owner) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "ha ocurrido un error",
        });
      }
      if (!owner) {
        return res.status(400).send({
          status: "error",
          message: "no se encuentra un usuario",
        });
      }
      if (nombre && especie && raza && color && f_nacimiento) {
        const mascota = {
          nombre: nombre,
          especie: especie,
          raza: raza,
          color: color,
          f_nacimiento: f_nacimiento,
        };
        owner.mascota.push(mascota);
        owner.save((err) => {
          if (err) {
            console.log(err);
            return res.status(500).send({
              status: "error",
              message: "ha ocurrido un error linea 36",
            });
          }
          Owner.findById(owner._id)
            .populate("mascota")
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
      }
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
  delete: (req, res) => {     //NO USAR!! ELIMINA EL USUARIO.
    const { idPet } = req.params;

    Owner.findOneAndDelete({ "mascota._id": idPet }, (err, petUpdated) => {
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
        mascota: "mascota eliminada",
      });
    });
  },
};

module.exports = controller;
