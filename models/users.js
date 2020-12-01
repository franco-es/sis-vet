"use strict";
const mongoose = require("mongoose");
// const { delete } = require("./../app");
const Schema = mongoose.Schema;

var veteSChema = Schema({
  nombre: String,
  apellido: String,
  matricula: String,
  imagen: String,
});

const vete = mongoose.model("veterinario", veteSChema);

var userSchema = Schema({
  nombre: String,
  telefono: String,
  email: String,
  password: String,
  role: String,
  imagen: String,
  habilitado: Boolean,
  eliminado: Boolean,
  veterinarios: [veteSChema],
});



const Veterinaria =  mongoose.model("veterinaria", userSchema);

module.exports = {vete, Veterinaria}
// userSchema.methods.toJSON = () => {
//   const obj = this.toObjct();
//   delete obj.password;

//   return obj;
// };
