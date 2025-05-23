var mysql = require("mysql2");
var connection = require("../database/connection");

connection.connect(function(err) {
  
    if (err) throw err;
    console.log("Connected!");
    
    var sql = "create table if not exists perguntas (id int primary key auto_increment, coluna_dataset VARCHAR(255) NOT NULL, texto_pergunta VARCHAR(500) NOT NULL );";
    connection.query(sql, function(err,result) {
         if (err) throw err;
         console.log("Tabela: Perguntas OK");
    })

    var sql = "create table if not exists respostas (id int primary key auto_increment, pergunta_id int, resposta longtext, FOREIGN KEY (pergunta_id) REFERENCES perguntas(id));";

    connection.query(sql, function(err,result) {
    if (err) throw err;
    console.log("Tabela: Respostas OK");
    })
    
})

module.exports = connection;
