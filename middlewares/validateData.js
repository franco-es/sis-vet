"use_strict";

const validator = require("validator");

const create = (req, res, next) => {
  const { nombre, telefono, email, password } = req.body;
  try {
    var validate_nombre = !validator.isEmpty(nombre);
    var validate_telefono = !validator.isEmpty(telefono);
    var validate_email = !validator.isEmpty(email) && validator.isEmail(email);
    var validate_password = !validator.isEmpty(password);
    next();
  } catch (error) {
    res.status(400).send({
      satus: "FAIL",
      message: "faltan datos por enviar en el validador",
      nombre,
      telefono,
      email,
      password,
    });
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  try {
    var validate_email = !validator.isEmpty(email) && validator.isEmail(email);
    var validate_password = !validator.isEmpty(password);
    next();
  } catch (error) {
    res.status(400).send({
      satus: "FAIL",
      message: "faltan datos por enviar en el validador",
      email,
      password,
    });
  }
};
const update = (req, res, next) => {
  const { nombre, telefono, email } = req.body;
  try {
    var validate_nombre = !validator.isEmpty(nombre);
    var validate_telefono = !validator.isEmpty(telefono);
    var validate_email = !validator.isEmpty(email) && validator.isEmail(email);
    next();
  } catch (error) {
    res.status(400).send({
      satus: "FAIL",
      message: "faltan datos por enviar en el validador",
      nombre,
      telefono,
      email,
    });
  }
};

module.exports = { create, login, update };
