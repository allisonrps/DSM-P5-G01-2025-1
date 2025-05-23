const express = require('express');
const router = express.Router();
const Usuario = require('../controllers/Usuario');

// ROTAS
router.get('/', Usuario.listarTodos);
router.get('/:id', Usuario.usuarioPorId);
router.post('/', Usuario.criarUsuario);
router.delete('/:id', Usuario.deletarUsuario);
router.put('/:id', Usuario.atualizarUsuario);

module.exports = router;