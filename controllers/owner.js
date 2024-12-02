"use strict";
import { Owner, Pet } from "../models/owner_pet.js";

class OwnerController {
  constructor() {}

  // Crear un nuevo dueño y asociarlo a una mascota
  async save(req, res) {
    const { nombre, apellido, telefono, direccion } = req.body;
    const { idPet } = req.query;

    try {
      const pet = await Pet.findByPk(idPet); // Busca la mascota por su ID
      if (!pet) {
        return res.status(404).send({ status: "error", message: "Mascota no encontrada" });
      }

      // Crea un nuevo dueño
      const owner = await Owner.create({
        nombre,
        apellido,
        telefono,
        direccion,
      });

      // Asocia el dueño a la mascota
      pet.ownerId = owner.id;
      await pet.save();

      res.status(200).send({
        status: "success",
        message: "Dueño creado y asociado a la mascota",
        owner,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurrió un error", error: err });
    }
  }

  // Leer información del dueño asociado a una mascota
  async getOwner(req, res) {
    const { idPet } = req.query;

    try {
      const pet = await Pet.findByPk(idPet, { include: Owner }); // Incluye al dueño en la consulta
      if (!pet || !pet.owner) {
        return res.status(404).send({ status: "error", message: "Dueño no encontrado para esta mascota" });
      }

      res.status(200).send({
        status: "success",
        message: "Dueño encontrado",
        owner: pet.owner,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurrió un error", error: err });
    }
  }

  // Actualizar la información de un dueño
  async update(req, res) {
    const { idOwner } = req.query;
    const { nombre, apellido, telefono, direccion } = req.body;

    try {
      const owner = await Owner.findByPk(idOwner); // Busca al dueño por su ID
      if (!owner) {
        return res.status(404).send({ status: "error", message: "Dueño no encontrado" });
      }

      // Actualiza los campos proporcionados
      owner.nombre = nombre || owner.nombre;
      owner.apellido = apellido || owner.apellido;
      owner.telefono = telefono || owner.telefono;
      owner.direccion = direccion || owner.direccion;

      await owner.save();

      res.status(200).send({
        status: "success",
        message: "Dueño actualizado",
        owner,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurrió un error", error: err });
    }
  }

  // Eliminar un dueño
  async delete(req, res) {
    const { idOwner } = req.query;

    try {
      const owner = await Owner.findByPk(idOwner); // Busca al dueño por su ID
      if (!owner) {
        return res.status(404).send({ status: "error", message: "Dueño no encontrado" });
      }

      await owner.destroy(); // Elimina el dueño

      res.status(200).send({
        status: "success",
        message: "Dueño eliminado",
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurrió un error", error: err });
    }
  }

  // Obtener todos los dueños
  async getAll(req, res) {
    try {
      const owners = await Owner.findAll(); // Obtiene todos los dueños
      res.status(200).send({
        status: "success",
        message: "Dueños encontrados",
        owners,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurrió un error", error: err });
    }
  }
}

export { OwnerController };
