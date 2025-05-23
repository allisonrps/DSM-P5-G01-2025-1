const connection = require('../database/connection');

module.exports = {
    listarTodas: (req, res) => {
        connection.query("SELECT * FROM respostas", (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao listar respostas" });
            return res.status(200).json({ respostas: result });
        });
    },

    criarResposta: (req, res) => {
        const { id_usuario, id_pergunta, resposta_sim_nao, valor_resposta } = req.body;
        
        // Validação básica dos campos obrigatórios
        if (!id_usuario || !id_pergunta || resposta_sim_nao === undefined || valor_resposta === undefined) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const SQL = "INSERT INTO respostas (id_usuario, id_pergunta, resposta_sim_nao, valor_resposta) VALUES (?, ?, ?, ?)";
        connection.query(SQL, [id_usuario, id_pergunta, resposta_sim_nao, valor_resposta], (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao salvar resposta" });
            return res.status(201).json({ message: "Resposta registrada", id: result.insertId });
        });
    },

    atualizarResposta: (req, res) => {
        const { id } = req.params;
        const { id_usuario, id_pergunta, resposta_sim_nao, valor_resposta } = req.body;
        
        // Validação básica dos campos obrigatórios
        if (!id_usuario || !id_pergunta || resposta_sim_nao === undefined || valor_resposta === undefined) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const SQL = "UPDATE respostas SET id_usuario = ?, id_pergunta = ?, resposta_sim_nao = ?, valor_resposta = ? WHERE id = ?";
        connection.query(SQL, [id_usuario, id_pergunta, resposta_sim_nao, valor_resposta, id], (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao atualizar resposta" });
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Resposta não encontrada" });
            }
            
            return res.status(200).json({ message: "Resposta atualizada com sucesso" });
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

    // Método adicional para buscar uma resposta específica por ID
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