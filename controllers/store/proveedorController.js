'use strict';

const {Proveedor} = require('../../models/store/proveedor');

const controller = {
    save: async (req, res) => {
        const {nombre, telefono, email, direccion, cuit} = req.body;

        const proveedor = await new Proveedor({
            nombre,
            telefono,
            email,
            direccion,
            cuit
        });

        proveedor.save((err, prov) => {
            err
                ? res.status(400).send(err)
                : res.status(200).send({
                    status: '200',
                    message: 'success',
                    proveedor: prov,
                })
        })
    },
    getAll: async (req, res) => {
        const proveedor = await Proveedor.find();
        res.status(200).send({
            status: 200,
            message: "success",
            proveedores: proveedor
        })
    },
    update: async (req, res) => {

    },
    delete: async (req, res) => {

    }
}

module.exports = controller;