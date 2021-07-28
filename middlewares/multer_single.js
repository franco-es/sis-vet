const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destine = `./statics/${req.user.sub}/${req.query.idPet}/${req.query.idConsulta}`;
    if (!fs.existsSync(destine)) {
      fs.mkdirSync(destine, {
        recursive: true,
      });
    }
    cb(null, destine);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + `${file.originalname}`);
  },
});

const uploadSingle = multer({ storage: storage }).single("img");

module.exports = { uploadSingle };
