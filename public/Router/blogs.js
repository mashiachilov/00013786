const { Router } = require("express");
const fs = require("fs");

const router = new Router();
// calls all blogs to blogs.pug file
router.get("/blogs", (req, res) => {
    fs.readFile("./blog_data/data.json", (err, blog_data) => {
        if (err) throw err;
        const allBlogs = JSON.parse(blog_data);
        res.render("blogs", { blogs: allBlogs });
    });
});

module.exports = router;
