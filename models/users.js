"use strict";
import DataTypes from "sequelize";
import {sequelize} from "../services/sequelize.js";

const User = sequelize.define("user",{
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
const Vete = sequelize.define("veterinario",{
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
