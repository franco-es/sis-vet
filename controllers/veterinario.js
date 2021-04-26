"use strict";

const { Veterinaria } = require("./../models/users");

const controller = {
  save: (req, res) => {
    const { nombre, apellido, matricula } = req.body;
    const { sub } = req.user;
    Veterinaria.findById(sub, (err, result) => {
      result.veterinarios.push({
        nombre: nombre,
        apellido: apellido,
        matricula: matricula,
        imagen: "test.png",
      });
      result.save();
      res.status(200).send({
        status: "success",
        message: "empleado agregado",
        empleado: result,
      });
    });
  },
  getVets: (req, res) => {
    const { sub } = req.user;
    Veterinaria.findById(sub, (err, result) => {
      res.status(200).send({
        status: "success",
        message: "empleados encontrados",
        empleados: result.veterinarios,
      });
    });
  },
  update: (req, res) => {
    const { sub } = req.user;
    const { employeeId } = req.query;
    const { nombre, apellido, matricula } = req.body;
    Veterinaria.updateOne(
      { _id: sub, "veterinarios._id": employeeId },
      {
        $set: {
          "veterinarios.$.nombre": nombre,
          "veterinarios.$.apellido": apellido,
          "veterinarios.$.matricula": matricula,
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
              message: "empleado modificado",
              empleado: result,
            });
      }
    );
  },
  delete: (req, res) => {
    const { sub } = req.user;
    const { employeeId } = req.query;
    Veterinaria.updateOne(
      { _id: sub },
      {
        $pull: {
          veterinarios: { _id: employeeId },
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
