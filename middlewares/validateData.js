"use_strict";

import pkg from 'validator';
const { isEmpty, isEmail } = pkg;

const create = (req, res, next) => {
  const { nombre, telefono, email, password } = req.body;
  try {
    var validate_nombre = !isEmpty(nombre);
    var validate_telefono = !isEmpty(telefono);
    var validate_email = !isEmpty(email) && isEmail(email);
    var validate_password = !isEmpty(password);
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
    var validate_email = !isEmpty(email) && isEmail(email);
    var validate_password = !isEmpty(password);
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
    var validate_nombre = !isEmpty(nombre);
    var validate_telefono = !isEmpty(telefono);
    var validate_email = !isEmpty(email) && isEmail(email);
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
    var validate_nombre = !isEmpty(nombre);
    var validate_apellido = !isEmpty(apellido);
    var validate_matricula = !isEmpty(matricula);
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
    validate_nombre = !isEmpty(nombre);
    validate_apellido = !isEmpty(apellido);
    validate_telefono = !isEmpty(telefono);
    validate_direccion = !isEmpty(direccion);
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
    validate_nombre = !isEmpty(nombre);
    validate_especie = !isEmpty(especie);
    validate_raza = !isEmpty(raza);
    validate_color = !isEmpty(color);
    validate_f_nacimiento = !isEmpty(f_nacimiento);
  } catch (error) {
    res.status(400).send({
      satus: "FAIL",
      message: "faltan datos por enviar en el validador",
      nombre,
      especie,
      raza,
      color,
      f_nacimiento,
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
    validate_fecha = !isEmpty(fecha);
    validate_contenido = !isEmpty(contenido);
    validate_diagnostico = !isEmpty(diagnostico);
    validate_tratamiento = !isEmpty(tratamiento);
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
const validate_vacuna = (req, res, next) => {
  const { fecha, nombre, prox_aplicacion } = req.body;

  try {
    validate_fecha = !isEmpty(fecha);
    validate_nombre = !isEmpty(nombre);
    validate_prox_aplicacion = !isEmpty(prox_aplicacion);
  } catch (error) {
    res.status(400).send({
      satus: "FAIL",
      message: "faltan datos por enviar en el validador",
      fecha,
      nombre,
      prox_aplicacion,
    });
  }
  if (validate_fecha && validate_nombre && validate_prox_aplicacion) {
    next();
  }
};
const validate_cirugia = (req, res, next) => {
  const { fecha, contenido } = req.body;

  try {
    validate_fecha = !isEmpty(fecha);
    validate_contenido = !isEmpty(contenido);
  } catch (error) {
    res.status(400).send({
      satus: "FAIL",
      message: "faltan datos por enviar en el validador",
      fecha,
      contenido,
    });
  }
  if (validate_fecha && validate_contenido) {
    next();
  }
};
export {
  create,
  login,
  update,
  validate_employee,
  validate_owner,
  validate_pet,
  validate_consult,
  validate_vacuna,
  validate_cirugia,
};
