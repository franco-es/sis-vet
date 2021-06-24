"use strict";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const consultaSchema = Schema({
  fecha: String,
  contenido: String,
  diagnostico: String,
  tratamiento: String,
  vete: { type: Schema.ObjectId, ref: "Veterinaria" },
});

const vacunaSchema = Schema({
  nombre: String,
  fecha: String,
  prox_aplicacion: String,
  vete: { type: Schema.ObjectId, ref: "Veterinaria" },
});

const cirugiaSchema = Schema({
  fecha: String,
  contenido: String,
  vete: { type: Schema.ObjectId, ref: "Veterinaria" },
});

const ownerSchema = Schema({
  nombre: String,
  apellido: String,
  telefono: String,
  direccion: String,
  vete: { type: Schema.ObjectId, ref: "Veterinaria" },
});

const petSchema = Schema({
  nombre: String,
  especie: String,
  raza: String,
  color: String,
  f_nacimiento: Date,
  created: { type: Date, default: Date.now },
  owner: ownerSchema,
  consultas: [consultaSchema],
  vacunas: [vacunaSchema],
  cirugia: [cirugiaSchema],
  vete: { type: Schema.ObjectId, ref: "Veterinaria" },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = { Pet };
