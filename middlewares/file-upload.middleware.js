import multer from "multer";
import path from "path";
const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.resolve("./public/images"));
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

export const upload = multer({ storage: myStorage });
