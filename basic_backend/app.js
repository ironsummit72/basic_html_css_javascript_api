const express = require("express");
const mysql = require("mysql");
const app = express();
const cors=require('cors');
const port = 3000;
const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root12345",
  database: "formula",
});
app.use(cors());

connection.connect((error) => {
  if (error) throw error;
  console.log("connection success");
});
app.use((request,response,next)=>{
  response.setHeader('Access-Control-Allow-Origin','*');
  response.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  response.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  next(); 
})

app.get("/drivers", (request, response) => {
  connection.query(`SELECT * from drivers`, (error, result) => {
    if (error) {
      throw error;
    }
    response.json(result);
  });
});
app.post("/drivers/:driver", (request, response) => {
  let driver = request.params.driver;
  connection.query(
    `insert into drivers values ('${driver}')`,
    (error, result) => {
      if (error) {
        response.json({
          message: `error occured ${error}`,
        });
      }
      response.json(result);
    }
  );
});

app.get("", (request, response) => {
  response.send("hello user");
});
app.delete('/drivers/:driver',(request,response)=>{
  let driver=request.params.driver;
  connection.query(`DELETE FROM drivers where driver='${driver}'`,(error,result)=>{
     if(error)
     {
      response.json({
        "message":`Something went wrong ${error}`
      })
     }
     response.json({result})
     

  })
})

app.listen(port, () => {
  console.log(`listining on localhost:${port}`);
});
