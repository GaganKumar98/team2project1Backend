const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1",
  database: "reactDb",
  multipleStatements: true,
});
db.connect((err) => {
  if (!err) console.log("Connection Succeded");
  else console.log("Connection Failed:" + JSON.stringify(err, undefined, 2));
});

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

app.use(bodyparser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Get All Questions
app.get("/Questions", (req, res) => {
  db.query("SELECT * FROM qna", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// Get Specific Question
app.get("/Questions/:id", (req, res) => {
  db.query(
    "SELECT * FROM qna where id=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete THE QUESTION
app.delete("/Questions/:id", (req, res) => {
  db.query(
    "DELETE From qna where id=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Deleted Successfully");
      else console.log(err);
    }
  );
});
// Post Question and Answer
app.post("/Questions", (req, res) => {
  let data = req.body;
  console.log("data ", data);
  // let sqlQuery = "INSERT INTO qna (questions,answers) SET ?";
  let sqlQuery = "INSERT INTO qna SET ?";

  db.query(sqlQuery, data, (err, result) => {
    res.send(result);

    console.log(err);

    console.log(data);
  });
});
