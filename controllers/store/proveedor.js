'use strict';

const [ Proveedor ] = require('../../models/store/proveedor');

const controller = {
    save: async (req, res) => {
       const {nombre, dir, phone} = req.body; 

       const proveedor = new Proveedor({
        nombre,
        dir,
        phone
       });

       proveedor.save((err, prov)=>{
        err
          ? res.status(400).send(err)
          : res.status(200).send({
            status: '200',
            message: 'success',
            proveedor: prov,
          })
       })
    },
    getAll: async (req, res) =>{
        
    },
    update: async (req, res) => {

    },
    delete: async (req, res) => {

    }
}

module.exports = controller;