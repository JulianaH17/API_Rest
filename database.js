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

db.exec(createTableSQL);

// Executei node database.js
console.log('Banco de dados conectado!');

// Exportar para usar em outros arquivos
module.exports = db;