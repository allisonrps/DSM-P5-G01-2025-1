const connection = require('../database/connection');
const axios = require('axios');

module.exports = {
    listarTodas: (req, res) => {
        connection.query("SELECT * FROM respostas", (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao listar respostas" });
            return res.status(200).json({ respostas: result });
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

    // 🔥 método com integração ML e gravação do resultado
criarRespostaComResultado: async (req, res) => {
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

    const payload = {
        Age: resposta_01,
        Monthly_Inhand_Salary: resposta_02,
        Num_Bank_Accounts: resposta_03,
        Num_Credit_Card: resposta_04,
        Num_of_Loan: resposta_05,
        Delay_from_due_date: resposta_06,
        Num_of_Delayed_Payment: resposta_07,
        Outstanding_Debt: resposta_08,
        Total_EMI_per_month: resposta_09,
        Amount_invested_monthly: resposta_10
    };

    try {
        const response = await axios.post('http://localhost:5000/predict', payload);

        const resultado = response.data.resultado;

        const SQLRespostas = `
            INSERT INTO respostas (
                id_usuario, resposta_01, resposta_02, resposta_03, resposta_04, resposta_05,
                resposta_06, resposta_07, resposta_08, resposta_09, resposta_10
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(SQLRespostas, [
            id_usuario,
            resposta_01, resposta_02, resposta_03, resposta_04, resposta_05,
            resposta_06, resposta_07, resposta_08, resposta_09, resposta_10
        ], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Erro ao salvar respostas" });
            }

            const SQLResultado = `
                INSERT INTO resultados (
                    id_usuario, resultado
                ) VALUES (?, ?)
            `;

            connection.query(SQLResultado, [
                id_usuario, resultado
            ], (err2) => {
                if (err2) {
                    console.log(err2);
                    return res.status(500).json({ error: "Erro ao salvar resultado" });
                }

                return res.status(201).json({
                    message: "Respostas e resultado registrados com sucesso",
                    resultado: resultado
                });
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro na comunicação com API de Machine Learning" });
    }
}
}