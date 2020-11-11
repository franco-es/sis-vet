"use strict";
const mongoose = require("mongoose");
// const { delete } = require("./../app");
const Schema = mongoose.Schema;

var userSchema = Schema({
  nombre: String,
  telefono: String,
  email: String,
  password: String,
  role: String,
  imagen: String,
  habilitado: Boolean,
  eliminado: Boolean,
});

// userSchema.methods.toJSON = () => {
//   const obj = this.toObjct();
//   delete obj.password;

//   return obj;
// };
module.exports = mongoose.model("Veterinaria", userSchema);
