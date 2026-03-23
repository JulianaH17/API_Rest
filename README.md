# 🎮 API de Jogos

API REST simples desenvolvida com Node.js e Express para gerenciar uma lista de jogos.

---

## 🚀 Tecnologias utilizadas

* Node.js
* Express
* Insomnia (para testes)

---

## 📦 Como executar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/JulianaH17/API_Rest.git
```

2. Acesse a pasta:

```bash
cd API_Rest
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor:

```bash
node index.js
```

5. A API estará disponível em:

```bash
http://localhost:8000
```

---

## 📌 Endpoints

### 🔹 GET /api/jogos

Lista todos os jogos

#### Filtros opcionais:

* `?categoria=FPS`
* `?ordem=titulo`
* `?direcao=desc`

📌 Exemplo:

```bash
http://localhost:8000/api/jogos?categoria=FPS&ordem=titulo
```

---

### 🔹 GET /api/jogos/:id

Busca um jogo pelo ID

📌 Exemplo:

```bash
http://localhost:8000/api/jogos/1
```

---

### 🔹 POST /api/jogos

Cria um novo jogo

📌 Body (JSON):

```json
{
  "titulo": "Novo Jogo",
  "desenvolvedora": "Empresa",
  "ano": 2024,
  "genero": "Ação",
  "nota": 8
}
```

---

### 🔹 PUT /api/jogos/:id

Atualiza um jogo existente

📌 Exemplo:

```bash
PUT http://localhost:8000/api/jogos/1
```

---

### 🔹 DELETE /api/jogos/:id

Remove um jogo

📌 Exemplo:

```bash
DELETE http://localhost:8000/api/jogos/1
```

---

## ⚠️ Validações

* Todos os campos são obrigatórios
* `ano` e `nota` devem ser números positivos
* `titulo` deve ter pelo menos 3 caracteres

---

## 🧪 Testes

A collection do Insomnia está disponível no repositório:

📄 `api-jogos.json`

Importe no Insomnia para testar todos os endpoints.

---

## 📌 Observações

* Os dados são armazenados em memória (não há banco de dados)
* Ao reiniciar o servidor, os dados voltam ao estado inicial

---

## 👩‍💻 Autora

Projeto desenvolvido por Juliana Hara.
