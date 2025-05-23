const connection = require('../database/connection');

module.exports = {
    listarTodos: (req, res) => {
        connection.query("SELECT * FROM usuarios", (err, result) => {
            if (err) {
                console.error("Erro ao listar usuários:", err);
                return res.status(500).json({ error: "Erro ao listar usuários" });
            }
            return res.status(200).json({ usuarios: result });
        });
    },



    usuarioPorId: (req, res) => {
        const { id } = req.params;

        const SQL = "SELECT * FROM usuarios WHERE id = ?";
        connection.query(SQL, [id], (err, result) => {
            if (err) {
                console.error("Erro ao buscar usuário:", err);
                return res.status(500).json({ error: "Erro ao buscar usuário" });
            }
            
            if (result.length === 0) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }
            
            return res.status(200).json({ usuario: result[0] });
        });
    },


    criarUsuario: (req, res) => {
        const { nome, idade, sexo } = req.body;

        if (!nome || !idade || !sexo) {
            return res.status(400).json({ error: "Campos nome, idade e sexo são obrigatórios" });
        }

        const SQL = "INSERT INTO usuarios (nome, idade, sexo) VALUES (?, ?, ?)";
        connection.query(SQL, [nome, idade, sexo], (err, result) => {
            if (err) {
                console.error("Erro ao criar usuário:", err.message);
                return res.status(500).json({ error: "Erro ao criar usuário" });
            }
            return res.status(201).json({ message: "Usuário criado", id: result.insertId });
        });
    },

    deletarUsuario: (req, res) => {
        const { id } = req.params;

        const SQL = "DELETE FROM usuarios WHERE id = ?";
        connection.query(SQL, [id], (err, result) => {
            if (err) {
                console.error("Erro ao deletar usuário:", err);
                return res.status(500).json({ error: "Erro ao deletar usuário" });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }
            
            return res.status(200).json({ message: "Usuário deletado com sucesso" });
        });
    },

    atualizarUsuario: (req, res) => {
        const { id } = req.params;
        const { nome, idade, sexo } = req.body;

        if (!nome || !idade || !sexo) {
            return res.status(400).json({ error: "Campos nome, idade e sexo são obrigatórios" });
        }

        const SQL = "UPDATE usuarios SET nome = ?, idade = ?, sexo = ? WHERE id = ?";
        connection.query(SQL, [nome, idade, sexo, id], (err, result) => {
            if (err) {
                console.error("Erro ao atualizar usuário:", err);
                return res.status(500).json({ error: "Erro ao atualizar usuário" });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }
            
            return res.status(200).json({ message: "Usuário atualizado com sucesso" });
        });
    }
};
