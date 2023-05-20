import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import path from "path";

const storage = diskStorage({
  destination: (req, file, cb) => {
    const destine = `./statics/${req.user.sub}/${req.query.idPet}/${req.query.idConsulta}`;
    if (!existsSync(destine)) {
      mkdirSync(destine, {
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

export { uploadSingle };
