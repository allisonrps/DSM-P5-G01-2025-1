const express = require('express');
const router = express.Router();
const Resultado = require('../controllers/Resultado');

// ROTAS
router.get('/', Resultado.listarTodos);
router.post('/', Resultado.criarResultado);
router.get('/:id', Resultado.resultadoPorId);          
router.put('/:id', Resultado.atualizarResultado);     
router.delete('/:id', Resultado.deletarResultado);   

module.exports = router;
