"use strict";
const { where, op } = require("sequelize");
const sequelize = require("sequelize");
const db = require("./../models").veterinaria;
const sha1 = require("sha1");

const controller = {
  create: (req, res) => {
    const params = req.body;

    db.create({
      nombre: params.nombre,
      telefono: params.telefono,
      email: params.email,
      pasword: sha1(params.pasword),
    })
      .then((veterinaria) => res.status(200).send(veterinaria))
      .catch((e) => res.status(400).send(e));
  },
  getAll: (_, res) => {
    db.findAll({where:{habilitado : 1}})
      .then((db) => res.status(200).send(db))
      .catch((e) => res.status(400).send(e));
  },
  updateVet: (req, res) => {
    const params = req.body;
    db.update(
      {
        nombre: params.nombre,
        telefono: params.telefono
      },{
          where: 
            {
              id : req.params.id
            }
              })
              .then((db) => res.status(200).send(db))
              .catch((e) => res.status(400).send(e))
  },
  deleteVet: (req, res) => {
    db.update(
      {
        habilitado:0,
        eliminado: 1
      }, {where:{
        id: req.params.id
      }
    })
    .then((db) => res.status(200).send({
      message: "veterinario eliminado"
    }))
    .catch((e) => res.status(400).send(e))
  }
};

module.exports = controller;
