"use strict";

import { Pet, Owner, Consulta } from "../models/owner_pet.js";
import fs from "fs/promises";
import * as path from "path";

class PetController {
  constructor() {}

  // Crear una nueva mascota y asociarla a un usuario (vete)
  async save(req, res) {
    const { sub } = req.user;
    const { nombre, especie, raza, color, f_nacimiento } = req.body;

    try {
      const pet = await Pet.create({
        nombre,
        especie,
        raza,
        color,
        f_nacimiento,
        vete: sub,
      });

      res.status(200).send({
        status: "200",
        message: "Mascota creada exitosamente",
        pet,
      });
    } catch (err) {
      res.status(400).send({ message: "Error al guardar la mascota", error: err });
    }
  }

  // Actualizar información de una mascota
  async update(req, res) {
    const { idPet } = req.query;
    const { nombre, especie, raza, color, f_nacimiento } = req.body;

    try {
      const pet = await Pet.findByPk(idPet);
      if (!pet) {
        return res.status(404).send({ message: "Mascota no encontrada" });
      }

      await pet.update({
        nombre,
        especie,
        raza,
        color,
        f_nacimiento,
      });

      res.status(200).send({
        status: "200",
        message: "Mascota actualizada exitosamente",
        pet,
      });
    } catch (err) {
      res.status(400).send({ message: "Error al actualizar la mascota", error: err });
    }
  }

  // Eliminar una mascota
  async delete(req, res) {
    const { idPet } = req.query;

    try {
      const pet = await Pet.findByPk(idPet);
      if (!pet) {
        return res.status(404).send({ message: "Mascota no encontrada" });
      }

      await pet.destroy();
      res.status(200).send({ message: "Mascota eliminada exitosamente" });
    } catch (err) {
      res.status(400).send({ message: "Error al eliminar la mascota", error: err });
    }
  }

  // Obtener una mascota por ID
  async findOne(req, res) {
    const { idPet } = req.query;

    try {
      const pet = await Pet.findByPk(idPet);
      if (!pet) {
        return res.status(404).send({ message: "Mascota no encontrada" });
      }

      res.status(200).send({
        status: "200",
        message: "Mascota encontrada",
        pet,
      });
    } catch (err) {
      res.status(400).send({ message: "Error al buscar la mascota", error: err });
    }
  }

  // Obtener todas las mascotas asociadas a un veterinario (sub)
  async findAll(req, res) {
    const { sub } = req.user;

    try {
      const pets = await Pet.findAll({ where: { vete: sub } });
      if (pets.length === 0) {
        return res.status(404).send({ message: "No hay mascotas asociadas" });
      }

      res.status(200).send({
        status: "200",
        message: "Mascotas encontradas",
        pets,
      });
    } catch (err) {
      res.status(400).send({ message: "Error al obtener las mascotas", error: err });
    }
  }

  // Subir una imagen de rayos X y asociarla a una consulta
  async uploadRayX(req, res) {
    const { idPet, idConsulta } = req.query;

    try {
      const consulta = await Consulta.findOne({
        where: { id: idConsulta, petId: idPet },
      });

      if (!consulta) {
        return res.status(404).send({ message: "Consulta no encontrada" });
      }

      consulta.photo = req.file.filename;
      await consulta.save();

      res.status(200).send({
        status: "success",
        message: "Imagen de rayos X subida exitosamente",
        photo: req.file.filename,
      });
    } catch (err) {
      res.status(400).send({ message: "Error al subir la imagen", error: err });
    }
  }

  // Obtener una imagen de rayos X asociada a una consulta
  async getRay(req, res) {
    const { sub } = req.user;
    const { idPet, idConsulta, img } = req.query;

    const pathImg = path.join(__dirname, `../statics/${sub}/${idPet}/${idConsulta}/${img}`);

    try {
      await fs.access(pathImg);
      res.sendFile(pathImg);
    } catch (err) {
      res.status(404).send({ message: "Imagen no encontrada", error: err });
    }
  }
}

export { PetController };
