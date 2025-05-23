const connection = require('../database/connection');

class Pergunta {
    static listarTodas(callback) {
        const SQL = "SELECT * FROM perguntas ORDER BY id ASC";
        connection.query(SQL, (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result);
        });
    }

    static criar(coluna_dataset, texto_pergunta, callback) {
        const SQL = "INSERT INTO perguntas (coluna_dataset, texto_pergunta) VALUES (?, ?)";
        connection.query(SQL, [coluna_dataset, texto_pergunta], (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result.insertId);
        });
    }
}

module.exports = Pergunta;
