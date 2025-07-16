"use strict";

import pkg from 'validator';
const { isEmpty, isEmail } = pkg;

// Middleware para validar la creación de un usuario
const create = (req, res, next) => {
  const { name, phone, email, password } = req.body;

  try {
    const validate_nombre = !isEmpty(name);
    const validate_telefono = !isEmpty(phone);
    const validate_email = !isEmpty(email) && isEmail(email);
    const validate_password = !isEmpty(password);

    // Si alguna validación falla, enviar error
    if (!validate_nombre || !validate_telefono || !validate_email || !validate_password) {
      return res.status(400).send({
        status: "FAIL",
        message: "Faltan datos por enviar en el validador",
        nombre, telefono, email, password,
      });
    }
    next();
  } catch (error) {
    res.status(400).send({
      status: "FAIL",
      message: "Hubo un error al procesar los datos",
      error,
    });
  }
};

// Middleware para validar el login
const login = (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validate_email = !isEmpty(email) && isEmail(email);
    const validate_password = !isEmpty(password);

    if (!validate_email || !validate_password) {
      return res.status(400).send({
        status: "FAIL",
        message: "Faltan datos por enviar en el validador",
        email, password,
      });
    }
    next();
  } catch (error) {
    res.status(400).send({
      status: "FAIL",
      message: "Hubo un error al procesar los datos",
      error,
    });
  }
};

// Middleware para validar la actualización de un usuario
const update = (req, res, next) => {
  const { nombre, telefono, email } = req.body;

  try {
    const validate_nombre = !isEmpty(nombre);
    const validate_telefono = !isEmpty(telefono);
    const validate_email = !isEmpty(email) && isEmail(email);

    if (!validate_nombre || !validate_telefono || !validate_email) {
      return res.status(400).send({
        status: "FAIL",
        message: "Faltan datos por enviar en el validador",
        nombre, telefono, email,
      });
    }
    next();
  } catch (error) {
    res.status(400).send({
      status: "FAIL",
      message: "Hubo un error al procesar los datos",
      error,
    });
  }
};

// Middleware para validar datos de un empleado
const validate_employee = (req, res, next) => {
  const { nombre, apellido, matricula } = req.body;

  try {
    const validate_nombre = !isEmpty(nombre);
    const validate_apellido = !isEmpty(apellido);
    const validate_matricula = !isEmpty(matricula);

    if (!validate_nombre || !validate_apellido || !validate_matricula) {
      return res.status(400).send({
        status: "FAIL",
        message: "Faltan datos por enviar en el validador",
        nombre, apellido, matricula,
      });
    }
    next();
  } catch (error) {
    res.status(400).send({
      status: "FAIL",
      message: "Hubo un error al procesar los datos",
      error,
    });
  }
};

// Middleware para validar datos del dueño
const validate_owner = (req, res, next) => {
  const { nombre, apellido, telefono, direccion } = req.body;

  try {
    const validate_nombre = !isEmpty(nombre);
    const validate_apellido = !isEmpty(apellido);
    const validate_telefono = !isEmpty(telefono);
    const validate_direccion = !isEmpty(direccion);

    if (!validate_nombre || !validate_apellido || !validate_telefono || !validate_direccion) {
      return res.status(400).send({
        status: "FAIL",
        message: "Faltan datos por enviar en el validador",
        nombre, apellido, telefono, direccion,
      });
    }
    next();
  } catch (error) {
    res.status(400).send({
      status: "FAIL",
      message: "Hubo un error al procesar los datos",
      error,
    });
  }
};

// Middleware para validar datos de la mascota
const validate_pet = (req, res, next) => {
  const { nombre, especie, raza, color, f_nacimiento } = req.body;

  try {
    const validate_nombre = !isEmpty(nombre);
    const validate_especie = !isEmpty(especie);
    const validate_raza = !isEmpty(raza);
    const validate_color = !isEmpty(color);
    const validate_f_nacimiento = !isEmpty(f_nacimiento);

    if (!validate_nombre || !validate_especie || !validate_raza || !validate_color || !validate_f_nacimiento) {
      return res.status(400).send({
        status: "FAIL",
        message: "Faltan datos por enviar en el validador",
        nombre, especie, raza, color, f_nacimiento,
      });
    }
    next();
  } catch (error) {
    res.status(400).send({
      status: "FAIL",
      message: "Hubo un error al procesar los datos",
      error,
    });
  }
};

// Middleware para validar la consulta
const validate_consult = (req, res, next) => {
  const { fecha, contenido, diagnostico, tratamiento } = req.body;

  try {
    const validate_fecha = !isEmpty(fecha);
    const validate_contenido = !isEmpty(contenido);
    const validate_diagnostico = !isEmpty(diagnostico);
    const validate_tratamiento = !isEmpty(tratamiento);

    if (!validate_fecha || !validate_contenido || !validate_diagnostico || !validate_tratamiento) {
      return res.status(400).send({
        status: "FAIL",
        message: "Faltan datos por enviar en el validador",
        fecha, contenido, diagnostico, tratamiento,
      });
    }
    next();
  } catch (error) {
    res.status(400).send({
      status: "FAIL",
      message: "Hubo un error al procesar los datos",
      error,
    });
  }
};

// Middleware para validar datos de la vacuna
const validate_vacuna = (req, res, next) => {
  const { fecha, nombre, prox_aplicacion } = req.body;

  try {
    const validate_fecha = !isEmpty(fecha);
    const validate_nombre = !isEmpty(nombre);
    const validate_prox_aplicacion = !isEmpty(prox_aplicacion);

    if (!validate_fecha || !validate_nombre || !validate_prox_aplicacion) {
      return res.status(400).send({
        status: "FAIL",
        message: "Faltan datos por enviar en el validador",
        fecha, nombre, prox_aplicacion,
      });
    }
    next();
  } catch (error) {
    res.status(400).send({
      status: "FAIL",
      message: "Hubo un error al procesar los datos",
      error,
    });
  }
};

// Middleware para validar la cirugía
const validate_cirugia = (req, res, next) => {
  const { fecha, contenido } = req.body;

  try {
    const validate_fecha = !isEmpty(fecha);
    const validate_contenido = !isEmpty(contenido);

    if (!validate_fecha || !validate_contenido) {
      return res.status(400).send({
        status: "FAIL",
        message: "Faltan datos por enviar en el validador",
        fecha, contenido,
      });
    }
    next();
  } catch (error) {
    res.status(400).send({
      status: "FAIL",
      message: "Hubo un error al procesar los datos",
      error,
    });
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
