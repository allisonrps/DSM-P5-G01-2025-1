const connection = require('../database/connection');

module.exports = {
    listarTodas: (req, res) => {
        const SQL = "SELECT * FROM perguntas ORDER BY id DESC";
        connection.query(SQL, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao listar perguntas" });
            return res.status(200).json({ perguntas: result });
        });
    },

    criarPergunta: (req, res) => {
        const { coluna_dataset, texto_pergunta } = req.body;
        
        if (!coluna_dataset || !texto_pergunta) {
            return res.status(400).json({ error: "Campos coluna_dataset e texto_pergunta são obrigatórios" });
        }

        const SQL = "INSERT INTO perguntas (coluna_dataset, texto_pergunta) VALUES (?, ?)";
        connection.query(SQL, [coluna_dataset, texto_pergunta], (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao criar pergunta" });
            return res.status(201).json({ message: "Pergunta criada com sucesso", id: result.insertId });
        });
    },

    // Criar várias perguntas de uma vez
    criarVariasPerguntas: (req, res) => {
        const perguntas = req.body;

        if (!Array.isArray(perguntas)) {
            return res.status(400).json({ error: "O corpo da requisição deve ser um array de perguntas" });
        }

        // Verifica se todas as perguntas têm os campos necessários
        for (const pergunta of perguntas) {
            if (!pergunta.coluna_dataset || !pergunta.texto_pergunta) {
                return res.status(400).json({ error: "Todas as perguntas devem ter coluna_dataset e texto_pergunta" });
            }
        }

        const SQL = "INSERT INTO perguntas (coluna_dataset, texto_pergunta) VALUES ?";
        const values = perguntas.map(p => [p.coluna_dataset, p.texto_pergunta]);
        
        connection.query(SQL, [values], (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao criar perguntas" });
            return res.status(201).json({ 
                message: `${perguntas.length} perguntas criadas com sucesso`,
                ids: Array.from({length: perguntas.length}, (_, i) => result.insertId + i)
            });
        });
    },

    // Atualizar uma pergunta específica por ID
    atualizarPergunta: (req, res) => {
        const { id } = req.params;
        const { coluna_dataset, texto_pergunta } = req.body;

        if (!coluna_dataset || !texto_pergunta) {
            return res.status(400).json({ error: "Campos coluna_dataset e texto_pergunta são obrigatórios" });
        }

        const SQL = "UPDATE perguntas SET coluna_dataset = ?, texto_pergunta = ? WHERE id = ?";
        connection.query(SQL, [coluna_dataset, texto_pergunta, id], (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao atualizar pergunta" });
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Pergunta não encontrada" });
            }
            
            return res.status(200).json({ message: "Pergunta atualizada com sucesso" });
        });
    },

    // Atualizar várias perguntas de uma vez
    atualizarVariasPerguntas: (req, res) => {
        const atualizacoes = req.body;

        if (!Array.isArray(atualizacoes)) {
            return res.status(400).json({ error: "O corpo da requisição deve ser um array de atualizações" });
        }

        // Verifica se todas as atualizações têm os campos necessários
        for (const atualizacao of atualizacoes) {
            if (!atualizacao.id || !atualizacao.coluna_dataset || !atualizacao.texto_pergunta) {
                return res.status(400).json({ error: "Todas as atualizações devem ter id, coluna_dataset e texto_pergunta" });
            }
        }

        const promises = atualizacoes.map(atualizacao => {
            return new Promise((resolve, reject) => {
                const SQL = "UPDATE perguntas SET coluna_dataset = ?, texto_pergunta = ? WHERE id = ?";
                connection.query(SQL, [atualizacao.coluna_dataset, atualizacao.texto_pergunta, atualizacao.id], (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows);
                });
            });
        });

        Promise.all(promises)
            .then(results => {
                const atualizadas = results.filter(rows => rows > 0).length;
                return res.status(200).json({ 
                    message: `${atualizadas} perguntas atualizadas com sucesso`,
                    total: atualizacoes.length
                });
            })
            .catch(err => {
                return res.status(500).json({ error: "Erro ao atualizar perguntas" });
            });
    },

    // Deletar uma pergunta por ID
    deletarPergunta: (req, res) => {
        const { id } = req.params;

        const SQL = "DELETE FROM perguntas WHERE id = ?";
        connection.query(SQL, [id], (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao deletar pergunta" });
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Pergunta não encontrada" });
            }
            
            return res.status(200).json({ message: "Pergunta deletada com sucesso" });
        });
    }
};