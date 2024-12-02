"use strict";
import { Pet, Consulta } from "./../models/owner_pet.js";

class ConsultaController {
  constructor() {}

  async save(req, res) {
    const { idPet } = req.query;
    const { fecha, contenido, diagnostico, tratamiento } = req.body;

    try {
      const pet = await Pet.findByPk(idPet); // Busca la mascota por su ID
      if (!pet) {
        return res.status(404).send({ status: "error", message: "Mascota no encontrada" });
      }

      // Crea una nueva consulta asociada a la mascota
      const consulta = await Consulta.create({
        fecha,
        contenido,
        diagnostico,
        tratamiento,
        petId: pet.id, // Relación con la mascota
      });

      res.status(200).send({
        status: "success",
        message: "Consulta agregada",
        consulta,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurrió un error", error: err });
    }
  }

  async update(req, res) {
    const { idConsulta } = req.query;
    const { fecha, contenido, diagnostico, tratamiento } = req.body;

    try {
      const consulta = await Consulta.findByPk(idConsulta); // Busca la consulta por su ID
      if (!consulta) {
        return res.status(404).send({ status: "error", message: "Consulta no encontrada" });
      }

      // Actualiza la consulta
      consulta.fecha = fecha;
      consulta.contenido = contenido;
      consulta.diagnostico = diagnostico;
      consulta.tratamiento = tratamiento;

      await consulta.save();

      res.status(200).send({
        status: "success",
        message: "Consulta actualizada",
        consulta,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurrió un error", error: err });
    }
  }

  async getConsultas(req, res) {
    const { idPet } = req.query;

    try {
      const consultas = await Consulta.findAll({
        where: { petId: idPet }, // Filtra por el ID de la mascota
      });

      if (!consultas.length) {
        return res.status(404).send({ status: "error", message: "No se encontraron consultas para esta mascota" });
      }

      res.status(200).send({
        status: "success",
        resultado: consultas,
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurrió un error", error: err });
    }
  }

  async delete(req, res) {
    const { idConsulta } = req.query;

    try {
      const consulta = await Consulta.findByPk(idConsulta); // Busca la consulta por su ID
      if (!consulta) {
        return res.status(404).send({ status: "error", message: "Consulta no encontrada" });
      }

      await consulta.destroy(); // Elimina la consulta

      res.status(200).send({
        status: "success",
        message: "Consulta eliminada",
      });
    } catch (err) {
      res.status(400).send({ message: "Ocurrió un error", error: err });
    }
  }
}

export { ConsultaController };
