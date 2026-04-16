const db = require('./database');

//Seed para popular a tabela
db.exec(`
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

console.log("Seed executado!");