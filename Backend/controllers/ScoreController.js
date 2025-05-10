const connection = require("../database/connection");

// Retorna o score de um cliente específico
const getClientScore = (req, res) => {
    const SQL = `
        SELECT clientes.nome, clientes.score, avaliacoes_score.modelo_utilizado, avaliacoes_score.score_predito
        FROM clientes
        JOIN avaliacoes_score ON clientes.id = avaliacoes_score.cliente_id
        WHERE clientes.id = ?;
    `;
    connection.query(SQL, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao buscar score do cliente" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Cliente não possui avaliação de score" });
        }
        res.status(200).json(result[0]);
    });
};

module.exports = { getClientScore };
