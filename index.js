// 1. Importar Express
const express = require('express');

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

// Banco de dados "fake" em memória (jogos que conheço)
let jogos = [
    { id: 1, titulo: "Valorant", desenvolvedora: "Riot Games", ano: 2020, genero: "FPS", nota: 8 },
    { id: 2, titulo: "CSGO", desenvolvedora: "Valve", ano: 2012, genero: "FPS", nota: 9 },
    { id: 3, titulo: "Roblox", desenvolvedora: "Roblox Corporation", ano: 2006, genero: "Sandbox", nota: 8 },
    { id: 4, titulo: "Minecraft", desenvolvedora: "Mojang", ano: 2011, genero: "Sandbox", nota: 10 },
    { id: 5, titulo: "Genshin Impact", desenvolvedora: "miHoYo", ano: 2020, genero: "RPG", nota: 9 },
    { id: 6, titulo: "Osu!", desenvolvedora: "ppy", ano: 2007, genero: "Ritmo", nota: 8 },
    { id: 7, titulo: "REPO", desenvolvedora: "Indie", ano: 2024, genero: "Ação", nota: 7 },
    { id: 8, titulo: "PEAK", desenvolvedora: "Indie", ano: 2023, genero: "Aventura", nota: 7 },
    { id: 9, titulo: "Overcooked", desenvolvedora: "Ghost Town Games", ano: 2016, genero: "Simulação", nota: 9 },
    { id: 10, titulo: "League of Legends", desenvolvedora: "Riot Games", ano: 2009, genero: "MOBA", nota: 9 }
];

//GET /api/jogos
app.get('/api/jogos', (req, res) => {
    const { categoria, nota_max, nota_min, ordem, direcao, pagina = 1, limite = 10 } = req.query;

    //Lista todos os jogos
    let resultado = jogos;

    // ?categoria= - Filtra por categoria (gênero)
    if(categoria){
        resultado = resultado.filter(j => j.genero.toLowerCase() === categoria.toLowerCase());
    }

    // ?nota_max= - Filtra por nota máxima
    if(nota_max){
        resultado = resultado.filter(j => j.nota <= parseFloat(nota_max));
    }

    // ?nota_min= - Filtra por nota mínima
    if(nota_min){
        resultado = resultado.filter(j => j.nota >= parseFloat(nota_min));
    }

    // ?ordem=titulo - Filtra os titulos dos jogos por ordem alfabética
    if (ordem === "titulo") {
    resultado.sort((a, b) => {
        const comparacao = a.titulo.localeCompare(b.titulo);
        return direcao === "desc" ? -comparacao : comparacao;
        });
    }

    // ?pagina=&limite= - Páginação
    const page = parseInt(pagina);
    const limit = parseInt(limite);

    const inicio = (page - 1) * limit;
    const fim = inicio + limit;

    const dados = resultado.slice(inicio, fim);

    //Retorno com metadados
    res.json({
        total: resultado.length,
        pagina: page,
        limite: limit,
        dados
    });

    res.json(resultado);
})

//GET /api/jogos/:id - buscando os jogos por ID
app.get ('/api/jogos/:id', (req, res) => {
    const jogo = jogos.find(j => j.id === parseInt(req.params.id));

    if (!jogo){
        return res.status(404).json({erro: "Jogo não encontrado!"});
    }
    res.json(jogo);
})

let proximoId = 11; //Controla o próximo ID

//POST /api/jogos - criando um novo jogo
app.post('/api/jogos', (req, res) => {

    //Pegando os dados do body
    const { titulo, desenvolvedora, ano, genero, nota} = req.body;

    //Criando o objeto do novo jogo
    const novoJogo = {
        id: proximoId++,
        titulo,
        desenvolvedora,
        ano: parseInt(ano),
        genero,
        nota: parseFloat(nota)
    };

    //Adicionando ao array
    jogos.push(novoJogo);

    //Retorno do jogo criado com status 201 - concluído com sucesso
    res.status(201).json(novoJogo);
});

// 7. Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
