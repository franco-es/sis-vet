"use strict";
import {db, conn} from "../services/sequelize.js";


export const User = db.define("sv_users",{
  name:{type: conn.Sequelize.STRING},
  phone:{type: conn.Sequelize.STRING},
  email:{type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  pass:{type: conn.Sequelize.STRING},
  role:{type: conn.Sequelize.STRING},
  active:{type: conn.Sequelize.BOOLEAN},
  deleted:{type: conn.Sequelize.BOOLEAN},
});
export const Vete = db.define("sv_veterinarios",{
  name:{type: conn.Sequelize.STRING},
  phone:{type: conn.Sequelize.STRING},
  age:{type: conn.Sequelize.STRING},
  img_url:{type: conn.Sequelize.STRING},
  active:{type: conn.Sequelize.STRING},
  deleted:{type: conn.Sequelize.STRING},
});

User.hasMany(Vete,{
  foreignKey: "userId"
});