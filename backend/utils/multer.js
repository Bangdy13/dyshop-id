import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else
    ({ error: "Unsupported file format. Upload only JPEG/JPG or PNG" }), false;
};

const upload = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 },
  fileFilter,
});

export default upload;
