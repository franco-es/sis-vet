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
      Email: email,
      Contrasenia: password,
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

const validate_employee = (req, res, next) => {
  const { nombre, apellido, matricula } = req.body;
  try {
    var validate_nombre = !validator.isEmpty(nombre);
    var validate_apellido = !validator.isEmpty(apellido);
    var validate_matricula = !validator.isEmpty(matricula);
    next();
  } catch (error) {
    res.status(400).send({
      satus: "FAIL",
      message: "faltan datos por enviar en el validador",
      nombre,
      apellido,
      matricula,
    });
  }
};

const validate_owner = (req, res, next) => {
  const { nombre, apellido, telefono, direccion } = req.body;
  try {
    validate_nombre = !validator.isEmpty(nombre);
    validate_apellido = !validator.isEmpty(apellido);
    validate_telefono = !validator.isEmpty(telefono);
    validate_direccion = !validator.isEmpty(direccion);
  } catch (error) {
    res.status(400).send({
      satus: "FAIL",
      message: "faltan datos por enviar en el validador",
      nombre,
      apellido,
      telefono,
      direccion,
    });
  }
  if (
    validate_nombre &&
    validate_apellido &&
    validate_telefono &&
    validate_direccion
  ) {
    next();
  }
};

module.exports = { create, login, update, validate_employee, validate_owner };
