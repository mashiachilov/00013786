const { Router } = require("express");
const fs = require("fs");

const router = new Router();
// deletest selected blog by thir id
router.get("/:id/delete", (req, res) => {
    const id = req.params.id;
    fs.readFile("./blog_data/data.json", (err, blog_data) => {
        if (err) throw err;
        const allBlogs = JSON.parse(blog_data);
        const filteredBlogs = allBlogs.filter((blog) => blog.id != id);
        const newBlogs = JSON.stringify(filteredBlogs);
        const blogsForDelete = allBlogs.find((blog) => blog.id == id);

        fs.writeFile("./blog_data/data.json", newBlogs, (err) => {
            if (err) throw err;
            if (blogsForDelete?.image) {
                fs.unlink(`public/uploads/${blogsForDelete?.image}`, (err) => {
                    if (err) throw err;
                });
            }
            res.render("blogs", { blogs: filteredBlogs, delete: true });
        });
    });
});

module.exports = router;

