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

const Consulta = mongoose.model("consulta", consultaSchema);

const vacunaSchema = Schema({
  nombre: String,
  fecha: String,
  prox_aplicacion: String,
  vete: { type: Schema.ObjectId, ref: "Veterinaria" },
});

const Vacuna = mongoose.model("vacuna", vacunaSchema);

const cirugiaSchema = Schema({
  fecha: String,
  contenido: String,
  vete: { type: Schema.ObjectId, ref: "Veterinaria" },
});

const Cirugia = mongoose.model("cirugia", cirugiaSchema);

const petSchema = Schema({
  nombre: String,
  especie: String,
  raza: String,
  color: String,
  f_nacimiento: String,
  created: { type: Date, default: Date.now },
  consultas: [consultaSchema],
  vacunas: [vacunaSchema],
  cirugia: [cirugiaSchema],
});

const Pet = mongoose.model("mascota", petSchema);

const ownerSchema = Schema({
  nombre: String,
  apellido: String,
  telefono: String,
  direccion: String,
  vete: { type: Schema.ObjectId, ref: "Veterinaria" },
  mascota: [petSchema],
});
const Owner = mongoose.model("owner", ownerSchema);

module.exports = { Owner, Cirugia, Vacuna, Pet, Consulta };
