"use strict";
import DataTypes from "sequelize";
import {conn} from "../services/sequelize.js";

const sequelize = conn.sequelize;

const User = sequelize.define("sv_user",{
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
const Vete = sequelize.define("sv_veterinario",{
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

export {Vete, User}
