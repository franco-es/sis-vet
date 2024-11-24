'use strict';

const { Producto } = require('../../models/store/Product');
const { Sale } = require('../../models/store/sale');

const controller = {
    save: async (req, res) => {
        const {date, productAndQuantity, amaunt, saleNumber, paymentType} = req.body;

        const sale = await new Sale({
            date,
            saleNumber,
            paymentType,
            products: productAndQuantity
        });

        sale.save((err, prov) => {            
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
        const sales = await Sale.find();
        res.status(200).send({
            status: 200,
            message: "success",
            sales: sales
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