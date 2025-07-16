"use strict";

import Veterinaria from "../models/Veterinaria.js";
import UsuarioVeterinaria from "../models/UsuarioVeterinaria.js";
import Usuario from "../models/Usuario.js";


class EmployeeController {
  // Crear un nuevo veterinario asociado a una veterinaria
  async save(req, res) {
    const { name, phone, email, img_url, password } = req.body;
    const { sub } = req.user; // ID del usuario (veterinaria) extraído del token

    try {
      const veterinaria = await Veterinaria.findByPk(sub);
      if (!veterinaria) {
        return res.status(404).send({ message: "Veterinaria no encontrada" });
      }

      const userEmployee = await Usuario().create({
        nombre: name,
        telefono: phone,
        email: email.toLowerCase(),
        img_url,
        habilitado: true,
        eliminado: false,
        password: password
      });

      res.status(200).send({
        status: "success",
        message: "Empleado agregado",
        empleado,
      });
    } catch (err) {
      res.status(400).send({ message: "Error al agregar empleado", error: err });
    }
  }

  // Obtener todos los veterinarios asociados a una veterinaria
  async getVets(req, res) {
    const { sub } = req.user;

    try {
      const veterinaria = await Veterinaria().findByPk(sub, {
        include: [{ model: UsuarioVeterinaria() }], // Incluye los veterinarios relacionados
      });

      if (!veterinaria) {
        return res.status(404).send({ message: "Veterinaria no encontrada" });
      }

      res.status(200).send({
        status: "success",
        message: "Empleados encontrados",
        empleados: veterinaria.sv_veterinarios, // Relación automática con el modelo
      });
    } catch (err) {
      res.status(400).send({ message: "Error al obtener empleados", error: err });
    }
  }

  // Actualizar información de un veterinario
  async update(req, res) {
    const { employeeId } = req.query; // ID del veterinario
    const { name, phone, age, img_url } = req.body;

    try {
      const empleado = await Veterinario.findByPk(employeeId);
      if (!empleado) {
        return res.status(404).send({ message: "Empleado no encontrado" });
      }

      await empleado.update({ name, phone, age, img_url });

      res.status(200).send({
        status: "success",
        message: "Empleado modificado",
        empleado,
      });
    } catch (err) {
      res.status(400).send({ message: "Error al modificar empleado", error: err });
    }
  }

  // Eliminar un veterinario (soft delete)
  async delete(req, res) {
    const { employeeId } = req.query;

    try {
      const empleado = await Veterinario.findByPk(employeeId);
      if (!empleado) {
        return res.status(404).send({ message: "Empleado no encontrado" });
      }

      // Actualiza el campo `deleted` para realizar un soft delete
      await empleado.update({ deleted: "true", active: "false" });

      res.status(200).send({
        status: "success",
        message: "Empleado eliminado",
      });
    } catch (err) {
      res.status(400).send({ message: "Error al eliminar empleado", error: err });
    }
  }
}

export { EmployeeController };
