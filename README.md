# 🎮 API de Jogos com Node.js + SQLite

Este projeto é uma API REST desenvolvida com **Node.js**, **Express** e **SQLite**, que permite realizar operações de **CRUD (Create, Read, Update, Delete)** em uma base de dados de jogos.

---

## 🚀 Tecnologias utilizadas

* Node.js
* Express
* better-sqlite3
* SQLite
* Insomnia (para testes)

---

## 📂 Estrutura do projeto

```
/projeto
├── .gitignore
├── README.md
├── api-jogos-sql.json   # Collection do Insomnia (testes com SQLite)
├── api-jogos.json       # Collection do Insomnia (versão inicial)
├── database.js          # Configuração do banco SQLite
├── index.js             # Arquivo principal (rotas da API)
├── jogos.db             # Banco de dados SQLite
├── package.json
├── package-lock.json
└── seed.js              # Script para popular o banco
```

---

## ⚙️ Como rodar o projeto na sua máquina

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/JulianaH17/API_Rest.git
cd API_Rest
```

---

### 2️⃣ Instalar as dependências

```bash
npm install
```

---

### 3️⃣ (Opcional) Popular o banco de dados

```bash
node seed.js
```

---

### 4️⃣ Rodar o servidor

```bash
npm start
```

ou

```bash
node index.js
```

---

### 5️⃣ Acessar a API

Por padrão, o servidor roda em:

```
http://localhost:8000
```

---

## 📌 Endpoints da API

### 🔹 GET /api/jogos

Lista todos os jogos (com filtros e paginação)

**Exemplos:**

```
/api/jogos
/api/jogos?categoria=RPG
/api/jogos?pagina=2&limite=5
```

---

### 🔹 GET /api/jogos/:id

Busca um jogo pelo ID

---

### 🔹 POST /api/jogos

Cria um novo jogo

**Exemplo de body:**

```json
{
  "titulo": "Minecraft",
  "desenvolvedora": "Mojang",
  "ano": 2011,
  "genero": "Sandbox",
  "nota": 10
}
```

---

### 🔹 PUT /api/jogos/:id

Atualiza um jogo existente

---

### 🔹 DELETE /api/jogos/:id

Remove um jogo do banco

---

## 🧪 Testes com Insomnia

O projeto possui um arquivo chamado:

```
api-jogos-sql.json
```

👉 Esse arquivo é uma **collection do Insomnia** com todas as requisições prontas.

### Como usar:

1. Abrir o Insomnia
2. Clicar em **Import**
3. Selecionar o arquivo `api-jogos-sql.json`
4. Testar os endpoints da API

---

## ⚠️ Observações

* O banco de dados é criado automaticamente ao iniciar a aplicação
* O arquivo `node_modules` não é versionado (está no `.gitignore`)
* O ID dos jogos é gerado automaticamente pelo SQLite

---

Projeto desenvolvido por Juliana Hara.
