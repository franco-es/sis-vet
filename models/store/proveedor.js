const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');

const Schema = mongoose.Schema;

var proveedorSchema = Schema({
    nombre: String,
    dir: String,
    phone: INTEGER,
})

const Proveedor = mongoose.model('Proveedor', proveedorSchema);

module.exports = {Proveedor};