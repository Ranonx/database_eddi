const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const db = require("./models/db");
const queries = require("./models/queries");

const app = express();
const port = 8000;

// Set up EJS
app.set("view engine", "ejs");

// Serve static files from the "public" folder
app.use(express.static("public"));
app.use(expressLayouts);

// Routes
app.get("/", (req, res) => {
  res.render("layout", { activePage: "dashboard" });
});

app.get("/table", function (req, res) {
  res.render("table", { activePage: "table" });
});

// define route to fetch table data
app.get("/table-data", (req, res) => {
  queries.getFootData((error, tableData) => {
    if (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    } else {
      res.json(tableData);
    }
  });
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
