const connection = require('../database/connection');

class Resposta {
    static listarTodas(callback) {
        const SQL = "SELECT * FROM respostas";
        connection.query(SQL, (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result);
        });
    }

    static criar(dados, callback) {
        const {
            id_usuario,
            resposta_01,
            resposta_02,
            resposta_03,
            resposta_04,
            resposta_05,
            resposta_06,
            resposta_07,
            resposta_08,
            resposta_09,
            resposta_10
        } = dados;

        const SQL = `
            INSERT INTO respostas (
                id_usuario,
                resposta_01, resposta_02, resposta_03, resposta_04, resposta_05,
                resposta_06, resposta_07, resposta_08, resposta_09, resposta_10
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const valores = [
            id_usuario,
            resposta_01, resposta_02, resposta_03, resposta_04, resposta_05,
            resposta_06, resposta_07, resposta_08, resposta_09, resposta_10
        ];

        connection.query(SQL, valores, (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result.insertId);
        });
    }

    static buscarPorUsuario(id_usuario, callback) {
        const SQL = "SELECT * FROM respostas WHERE id_usuario = ?";
        connection.query(SQL, [id_usuario], (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result);
        });
    }
}

module.exports = Resposta;
