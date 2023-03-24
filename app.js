const express = require("express");
const mysql = require("mysql");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 8000;

// Set up EJS
app.set("view engine", "ejs");

// Serve static files from the "public" folder
app.use(express.static("public"));
app.use(expressLayouts);

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rc19931020",
  database: "unisole",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
});

// Routes
app.get("/", (req, res) => {
  res.render("layout", { activePage: "dashboard" });
});

app.get("/table", function (req, res) {
  res.render("table", { activePage: "table" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
