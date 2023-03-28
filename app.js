const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "pug");
app.use("/static", express.static("public"));
app.use("public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

const PORT = 4000;

app.get('/', (req, res) => {
    res.render('navbar')
})

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`server is running on port ${PORT}`);
});
