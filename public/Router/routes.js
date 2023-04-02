const { Router } = require("express");
const fs = require("fs");

const router = new Router();

// renders the home page
router.get("/", (req, res) => {
  res.render("home");
});


// generate all blogs to /api/v1/blogs as json format
router.get("/api/v1/blogs", (req, res) => {
  fs.readFile("./blog_data/data.json", (err, blog_data) => {
    if (err) throw err;
    const blogs = JSON.parse(blog_data);
    res.json(blogs);
  });
});

module.exports = router;
