"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");

exports.createToken = (user) => {
  var payload = {
    sub: user._id,
    nombre: user.name,
    email: user.email,
    role: user.role,
    image: user.img_url,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix,
  };
  return jwt.encode(payload, "esta_es_la_clave_secreta_1234_0987");
};
