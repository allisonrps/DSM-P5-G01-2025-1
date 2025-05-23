const express = require('express');
const router = express.Router();
const Pergunta = require('../controllers/Pergunta');

// ROTAS
router.get('/', Pergunta.listarTodas);
router.post('/', Pergunta.criarPergunta);
router.post('/batch', Pergunta.criarVariasPerguntas); 
router.put('/:id', Pergunta.atualizarPergunta);     
router.put('/batch/update', Pergunta.atualizarVariasPerguntas);
router.delete('/:id', Pergunta.deletarPergunta);

module.exports = router;
