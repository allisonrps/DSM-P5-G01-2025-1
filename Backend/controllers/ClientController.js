const connection = require("../database/connection");

// Retorna todos os clientes
const getAllClients = (req, res) => {
    const SQL = "SELECT * FROM clientes ORDER BY id DESC";
    connection.query(SQL, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao listar clientes" });
        }
        res.status(200).json(result);
    });
};

// Retorna um cliente específico
const getClientById = (req, res) => {
    const SQL = "SELECT * FROM clientes WHERE id = ?";
    connection.query(SQL, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao buscar cliente" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Cliente não encontrado" });
        }
        res.status(200).json(result[0]);
    });
};

//Cria um cliente
const createClient = (req, res) => {
    const { nome, renda, historico_credito } = req.body;
    const SQL = "INSERT INTO clientes (nome, renda, historico_credito) VALUES (?, ?, ?)";

    connection.query(SQL, [nome, renda, historico_credito], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao cadastrar cliente" });
        }
        res.status(201).json({ id: result.insertId, nome, renda, historico_credito });
    });
};

//Atualiza cliente
const updateClient = (req, res) => {
    const { nome, renda, historico_credito } = req.body;
    const SQL = "UPDATE clientes SET nome = ?, renda = ?, historico_credito = ? WHERE id = ?";

    connection.query(SQL, [nome, renda, historico_credito, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao atualizar cliente" });
        }
        res.status(200).json({ message: "Cliente atualizado com sucesso!" });
    });
};

//Exclui cliente
const deleteClient = (req, res) => {
    const SQL = "DELETE FROM clientes WHERE id = ?";

    connection.query(SQL, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao excluir cliente" });
        }
        res.status(200).json({ message: "Cliente excluído com sucesso!" });
    });
};


module.exports = { getAllClients, getClientById, createClient, updateClient, deleteClient};
