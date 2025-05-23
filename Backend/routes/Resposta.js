const express = require('express');
const router = express.Router();
const Resposta = require('../controllers/Resposta');

// Rotas para respostas
router.get('/', Resposta.listarTodas);
router.get('/:id', Resposta.buscarPorId);
router.post('/', Resposta.criarResposta);
router.put('/:id', Resposta.atualizarResposta);
router.delete('/:id', Resposta.deletarResposta);

module.exports = router;