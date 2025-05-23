const connection = require('../database/connection');

module.exports = {
    listarTodos: (req, res) => {
        connection.query("SELECT * FROM resultados", (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao listar resultados" });
            return res.status(200).json({ resultados: result });
        });
    },

    criarResultado: (req, res) => {
        const { id_usuario, pontuacao, score } = req.body;
        
        if (!id_usuario || pontuacao === undefined || score === undefined) {
            return res.status(400).json({ error: "Campos id_usuario, pontuacao e score são obrigatórios" });
        }

        const SQL = "INSERT INTO resultados (id_usuario, pontuacao, score) VALUES (?, ?, ?)";
        connection.query(SQL, [id_usuario, pontuacao, score], (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao registrar resultado" });
            return res.status(201).json({ message: "Resultado salvo", id: result.insertId });
        });
    },

    // Obter resultado por ID
    resultadoPorId: (req, res) => {
        const { id } = req.params;

        const SQL = "SELECT * FROM resultados WHERE id = ?";
        connection.query(SQL, [id], (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao buscar resultado" });
            
            if (result.length === 0) {
                return res.status(404).json({ error: "Resultado não encontrado" });
            }
            
            return res.status(200).json({ resultado: result[0] });
        });
    },

    // Atualizar resultado por ID
    atualizarResultado: (req, res) => {
        const { id } = req.params;
        const { id_usuario, pontuacao, score } = req.body;

        if (!id_usuario || pontuacao === undefined || score === undefined) {
            return res.status(400).json({ error: "Campos id_usuario, pontuacao e score são obrigatórios" });
        }

        const SQL = "UPDATE resultados SET id_usuario = ?, pontuacao = ?, score = ? WHERE id = ?";
        connection.query(SQL, [id_usuario, pontuacao, score, id], (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao atualizar resultado" });
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Resultado não encontrado" });
            }
            
            return res.status(200).json({ message: "Resultado atualizado com sucesso" });
        });
    },

    // Deletar resultado por ID
    deletarResultado: (req, res) => {
        const { id } = req.params;

        const SQL = "DELETE FROM resultados WHERE id = ?";
        connection.query(SQL, [id], (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao deletar resultado" });
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Resultado não encontrado" });
            }
            
            return res.status(200).json({ message: "Resultado deletado com sucesso" });
        });
    },
};