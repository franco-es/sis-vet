"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "esta_es_la_clave_secreta_1234_0987";

exports.authenticated = (req, res, next) => {
  const { authorization } = req.headers;
  // COMPROBAR SI LLEGA AUTORISACION
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: "la peticion no tiene la cabecera de authorization",
    });
  }
  // LIMPIAR EL TOKEN Y QUITAR COMILLAS SI LAS TRAE
  var token = authorization.replace(/['"]+/g, "");
  try {
    // DECODIFICAR TOKEN
    var payload = jwt.decode(token, secret);
    // COMPROBAR LA EXPIRACION DEL TOKEN
    if (payload.exp <= moment().unix()) {
      return res.status(404).send({
        message: "el token ha expirado",
      });
    }
  } catch (ex) {
    return res.status(404).send({
      message: "el token no es valido",
    });
  }
  // ADJUNTAR USUARIO IDENTIFICADO A LA REQUEST
  req.user = payload;
  // REALIZAR SIGUIENTE ACCION DE LA RUTA
  next();
};
