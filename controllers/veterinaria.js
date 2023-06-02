"use strict";

import bcrypt, {genSaltSync, hashSync} from "bcrypt";
import fs from "fs";
import path from "path";
import { Vete, User } from "./../models/users.js";
import { createToken } from "../services/jwt.js";
import registerEmail from "../services/send.js";
import {FileSystem} from "../services/uploadImage.js";
import { UserService } from "../services/userService.js";
// const { default: validator } = require("validator");

class VeteController {
  constructor() {}

  async save(req, res) {
    const { nombre, telefono, email, password } = req.body;
    try {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      User.create({
        name: nombre,
        phone : telefono,
        email : email,
        role : "veterinaria",
        active : true,
        deleted : false,
        pass : hash
      }).then((data) =>{
        if (data == null) {
          res.status(404).send({
            message: err,
          });
        } else {
          res.status(200).send({
            message: "GENIAL! SE GUARDO EL USUARIO",
            user: data,
          });
        }
      })
    } catch (err) {
      res.status(400).send({error: err.message});
    }

  }
  login(req, res) {
    const { email, password, getToken } = req.body;
    const Email = email.toLowerCase();

    try {
      User.findOne({ where: { email: email } }).then((data) => {
        if (data == null) {
          res.status(500).json({ message: "User not found" });
        } else {
          compare(password, data.pass, (_, check) => {
            if (check) {
              if (getToken) {
                res
                    .status(200)
                    .cookie('token', createToken(data), { maxAge: 900000, httpOnly: true })
                    .send({
                      user: data,
                      token: createToken(data)
                    });
              } else {
                res.status(500).send({
                  status: "error",
                  message: "No getToken provided",
                });
              }
            } else {
              res.status(400).send({
                status: "DENIED",
                message: "Invalid credentials",
              });
            }
          });
        }
      });
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  }
  update(req, res) {
    const { email, nombre, telefono } = req.body;
    const { sub } = req.user;
    const userService = new UserService();
    User.update(
      {
        name: nombre,
        phone: telefono,
        email: email,
      },
      {
        where: {
          id: sub,
        },
      }
    ).then((data) => {
      if (data == null) {
        res.status(404).send({
          message: err,
        });
      } else {
        res.status(200).send({
          message: "user updated",
          user: user,
          message2: "please log in again.",
        });
      }
    });
  }
  uploadImage(req, res) {
    const fileSystem = new FileSystem();
    const image = req.file.img;
    if (!image) {
      return res.status(400).send({
        estado: "error",
        message: "no se envio una imagen",
      });
    }
    const validateImagenType = image.mimetype.inlcudes("image");
    if (!validateImagenType) {
      return res.status(400).send({
        status: "error",
        message: "el archivo no es una imagen",
      });
    }
    const saveFile = fileSystem.guardarImagenTemp(req.sub, image);
    res.status(200).json({
      estado: "success",
      imagen: imagen,
      guardarArchivo: saveFile,
    });
  }
  async getAllVeterinarias(req, res){
    User.findAll().then((data)=>{
      res.status(200).json({
        estado: "success",
        users: data,
      });
    })
  }
}

export { VeteController };
