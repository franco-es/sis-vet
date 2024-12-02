"use strict";
import { Owner, Pet } from "../models/owner_pet.js";

class OwnerController {
  constructor() {}

  // Crear un nuevo due�o y asociarlo a una mascota
  async save(req, res) {
    const { nombre, apellido, telefono, direccion } = req.body;
    const { idPet } = req.query;

    try {
      const pet = await Pet.findByPk(idPet); // Busca la mascota por su ID
      if (!pet) {
        return res.status(404).send({ status: "error", message: "Mascota no encontrada" });
      }

      // Crea un nuevo due�o
      const owner = await Owner.create({
        nombre,
        apellido,
        telefono,
        direccion,
      });

      // Asocia el due�o a la mascota
      pet.ownerId = owner.id;
      await pet.save();

      res.status(200).send({
        status: "success",
        message: "Due�o creado y asociado a la mascota",
        owner,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurri� un error", error: err });
    }
  }

  // Leer informaci�n del due�o asociado a una mascota
  async getOwner(req, res) {
    const { idPet } = req.query;

    try {
      const pet = await Pet.findByPk(idPet, { include: Owner }); // Incluye al due�o en la consulta
      if (!pet || !pet.owner) {
        return res.status(404).send({ status: "error", message: "Due�o no encontrado para esta mascota" });
      }

      res.status(200).send({
        status: "success",
        message: "Due�o encontrado",
        owner: pet.owner,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurri� un error", error: err });
    }
  }

  // Actualizar la informaci�n de un due�o
  async update(req, res) {
    const { idOwner } = req.query;
    const { nombre, apellido, telefono, direccion } = req.body;

    try {
      const owner = await Owner.findByPk(idOwner); // Busca al due�o por su ID
      if (!owner) {
        return res.status(404).send({ status: "error", message: "Due�o no encontrado" });
      }

      // Actualiza los campos proporcionados
      owner.nombre = nombre || owner.nombre;
      owner.apellido = apellido || owner.apellido;
      owner.telefono = telefono || owner.telefono;
      owner.direccion = direccion || owner.direccion;

      await owner.save();

      res.status(200).send({
        status: "success",
        message: "Due�o actualizado",
        owner,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurri� un error", error: err });
    }
  }

  // Eliminar un due�o
  async delete(req, res) {
    const { idOwner } = req.query;

    try {
      const owner = await Owner.findByPk(idOwner); // Busca al due�o por su ID
      if (!owner) {
        return res.status(404).send({ status: "error", message: "Due�o no encontrado" });
      }

      await owner.destroy(); // Elimina el due�o

      res.status(200).send({
        status: "success",
        message: "Due�o eliminado",
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurri� un error", error: err });
    }
  }

  // Obtener todos los due�os
  async getAll(req, res) {
    try {
      const owners = await Owner.findAll(); // Obtiene todos los due�os
      res.status(200).send({
        status: "success",
        message: "Due�os encontrados",
        owners,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurri� un error", error: err });
    }
  }
}

export { OwnerController };
