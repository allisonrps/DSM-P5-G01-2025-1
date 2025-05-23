const connection = require('../database/connection');

class Resultado {
    static listarTodos(callback) {
        const SQL = "SELECT * FROM resultados";
        connection.query(SQL, (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result);
        });
    }

    static criar(id_usuario, pontuacao, score, callback) {
        const SQL = "INSERT INTO resultados (id_usuario, pontuacao, score) VALUES (?, ?, ?)";
        connection.query(SQL, [id_usuario, pontuacao, score], (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result.insertId);
        });
    }
}

module.exports = Resultado;
