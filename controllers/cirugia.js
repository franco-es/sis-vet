"use strict";

import { Pet, Cirugia } from "../models/owner_pet.js";

class CirugiaController {
  constructor() {}

  async save(req, res) {
    const { idPet } = req.query;
    const { fecha, contenido } = req.body;

    try {
      const pet = await Pet.findByPk(idPet); // Busca la mascota por su ID
      if (!pet) {
        return res.status(404).send({ status: "error", message: "Mascota no encontrada" });
      }

      // Crea una nueva cirug�a asociada a la mascota
      const cirugia = await Cirugia.create({
        fecha,
        contenido,
        petId: pet.id, // Relaci�n con la mascota
      });

      res.status(200).send({
        status: "success",
        message: "Cirug�a agregada",
        cirugia,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurri� un error", error: err });
    }
  }

  async update(req, res) {
    const { idCirugia } = req.query;
    const { fecha, contenido } = req.body;

    try {
      const cirugia = await Cirugia.findByPk(idCirugia); // Busca la cirug�a por su ID
      if (!cirugia) {
        return res.status(404).send({ status: "error", message: "Cirug�a no encontrada" });
      }

      // Actualiza la cirug�a
      cirugia.fecha = fecha;
      cirugia.contenido = contenido;

      await cirugia.save();

      res.status(200).send({
        status: "success",
        message: "Cirug�a actualizada",
        cirugia,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurri� un error", error: err });
    }
  }

  async getCirugia(req, res) {
    const { idPet } = req.query;

    try {
      const cirugias = await Cirugia.findAll({
        where: { petId: idPet }, // Filtra por el ID de la mascota
      });

      if (!cirugias.length) {
        return res.status(404).send({ status: "error", message: "No se encontraron cirug�as para esta mascota" });
      }

      res.status(200).send({
        status: "success",
        resultado: cirugias,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurri� un error", error: err });
    }
  }

  async delete(req, res) {
    const { idCirugia } = req.query;

    try {
      const cirugia = await Cirugia.findByPk(idCirugia); // Busca la cirug�a por su ID
      if (!cirugia) {
        return res.status(404).send({ status: "error", message: "Cirug�a no encontrada" });
      }

      await cirugia.destroy(); // Elimina la cirug�a

      res.status(200).send({
        status: "success",
        message: "Cirug�a eliminada",
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurri� un error", error: err });
    }
  }
}

export { CirugiaController };
