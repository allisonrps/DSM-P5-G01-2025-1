require('dotenv').config(); // Primeira linha SEMPRE

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const porta = process.env.PORT || 3000;

const connection = require("./database/connection");


// Importação das rotas
const homeController = require("./home/homeController");
const perguntaRoutes = require("./routes/Pergunta");
const usuarioRoutes = require("./routes/Usuario");
const respostaRoutes = require("./routes/Resposta");
const resultadoRoutes = require("./routes/Resultado");


// View engine
app.set('view engine', 'ejs');

// Arquivos estáticos
app.use(express.static('public'));

//Habilita CORS
app.use(cors());

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.use("/", homeController);
app.use("/perguntas", perguntaRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/respostas", respostaRoutes);
app.use("/resultados", resultadoRoutes);

// Start do servidor
app.listen(porta, '0.0.0.0', () => {
    console.log("Servidor rodando na porta: " + porta);
});


// Rota padrão para teste rápido
app.get("/ping", (req, res) => {
    res.json({ status: "ok" });
  });