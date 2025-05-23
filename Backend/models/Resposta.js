const connection = require('../database/connection');

class Resposta {
    static listarTodas(callback) {
        const SQL = "SELECT * FROM respostas";
        connection.query(SQL, (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result);
        });
    }

    static criar(id_usuario, id_pergunta, resposta_sim_nao, valor_resposta, callback) {
        const SQL = "INSERT INTO respostas (id_usuario, id_pergunta, resposta_sim_nao, valor_resposta) VALUES (?, ?, ?, ?)";
        connection.query(SQL, [id_usuario, id_pergunta, resposta_sim_nao, valor_resposta], (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result.insertId);
        });
    }
}

module.exports = Resposta;
