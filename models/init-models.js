var DataTypes = require("sequelize").DataTypes;
var _owner = require("./owner");
var _consulta = require("./consulta");
var _cirugia = require("./cirugia");
var _mascotas = require("./mascotas");
var _sequelizemeta = require("./sequelizemeta");
var _vacuna = require("./vacuna");
var _veterinaria = require("./veterinaria");
var _veterinarios = require("./veterinarios");

function initModels(sequelize) {
  var owner = _owner(sequelize, DataTypes);
  var consulta = _consulta(sequelize, DataTypes);
  var cirugia = _cirugia(sequelize, DataTypes);
  var mascotas = _mascotas(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var vacuna = _vacuna(sequelize, DataTypes);
  var veterinaria = _veterinaria(sequelize, DataTypes);
  var veterinarios = _veterinarios(sequelize, DataTypes);

  return {
    owner,
    consulta,
    cirugia,
    mascotas,
    sequelizemeta,
    vacuna,
    veterinaria,
    veterinarios,
  };
}
module.exports = { initModels };
