"use strict";
import {conn} from "../services/sequelize.js";

const sequelize = conn.sequelize;


const Consulta = sequelize.define("sv_consulta",{
  fecha: {type: conn.Sequelize.STRING},
  contenido: {type: conn.Sequelize.STRING},
  diagnostico: {type: conn.Sequelize.STRING},
  tratamiento: {type: conn.Sequelize.STRING},
  photo: {type: conn.Sequelize.STRING},
});



const Vacuna = sequelize.define("sv_vacunas",{
  nombre: {type: conn.Sequelize.STRING},
  fecha: {type: conn.Sequelize.STRING},
  prox_aplicacion: {type: conn.Sequelize.STRING},
});

const Cirugia = sequelize.define("sv_cirugia",{
  fecha: {type: conn.Sequelize.STRING},
  contenido: {type: conn.Sequelize.STRING},
});

const Owner = sequelize.define("sv_owners",{
  nombre: {type: conn.Sequelize.STRING},
  apellido: {type: conn.Sequelize.STRING},
  telefono: {type: conn.Sequelize.STRING},
  direccion: {type: conn.Sequelize.STRING},
});

const Pet = sequelize.define("sv_pets",{
  nombre: {type: conn.Sequelize.STRING},
  especie: {type: conn.Sequelize.STRING},
  raza: {type: conn.Sequelize.STRING},
  color: {type: conn.Sequelize.STRING},
  f_nacimiento: {type:  conn.Sequelize.DATE},
  photo: {type: conn.Sequelize.STRING},
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
