import { resolve as _resolve } from "path";
import { existsSync, mkdirSync, readdirSync, renameSync } from "fs";
import uniqid from "uniqid";

class FileSystem {
  constructor() {}

  crearCarpetaUsuario(UserId) {
    const pathUser = _resolve(__dirname, "../uploads", userId);
    const pathUserTemp = _resolve(pathUser, "temp"); // TAMBIEN PUEDE CONCATENARSE pathUser + "/temp" PERO NO ES LO MAS RECOMENDADO.

    const existe = existsSync(pathUser);

    if (!existe) {
      mkdirSync(pathUser);
      mkdirSync(pathUserTemp);
    }

    return pathUserTemp;
  }
  generarNombreUnico(nombreOrigunal) {
    const nombreArr = nombreOrigunal.split(".");
    const extension = nombreArr[nombreArr.length - 1];
    const idUnico = uniqid();

    return `${idUnico}.${extension}`;
  }

  guardarImagenTemp(userId, file) {
    return new Promise((resolve, reject) => {
      const path = this.crearCarpetaUsuario(userId);
      const nombreArchivo = this.generarNombreUnico(file.name);

      file.mv(`${path}/${nombreArchivo}`, (err) => {
        if (err) {
          return reject(err);
        } else {
          return resolve("ok");
        }
      });
    });
  }

  obtenerImagenesTemp(userId) {
    const pathTemp = _resolve(__dirname, "../uploads", userId, "temp");
    return readdirSync(pathTemp) || [];
  }
  imagenDeTempHaciaPost(userId) {
    const pathUserTemp = _resolve(__dirname, "../uploads", userId, "temp");
    const pathUserPost = _resolve(__dirname, "../uploads", userId, "post");

    if (!existsSync(pathUserTemp)) {
      return [];
    }
    if (!existsSync(pathUserPost)) {
      mkdirSync(pathUserPost);
    }
    const imagenTemp = this.obtenerImagenesTemp(userId);
    imagenTemp.forEach((imagen) => {
      renameSync(`${pathUserTemp}/${imagen}`, `${pathUserPost}/${imagen}`);
    });

    return imagenTemp;
  }
  getPhotoUrl(iserId, img) {
    const pathPhoto = _resolve(
      __dirname,
      "../uploads",
      userId,
      "post",
      img
    );
    if (existsSync(pathPhoto)) {
      return pathPhoto;
    } else {
      return _resolve(__dirname, "../assets", "default_image.png");
    }
  }
  validarPathUpload() {
    const pathUpload = _resolve(__dirname, "../uploads");
    if (!existsSync(pathUpload)) {
      mkdirSync(pathUpload);
    }
  }
}

export {FileSystem};