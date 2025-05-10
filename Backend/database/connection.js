require("dotenv").config(); // Carrega variáveis do .env
var mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 20, // Ajuste conforme necessidade
    waitForConnections: true
});


module.exports = connection;
