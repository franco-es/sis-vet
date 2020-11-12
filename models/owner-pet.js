"use strict";
const mongoose = require("mongoose");

const Schema = mongoose.Schema();

let consultaSchema = {
  fecha: Date,
  contenido: String,
  diagnostico: String,
  tratamiento: String,
  vete: { type: Schema.ObjectId, ref: "veterinaria" || "veterinario" },
};

const consulta = mongoose.model("consulta", consultaSchema);

let vacunaSchema = {
  nombre: String,
  f_aplicacion: String,
  prox_aplicacion: String,
  vete: { type: Schema.ObjectId, ref: "veterinaria" || "veterinario" },
};

const vacuna = mongoose.model("vacuna", vacunaSchema);

let cirugiaSchema = {
  fecha: Date,
  contenido: String,
  vete: { type: Schema.ObjectId, ref: "veterinaria" || "veterinario" },
};

const cirugia = mongoose.model("cirugia", cirugiaSchema);

let petSchema = {
  nombre: String,
  especie: String,
  raza: String,
  color: String,
  f_nacimiento: Date,
  consultas: [consultaSchema],
  vacunas: [vacunaSchema],
  cirugia: [cirugiaSchema],
};

const pet = mongoose.model("mascota", petSchema);

let ownerSchema = {
  nombre: String,
  apellido: String,
  telefono: String,
  direccion: String,
  mascota: [petSchema],
};
module.exports = mongoose.model("owner", ownerSchema);
