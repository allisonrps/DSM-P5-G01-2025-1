const express = require("express");
const router = express.Router();
const { getAllClients, getClientById, createClient, updateClient, deleteClient } = require("../controllers/ClientController");

//Rotas existentes (GET)
router.get("/clients", getAllClients);
router.get("/clients/:id", getClientById);

//Criar um novo cliente (POST)
router.post("/clients", createClient);

//Atualizar um cliente específico (PUT)
router.put("/clients/:id", updateClient);

//Remover um cliente específico (DELETE)
router.delete("/clients/:id", deleteClient);

module.exports = router;
