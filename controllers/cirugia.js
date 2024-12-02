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

      // Crea una nueva cirugía asociada a la mascota
      const cirugia = await Cirugia.create({
        fecha,
        contenido,
        petId: pet.id, // Relación con la mascota
      });

      res.status(200).send({
        status: "success",
        message: "Cirugía agregada",
        cirugia,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurrió un error", error: err });
    }
  }

  async update(req, res) {
    const { idCirugia } = req.query;
    const { fecha, contenido } = req.body;

    try {
      const cirugia = await Cirugia.findByPk(idCirugia); // Busca la cirugía por su ID
      if (!cirugia) {
        return res.status(404).send({ status: "error", message: "Cirugía no encontrada" });
      }

      // Actualiza la cirugía
      cirugia.fecha = fecha;
      cirugia.contenido = contenido;

      await cirugia.save();

      res.status(200).send({
        status: "success",
        message: "Cirugía actualizada",
        cirugia,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurrió un error", error: err });
    }
  }

  async getCirugia(req, res) {
    const { idPet } = req.query;

    try {
      const cirugias = await Cirugia.findAll({
        where: { petId: idPet }, // Filtra por el ID de la mascota
      });

      if (!cirugias.length) {
        return res.status(404).send({ status: "error", message: "No se encontraron cirugías para esta mascota" });
      }

      res.status(200).send({
        status: "success",
        resultado: cirugias,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurrió un error", error: err });
    }
  }

  async delete(req, res) {
    const { idCirugia } = req.query;

    try {
      const cirugia = await Cirugia.findByPk(idCirugia); // Busca la cirugía por su ID
      if (!cirugia) {
        return res.status(404).send({ status: "error", message: "Cirugía no encontrada" });
      }

      await cirugia.destroy(); // Elimina la cirugía

      res.status(200).send({
        status: "success",
        message: "Cirugía eliminada",
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurrió un error", error: err });
    }
  }
}

export { CirugiaController };
