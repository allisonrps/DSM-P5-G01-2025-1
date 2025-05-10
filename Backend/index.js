const express = require("express"); // importando o express
const app = express(); // definindo o objeto app como express
const bodyParser = require("body-parser"); // importando o body-parser
const database = require("./database/database"); // conexao com banco de dados
const connection = require("./database/connection"); // conexao com banco de dados
const porta = 4000; // porta que vai rodar a aplicação
// const question = require("./question/Question"); // controller de perguntas



// Middleware para processar JSON corretamente
app.use(bodyParser.json());



// Importando controladores
const homeController = require("./home/homeController");
const clientsRoutes = require("./routes/clientsRoutes");
const scoreRoutes = require("./routes/scoreRoutes");

// Configurações do Express
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Definindo as rotas
app.use("/api", homeController);
app.use("/api", clientsRoutes);
app.use("/api", scoreRoutes);

// Iniciando o servidor
app.listen(porta, "0.0.0.0", () => {
    console.log("Servidor rodando na porta: " + porta);
});



