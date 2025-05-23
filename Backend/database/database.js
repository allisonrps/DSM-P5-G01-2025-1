require('dotenv').config();
var mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // certifique-se de usar a porta 4000
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true
  }
});

connection.connect(function(err) {
   
    if(err) throw err;
    
    console.log("Conectado!");

    connection.query("CREATE DATABASE if not exists MINHA_API", 
        function (err, result) {
        if (err) throw err;
        console.log("Banco de Dados OK !");
      });

});

