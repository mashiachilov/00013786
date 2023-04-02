const express = require("express");
const app = express();
const path = require("path");
const routes = require("./public/Router/routes");
const blogById = require('./public/Router/blog_by_id')
const blogs = require('./public/Router/blogs')
const deleteBlog = require('./public/Router/delete')
const generate = require('./public/Router/generate')

app.set("view engine", "pug");
app.use("/static", express.static("public"));
app.use("public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

const PORT = 4000;

app.use(routes);
app.use(blogById);
app.use(blogs);
app.use(deleteBlog);
app.use(generate);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`server is running on port ${PORT}`);
});
