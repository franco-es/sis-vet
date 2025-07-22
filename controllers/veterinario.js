"use strict";

import Veterinaria from "../models/Veterinaria.js";
import UsuarioVeterinaria from "../models/UsuarioVeterinaria.js";
import Usuario from "../models/Usuario.js";
import { UserService } from "../services/userService.js";
import { UserVeterinariaService } from "../services/UserVeterinariaService.js";


class EmployeeController {
  // Crear un nuevo veterinario asociado a una veterinaria
  async save(req, res) {

    let usuarioVeterinariaService = new UserVeterinariaService();

    try {
      const veterinaria = await usuarioVeterinariaService.save(req);
      if (!veterinaria) {
        return res.status(404).send({ message: "Veterinaria no encontrada" });
      }

      res.status(200).send({
        status: "success",
        message: "Empleado agregado",
        veterinaria,
      });
    } catch (err) {
      res.status(400).send({ message: "Error al agregar empleado", error: err });
    }
  }

  // Obtener todos los veterinarios asociados a una veterinaria
  async getVets(req, res) {
    const { sub } = req.user;

    let usuarioVeterinariaService = new UserVeterinariaService();

    try {
      const veterinaria = await usuarioVeterinariaService.getEmployeesByVeterinaria(sub);

      res.status(200).send({
        status: "success",
        message: "Empleados encontrados",
        empleados: veterinaria.sv_veterinarios, // Relación automática con el modelo
      });
    } catch (err) {
      console.log(err)
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
