"use strict";
import DataTypes from "sequelize";
import {sequelize} from "../services/sequelize.js";


const Consulta = sequelize.define("consulta",{
  fecha: {type: DataTypes.STRING},
  contenido: {type: DataTypes.STRING},
  diagnostico: {type: DataTypes.STRING},
  tratamiento: {type: DataTypes.STRING},
  photo: {type: DataTypes.STRING},
});



const Vacuna = sequelize.define("vacuna",{
  nombre: {type: DataTypes.STRING},
  fecha: {type: DataTypes.STRING},
  prox_aplicacion: {type: DataTypes.STRING},
});

const Cirugia = sequelize.define("cirugia",{
  fecha: {type: DataTypes.STRING},
  contenido: {type: DataTypes.STRING},
});

const Owner = sequelize.define("owner",{
  nombre: {type: DataTypes.STRING},
  apellido: {type: DataTypes.STRING},
  telefono: {type: DataTypes.STRING},
  direccion: {type: DataTypes.STRING},
});

const Pet = sequelize.define("pet",{
  nombre: {type: DataTypes.STRING},
  especie: {type: DataTypes.STRING},
  raza: {type: DataTypes.STRING},
  color: {type: DataTypes.STRING},
  f_nacimiento: {type:  DataTypes.DATE},
  photo: {type: DataTypes.STRING},
});

Owner.hasMany(Pet,{
  foreignKey: "ownerId"
})
Pet.hasMany(Cirugia,{
  foreignKey: "petId"
})
Pet.hasMany(Vacuna,{
  foreignKey: "petId"
})
Pet.hasMany(Consulta,{
  foreignKey: "petId"
})


export { Pet, Owner, Cirugia, Vacuna, Consulta };
