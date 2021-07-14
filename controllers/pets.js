"use strict";

const { Pet } = require("./../models/owner_pet");
const FileSystem = require("../services/uploadImage");

const controller = {
  save: async (req, res) => {
    const { sub } = req.user;
    const { nombre, especie, raza, color, f_nacimiento } = req.body;

    const mascota = await new Pet({
      nombre: nombre,
      especie: especie,
      raza: raza,
      color: color,
      f_nacimiento: f_nacimiento,
      vete: sub,
    });
    mascota.save((err, mascota) => {
      err
        ? res.status(400).send(err)
        : res.status(200).send({
            status: "200",
            message: "success",
            mascota: mascota,
          });
    });
  },
  update: (req, res) => {
    const { idPet } = req.query;
    const { nombre, especie, raza, color } = req.body;

    Pet.findByIdAndUpdate(
      idPet,
      {
        $set: {
          nombre: nombre,
          especie: especie,
          raza: raza,
          color: color,
        },
      },
      { new: true },
      (err, result) => {
        !result
          ? res.status(400).send({ message: "no hay mascota" })
          : err
          ? res.status(400).send({ message: "no existe la mascota" })
          : res.status(200).send({
              status: "200",
              message: "success",
              pet: result,
            });
      }
    );
  },
  delete: (req, res) => {
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
    // const { sub } = req.user;
    const { idPet } = req.query;

    Pet.findById(idPet, (err, result) => {
      !result
        ? res.status(400).send({ message: "no hay mascota" })
        : err
        ? res.status(400).send({ message: "no existe la mascota" })
        : res.status(200).send({
            status: "200",
            message: "success",
            pet: result,
          });
    });
  },
  findAll: (req, res) => {
    const { sub } = req.user;
    Pet.find({ vete: sub }, (err, result) => {
      !result
        ? res.status(400).send({ message: "no hay resultado" })
        : err
        ? res
            .status(400)
            .send({ message: "no existen mascotas para este usuaio" })
        : res.status(200).send({
            status: "200",
            message: "success",
            pet: result,
          });
    });
  },
  uploadRayX: (req, res) => {
    const { idPet, idConsulta } = req.query;
    console.log(req.file);
    Pet.updateOne(
      { _id: idPet, "consultas._id": idConsulta },
      {
        $set: {
          "consultas.$.photo": req.file.filename,
        },
      },
      { multi: true },
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
};

module.exports = controller;
