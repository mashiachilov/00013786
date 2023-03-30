const { Router } = require("express");
const crypto = require("crypto");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const moment = require("moment");


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
    fileSize: 3000000, // file size should not exceed 3 mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG)$/)) {
      return cb(new Error("Please upload proper image"));
    }

    cb(undefined, true);
  },
  storage: storage,
});

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/generate", (req, res) => {
  const blog_id = req.query.blog_id;
  if (blog_id) {
    fs.readFile("./blog_data/data.json", (err, blog_data) => {
      if (err) throw err;
      const allBlogs = JSON.parse(blog_data);
      const blogForEdit = allBlogs.find((blog) => blog.id == blog_id);
      res.render("generate", {
        title: blogForEdit.title,
        category: blogForEdit.category,
        date: `${blogForEdit.date.year}-${monthConverter(
          blogForEdit.date.month
        )}-${blogForEdit.date.day.length == 1 ? "0" : ""}${
          blogForEdit.date.day
        }`,
        description: blogForEdit.description,
        blog_id,
      });
    });
  } else {
    res.render("generate");
  }
});

const monthConverter = (month) => {
  switch (month) {
    case "January":
      return "01";
    case "February":
      return "02";
    case "March":
      return "03";
    case "April":
      return "04";
    case "May":
      return "05";
    case "June":
      return "06";
    case "July":
      return "07";
    case "August":
      return "08";
    case "September":
      return "09";
    case "October":
      return "10";
    case "November":
      return "11";
    case "December":
      return "12";
    default:
      return "";
  }
};

router.post("/generate", upload.single("image"), (req, res) => {
  const blog_id = req.query.blog_id;

  const { title, category, date, description } = req.body;

  const image = req?.file?.filename || "";

  if (title && category && date && description) {
    fs.readFile("./blog_data/data.json", (err, blog_data) => {
      if (err) throw err;
      const allBlogs = JSON.parse(blog_data);
      const singleBlog = allBlogs.find((blog) => blog.id == blog_id);
      allBlogs.unshift({
        title,
        category,
        date: extendedDate(date),
        description,
        id: crypto.randomUUID(),
        image: singleBlog?.image ? singleBlog?.image : image,
      });
      let newBlogs;
      if (blog_id) {
        const remainBlogs = allBlogs.filter((blog) => blog.id != blog_id);
        newBlogs = JSON.stringify(remainBlogs);
      } else {
        newBlogs = JSON.stringify(allBlogs);
      }
      fs.writeFile("./blog_data/data.json", newBlogs, (err) => {
        if (err) throw err;
        res.render("generate", { created: true });
      });
    });
  } else {
    res.render("generate", {
      title,
      category,
      date,
      description,
    });
  }
});

const extendedDate = (date) => {
  const newDate = moment(date).format("MMMM D Y");
  const splitedDate = newDate.split(" ");
  return {
    month: splitedDate[0],
    day: splitedDate[1],
    year: splitedDate[2],
  };
};

router.get("/blog_by_id", (req, res) => {
  res.render("home");
});
router.get("/blogs", (req, res) => {
  res.render("blogs");
});


module.exports = router;