'use strict';

const {Producto} = require('../../models/store/Product');
const {Proveedor} = require('../../models/store/proveedor');

const controller = {
    save: async (req, res) => {
        const {nombre, costo, ganancia, stock, proveedorId} = req.body;

        const producto = await new Producto({
            nombre,
            costo,
            ganancia,
            stock,
        });

        var precVenta = calculateGanancia(costo, ganancia);
        producto.precVenta = precVenta;

        var proveedor = await Proveedor.findById(proveedorId).exec();
        if(proveedor != null && proveedor != undefined){
            producto.proveedor = proveedor;
        }

        producto.save((err, prov) => {
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
        const products = await Producto.find();
        res.status(200).send({
            status: 200,
            message: "success",
            productos: products
        })

    },
    getAllByProveedor: async (req, res) => {
        const {proveedorId} = req.body;
        const products = await Producto.find({proveedor : proveedorId});
        res.status(200).send({
            status: 200,
            message: "success",
            productos: products
        })
    },
    update: async (req, res) => {

    },
    delete: async (req, res) => {

    }
}

const calculateGanancia = function (costo, ganancia) {
    return costo * (1+(ganancia/100));
}

module.exports = controller;