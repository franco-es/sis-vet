const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");

class FileSystem {
  constructor() {}

  crearCarpetaUsuario(UserId) {
    const pathUser = path.resolve(__dirname, "../uploads", userId);
    const pathUserTemp = path.resolve(pathUser, "temp"); // TAMBIEN PUEDE CONCATENARSE pathUser + "/temp" PERO NO ES LO MAS RECOMENDADO.

    const existe = fs.existsSync(pathUser);

    if (!existe) {
      fs.mkdirSync(pathUser);
      fs.mkdirSync(pathUserTemp);
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
    const pathTemp = path.resolve(__dirname, "../uploads", userId, "temp");
    return fs.readdirSync(pathTemp) || [];
  }
  imagenDeTempHaciaPost(userId) {
    const pathUserTemp = path.resolve(__dirname, "../uploads", userId, "temp");
    const pathUserPost = path.resolve(__dirname, "../uploads", userId, "post");

    if (!fs.existsSync(pathUserTemp)) {
      return [];
    }
    if (!fs.existsSync(pathUserPost)) {
      fs.mkdirSync(pathUserPost);
    }
    const imagenTemp = this.obtenerImagenesTemp(userId);
    imagenTemp.forEach((imagen) => {
      fs.renameSync(`${pathUserTemp}/${imagen}`, `${pathUserPost}/${imagen}`);
    });

    return imagenTemp;
  }
  getPhotoUrl(iserId, img) {
    const pathPhoto = path.resolve(
      __dirname,
      "../uploads",
      userId,
      "post",
      img
    );
    if (fs.existsSync(pathPhoto)) {
      return pathPhoto;
    } else {
      return path.resolve(__dirname, "../assets", "default_image.png");
    }
  }
  validarPathUpload() {
    const pathUpload = path.resolve(__dirname, "../uploads");
    if (!fs.existsSync(pathUpload)) {
      fs.mkdirSync(pathUpload);
    }
  }
}

module.exports = FileSystem;