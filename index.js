// 1. Importar Express
const express = require('express');
const db = require('./database');   // Agora podemos usar 'db' nas rotas

// 2. Criar aplicação
const app = express();

// 3. Definir porta
const PORT = 8000;

// 4. Middleware para JSON
app.use(express.json());

// 5. Endpoint de informações
app.get('/dados', (req, res) => {
    res.json({
        nome: 'Minha API REST',
        versao: '1.0.0',
        autor: 'Juliana Hara',
        descricao: "Essa é uma API de exemplo criada para fins educacionais"
    });
});

// GET /api/jogos
app.get('/api/jogos', (req, res) => {
    const { categoria, nota_max, nota_min, ordem, direcao, pagina = 1, limite = 10 } = req.query;

    //Lista todos os jogos
    let sql = "SELECT * FROM jogos WHERE 1=1";
    let params = [];

    // ?categoria= - Filtra por categoria (gênero)
    if (categoria) {
        sql += " AND LOWER(genero) = LOWER(?)";
        params.push(categoria);
    }

    // ?nota_max= - Filtra por nota máxima
    if (nota_max) {
        sql += " AND nota <= ?";
        params.push(parseFloat(nota_max));
    }

    // ?nota_min= - Filtra por nota mínima
    if (nota_min) {
        sql += " AND nota >= ?";
        params.push(parseFloat(nota_min));
    }

    // ?ordem=titulo - Filtra os titulos dos jogos por ordem alfabética
    if (ordem === "titulo") {
        sql += ` ORDER BY titulo ${direcao === "desc" ? "DESC" : "ASC"}`;
    }

   // ?pagina=&limite= - Páginação (garantindo um número válido)
    const page = parseInt(pagina) || 1;
    const limit = parseInt(limite) || 10;
    const offset = (page - 1) * limit;

    sql += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    // Retorno
    try {
        const stmt = db.prepare(sql);
        const rows = stmt.all(...params);

        res.json({
            pagina: page,
            limite: limit,
            total: rows.length,
            dados: rows
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: err.message });
    }
});

//GET /api/jogos/:id - buscando os jogos por ID
app.get('/api/jogos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const jogo = db
            .prepare("SELECT * FROM jogos WHERE id = ?")
            .get(id);

        if (!jogo) {
            return res.status(404).json({ erro: "Jogo não encontrado!" });
        }

        res.json(jogo);

    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

//POST /api/jogos - criando um novo jogo
app.post('/api/jogos', (req, res) => {

    //Pegando os dados do body
    const { titulo, desenvolvedora, ano, genero, nota} = req.body;

    //Validação de campo obrigatório
    if(!titulo || !desenvolvedora || !ano || !genero || !nota){
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios"
        });
    }

    //Conversão para número
    const anoNum = parseInt(ano);
    const notaNum = parseFloat(nota);

    //Verificação se são números válidos
    if (isNaN(anoNum) || isNaN(notaNum)) {
        return res.status(400).json({
            erro: "Ano e nota devem ser números válidos"
        });
    }

    //Validação ano e nota positivos
    if(anoNum <= 0 || notaNum <= 0){
        return res.status(400).json({
            erro: "Ano e nota devem ser valores positivos"
        });
    }

    //Validação tamanho mínimo
    if(titulo.length < 3){
        return res.status(400).json({
            erro: "O título deve ter pelo menos 3 caracteres"
        });
    }

    //Criando o objeto do novo jogo e inserindo na tabela
    try {
        const stmt = db.prepare(`
            INSERT INTO jogos (titulo, desenvolvedora, ano, genero, nota)
            VALUES (?, ?, ?, ?, ?)
        `);

        const result = stmt.run(
            titulo,
            desenvolvedora,
            anoNum,
            genero,
            notaNum
        );

        res.status(201).json({
            id: result.lastInsertRowid,
            titulo,
            desenvolvedora,
            ano: anoNum,
            genero,
            nota: notaNum
        });

    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

//PUT /api/jogos/:id - atualiza o jogo
app.put('/api/jogos/:id', (req, res) => {

    //Pega o ID da URL
    const id = parseInt(req.params.id);

    //Busca o jogo no array
    const jogo = jogos.find(j => j.id === id);

    //Verifica se existe
    if(!jogo){
        return res.status(404).json({
            erro: "Jogo não encontrado"
        });
    }

    //Extrair dados do body
    const { titulo, desenvolvedora, ano, genero, nota} = req.body;

    //Validações (igual do POST!!!)

    //Validação de campo obrigatório
    if(!titulo || !desenvolvedora || !ano || !genero || !nota){
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios"
        });
    }

    //Conversão para número
    const anoNum = parseInt(ano);
    const notaNum = parseFloat(nota);

    //Verificação se são números válidos
    if (isNaN(anoNum) || isNaN(notaNum)) {
        return res.status(400).json({
            erro: "Ano e nota devem ser números válidos"
        });
    }

    //Validação ano e nota positivos
    if(anoNum <= 0 || notaNum <= 0){
        return res.status(400).json({
            erro: "Ano e nota devem ser valores positivos"
        });
    }

    //Validação tamanho mínimo
    if(titulo.length < 3){
        return res.status(400).json({
            erro: "O título deve ter pelo menos 3 caracteres"
        });
    }

    //Atualizar os campos dos jogos
    jogo.titulo = titulo;
    jogo.desenvolvedora = desenvolvedora;
    jogo.ano = anoNum;
    jogo.genero = genero;
    jogo.nota = notaNum;

    //Retorna o jogo atualizado com 200 OK
    res.json({
        mensagem: "Jogo atualizado com sucesso", jogo
    });
});

//DELETE /api/jogos/:id - deleta um dos jogos já existentes
app.delete('/api/jogos/:id', (req, res) => {

    //Pegar o ID da URL
    const id = parseInt(req.params.id);

    //Encontrar índice do jogo no array
    const index = jogos.findIndex(j => j.id === id);

    //Verificação para saber se existe
    if(index === -1){
        return res.status(404).json({
            erro: "Jogo não encontrado"
        });
    }

    //Remover do array
    jogos.splice(index, 1);

    //Retornar 204 No Content (sem body)
    res.status(204).send();
});

// 7. Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
