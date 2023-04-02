const { Router } = require("express");
const fs = require("fs");

const router = new Router();

// from pug file gets the data according to its blogId 
router.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
    fs.readFile("./blog_data/data.json", (err, blog_data) => {
        if (err) throw err;
        const allBlogs = JSON.parse(blog_data);
        const blogById = allBlogs.find((blog) => blog.id == id);
        res.render("blog_by_id", {
            blog: blogById,
        });
    });
});

module.exports = router;
