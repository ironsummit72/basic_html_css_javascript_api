const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;
const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root12345",
  database: "formula",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("connection success");
});
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  next(); 
})

app.get("/drivers", (req, response) => {
  connection.query(`SELECT * from drivers`, (err, result) => {
    if (err) {
      throw err;
    }
    response.json(result);
  });
});
app.post("/drivers/:driver", (request, response) => {
  let driver = request.params.driver;
  connection.query(
    `insert into drivers values ('${driver}')`,
    (err, result) => {
      if (err) {
        response.json({
          message: `error occured ${err}`,
        });
      }
      response.json(result);
    }
  );
});

app.get("", (req, res) => {
  res.send("hello user");
});

app.listen(port, () => {
  console.log(`listining on localhost:${port}`);
});
