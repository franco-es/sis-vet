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

const validate_pet = (req, res, next) => {
  const { nombre, especie, raza, color, f_nacimiento } = req.body;
  try {
    validate_nombre = !validator.isEmpty(nombre);
    validate_especie = !validator.isEmpty(especie);
    validate_raza = !validator.isEmpty(raza);
    validate_color = !validator.isEmpty(color);
    validate_f_nacimiento = !validator.isEmpty(f_nacimiento);
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
    validate_especie &&
    validate_raza &&
    validate_color &&
    validate_f_nacimiento
  ) {
    next();
  }
};

const validate_consult = (req, res, next) => {
  const { fecha, contenido, diagnostico, tratamiento } = req.body;

  try {
    validate_fecha = !validator.isEmpty(fecha);
    validate_contenido = !validator.isEmpty(contenido);
    validate_diagnostico = !validator.isEmpty(diagnostico);
    validate_tratamiento = !validator.isEmpty(tratamiento);
  } catch (error) {
    res.status(400).send({
      satus: "FAIL",
      message: "faltan datos por enviar en el validador",
      fecha,
      contenido,
      diagnostico,
      tratamiento,
    });
  }
  if (
    validate_fecha &&
    validate_contenido &&
    validate_diagnostico &&
    validate_tratamiento
  ) {
    next();
  }
};
module.exports = {
  create,
  login,
  update,
  validate_employee,
  validate_owner,
  validate_pet,
  validate_consult,
};
