const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const router = new Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

let upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }

    cb(undefined, true);
  },
  storage: storage,
});

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/blog_by_id", (req, res) => {
  res.render("home");
});
router.get("/blogs", (req, res) => {
  res.render("blogs");
});
router.get("/generate", (req, res) => {
  res.render("generate");
});


module.exports = router;