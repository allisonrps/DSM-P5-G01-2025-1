const express = require('express');
const router = express.Router();
const connection = require('../database/connection');

// RETORNA JSON DE TODAS AS PERGUNTAS
router.get("/pergunta", (req,res) => {

    var SQL = "SELECT * FROM perguntas ORDER BY id DESC";
    
    connection.query(SQL, function(err,result) {
        if (err) {
            res.sendStatus(401).json({err: "Erro ao listar perguntas"});
        }
        res.status(200).json({perguntas: result});
    })

})




// RETORNA JSON DE TODAS AS PERGUNTAS

router.post("/pergunta", (req,res) => {

    // o body do post, vem com o json { pergunta: "a pergunta" };
    // pegando o conteudo da pergunta

    var pergunta = req.body.pergunta; 

    console.log(pergunta);

    if (pergunta === undefined) {
        res.status = 400;
        res.json({err: "Dados Inválidos"});
    } else {

        // inserir a pergunta no BD.

        var SQL = "INSERT INTO perguntas values ?";
        var values = [
            [0,pergunta]
        ];

     
        connection.query(SQL, [values], function(err,result) {
            if (err) {
                res.sendStatus(401).json({err: "A pergunta não cadastrada !"});
            }
            res.status(201).json({OK: "Pergunta Feita"});
        })

    }

});

module.exports = router;