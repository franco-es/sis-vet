"use strict";
const mongoose = require("mongoose");
const DataTypes = require("sequelize");
const db = require("../services/sequelize");
// const { delete } = require("./../app");
const Schema = mongoose.Schema;

// var veteSChema = Schema({
//   nombre: String,
//   apellido: String,
//   matricula: { type: String, Unique: true },
//   imagen: String,
// });

// var userSchema = Schema({
//   nombre: String,
//   telefono: String,
//   email: {
//     type: String,
//     Unique: true,
//   },
//   password: String,
//   role: String,
//   imagen: String,
//   habilitado: Boolean,
//   eliminado: Boolean,
//   veterinarios: [veteSChema],
// });

// const Veterinaria = mongoose.model("Veterinaria", userSchema);

// module.exports = { Veterinaria };

const User = db.define("sv_user",{
  name:{type: DataTypes.STRING},
  phone:{type: DataTypes.STRING},
  email:{type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail: true
    }
  },
  pass:{type: DataTypes.STRING},
  role:{type: DataTypes.STRING},
  active:{type: DataTypes.STRING},
  deleted:{type: DataTypes.STRING},
});
const Vete = db.define("sv_veterinario",{
  name:{type: DataTypes.STRING},
  phone:{type: DataTypes.STRING},
  age:{type: DataTypes.STRING},
  img_url:{type: DataTypes.STRING},
  active:{type: DataTypes.STRING},
  deleted:{type: DataTypes.STRING},
});

User.hasMany(Vete,{
  foreignKey: "userId"
});

module.exports = {Vete, User}