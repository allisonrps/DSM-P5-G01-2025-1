const connection = require('../database/connection');

class Usuario {
    static listarTodos(callback) {
        const SQL = "SELECT * FROM usuarios";
        connection.query(SQL, (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result);
        });
    }

    static criar(nome, sexo, callback) {
        const SQL = "INSERT INTO usuarios (nome, sexo) VALUES (?, ?)";
        connection.query(SQL, [nome, sexo], (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result.insertId);
        });
    }
}

module.exports = Usuario;
