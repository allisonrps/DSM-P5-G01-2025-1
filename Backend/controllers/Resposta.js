const connection = require('../database/connection');

module.exports = {
    listarTodas: (req, res) => {
        connection.query("SELECT * FROM respostas", (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao listar respostas" });
            return res.status(200).json({ respostas: result });
        });
    },

    criarResposta: (req, res) => {
        const {
            id_usuario,
            resposta_01, resposta_02, resposta_03, resposta_04, resposta_05,
            resposta_06, resposta_07, resposta_08, resposta_09, resposta_10
        } = req.body;

        // Verificação se todos os campos estão preenchidos
        if (
            !id_usuario ||
            resposta_01 === undefined || resposta_02 === undefined || resposta_03 === undefined ||
            resposta_04 === undefined || resposta_05 === undefined || resposta_06 === undefined ||
            resposta_07 === undefined || resposta_08 === undefined || resposta_09 === undefined ||
            resposta_10 === undefined
        ) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const SQL = `
            INSERT INTO respostas (
                id_usuario, resposta_01, resposta_02, resposta_03, resposta_04, resposta_05,
                resposta_06, resposta_07, resposta_08, resposta_09, resposta_10
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(SQL, [
            id_usuario,
            resposta_01, resposta_02, resposta_03, resposta_04, resposta_05,
            resposta_06, resposta_07, resposta_08, resposta_09, resposta_10
        ], (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao salvar respostas" });
            return res.status(201).json({ message: "Respostas registradas", id: result.insertId });
        });
    },

    atualizarResposta: (req, res) => {
        const { id } = req.params;
        const {
            id_usuario,
            resposta_01, resposta_02, resposta_03, resposta_04, resposta_05,
            resposta_06, resposta_07, resposta_08, resposta_09, resposta_10
        } = req.body;

        if (
            !id_usuario ||
            resposta_01 === undefined || resposta_02 === undefined || resposta_03 === undefined ||
            resposta_04 === undefined || resposta_05 === undefined || resposta_06 === undefined ||
            resposta_07 === undefined || resposta_08 === undefined || resposta_09 === undefined ||
            resposta_10 === undefined
        ) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const SQL = `
            UPDATE respostas SET
                id_usuario = ?, resposta_01 = ?, resposta_02 = ?, resposta_03 = ?, resposta_04 = ?,
                resposta_05 = ?, resposta_06 = ?, resposta_07 = ?, resposta_08 = ?, resposta_09 = ?, resposta_10 = ?
            WHERE id = ?
        `;

        connection.query(SQL, [
            id_usuario,
            resposta_01, resposta_02, resposta_03, resposta_04, resposta_05,
            resposta_06, resposta_07, resposta_08, resposta_09, resposta_10,
            id
        ], (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao atualizar respostas" });

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Resposta não encontrada" });
            }

            return res.status(200).json({ message: "Respostas atualizadas com sucesso" });
        });
    },

    deletarResposta: (req, res) => {
        const { id } = req.params;

        const SQL = "DELETE FROM respostas WHERE id = ?";
        connection.query(SQL, [id], (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao deletar resposta" });

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Resposta não encontrada" });
            }

            return res.status(200).json({ message: "Resposta deletada com sucesso" });
        });
    },



buscarPorUsuario: (req, res) => {
    const { id_usuario } = req.params;

    const SQL = "SELECT * FROM respostas WHERE id_usuario = ?";
    connection.query(SQL, [id_usuario], (err, result) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar respostas do usuário" });

        if (result.length === 0) {
            return res.status(404).json({ error: "Nenhuma resposta encontrada para este usuário" });
        }

        return res.status(200).json({ respostas: result });
    });
},


    buscarPorId: (req, res) => {
        const { id } = req.params;

        const SQL = "SELECT * FROM respostas WHERE id = ?";
        connection.query(SQL, [id], (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao buscar resposta" });

            if (result.length === 0) {
                return res.status(404).json({ error: "Resposta não encontrada" });
            }

            return res.status(200).json({ resposta: result[0] });
        });
    }
};
