'use strict'

const sequelize = require("sequelize")
const db = require("./../models")
const sha = require('sha1')


  const create = (req, res) =>{
    const params = req.body;
    
    return db.veterinaria.create({
      nombre: params.nombre,
      telefono: params.telefono,
      email: params.email,
      pasword: sha(params.pasword)
    })
    .then(veterinaria => res.status(200).send(veterinaria))
    .catch(e => res.status(400).send(e))
  }
  
module.exports= {create}