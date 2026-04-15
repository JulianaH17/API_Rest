// database.js
const Database = require('better-sqlite3');

// Criar/abrir banco de dados
const db = new Database('jogos.db');

// Criar tabela se não existir
const createTableSQL = `
    CREATE TABLE IF NOT EXISTS jogos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo VARCHAR(100) NOT NULL,
        desenvolvedora VARCHAR(100) NOT NULL,
        ano INT,
        genero VARCHAR(50),
        nota INT CHECK (nota >= 0 AND nota <= 10),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

//Seed para popular a tabela
const seed = (`
INSERT INTO jogos (titulo, desenvolvedora, ano, genero, nota) VALUES
('Valorant', 'Riot Games', 2020, 'FPS', 8),
('CSGO', 'Valve', 2012, 'FPS', 9),
('Roblox', 'Roblox Corporation', 2006, 'Sandbox', 8),
('Minecraft', 'Mojang', 2011, 'Sandbox', 10),
('Genshin Impact', 'miHoYo', 2020, 'RPG', 9),
('Osu!', 'ppy', 2007, 'Ritmo', 8),
('REPO', 'Indie', 2024, 'Ação', 7),
('PEAK', 'Indie', 2023, 'Aventura', 7),
('Overcooked', 'Ghost Town Games', 2016, 'Simulação', 9),
('League of Legends', 'Riot Games', 2009, 'MOBA', 9);
`);

console.log("Dados inseridos!");

db.exec(createTableSQL);
db.exec(seed);

// Executei node database.js
console.log('Banco de dados conectado!');

// Exportar para usar em outros arquivos
module.exports = db;