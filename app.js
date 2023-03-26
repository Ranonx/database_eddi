const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

//// Uploader dependencies
const multer = require("multer");
const fs = require("fs");
const pdf = require("pdf-parse");
const upload = multer({ dest: "uploads/" });
/////

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

app.get("/uploadPage", function (req, res) {
  res.render("uploadPage", { activePage: "uploadPage" });
});

// Upload data to table
function extractFootData(data) {
  const content = fs.readFileSync(data);
  return pdf(content, { max: 1 }).then((data) => {
    const text = data.text.split("\n");

    let index = text.findIndex((line) => line.includes("足部分析报告"));
    if (index > 1) {
      text.splice(0, index - 1);
    }
    const enumeratedText = text
      .map((line, index) => `${index}: ${line}`)
      .join("\n");

    // Use regular expressions to extract foot data from the text
    const shoeSizeRegex = /鞋码(\d{2})(\d{2})/;
    const match = text[9].match(shoeSizeRegex);

    let shoeSizeLeft, shoeSizeRight;
    if (match) {
      shoeSizeLeft = parseInt(match[1], 10);
      shoeSizeRight = parseInt(match[2], 10);
    } else {
      shoeSizeLeft = NaN;
      shoeSizeRight = NaN;
    }

    const footData = {
      id_num: text[5],
      name: text[6],
      gender: text[7],
      shoe_size_left: shoeSizeLeft,
      shoe_size_right: shoeSizeRight,
      arch_length_left: parseFloat(text[31]),
      arch_length_right: parseFloat(text[32]),
      arch_width_left: parseFloat(text[33]),
      arch_width_right: parseFloat(text[34]),
      heel_width_left: parseFloat(text[35]),
      heel_width_right: parseFloat(text[36]),
      foot_length_left: parseFloat(text[37]),
      foot_length_right: parseFloat(text[38]),
      foot_width_left: parseFloat(text[39]),
      foot_width_right: parseFloat(text[40]),
      ball_girth_left: parseInt(text[41], 10),
      ball_girth_right: parseInt(text[42], 10),
      arch_index_left: parseFloat(text[43]),
      arch_index_right: parseFloat(text[44]),
      arch_ratio_left: parseFloat(text[45]),
      arch_ratio_right: parseFloat(text[46]),
    };
    return footData;
  });
}
async function processPDFs(pdfPaths) {
  const footDataArray = [];
  for (const pdfPath of pdfPaths) {
    const footData = await extractFootData(pdfPath);
    footDataArray.push(footData);
  }
  console.log(footDataArray);
  return Promise.all(footDataArray);
}

app.post("/upload", upload.array("pdf"), async (req, res) => {
  const pdfPaths = req.files.map((file) => file.path);

  const footDataArray = await processPDFs(pdfPaths);
  console.log(`footDataArray: ${footDataArray}`);
  for (const pdfPath of pdfPaths) {
    fs.unlinkSync(pdfPath); // Delete the uploaded files
  }

  res.render(
    "partials/uploadTable",
    { footDataArray, activePage: "partials/uploadTable" },
    (err, html) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error rendering table");
      } else {
        res.send(html);
      }
    }
  );
});

// define route to fetch table data
// app.get("/table-data", (req, res) => {
//   queries.getFootData((error, tableData) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send("Internal server error");
//     } else {
//       res.json(tableData);
//     }
//   });
// });

app.get("/table-data", (req, res) => {
  const searchTerm = req.query.searchTerm;
  console.log(`recieved searchTerm: ${searchTerm}`);
  queries.getFootData(searchTerm, (error, tableData) => {
    if (error) {
      res.status(500).send("Error retrieving table data");
    } else {
      res.send(tableData);
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
