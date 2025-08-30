# EduHub Proxy

Servidor proxy seguro para proteger a chave da API Gemini no projeto EduHub.

## 🔧 Configuração

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   - Copie o arquivo `.env` e adicione sua chave da API Gemini:
   ```
   GEMINI_API_KEY=sua_chave_real_aqui
   ```

3. **Iniciar o servidor:**
   ```bash
   npm start
   ```

O servidor estará disponível em `http://localhost:3001`

## 📡 Endpoints

### POST /api/generate-quiz
Gera questões de múltipla escolha usando IA.

**Parâmetros:**
```json
{
  "subject": "Matemática",
  "difficulty": "Básico",
  "questionsCount": 5,
  "topics": "Equações de primeiro grau",
  "examples": "4x-70=x+8"
}
```

### POST /api/generate-flashcard
Gera flashcards educativos usando IA.

**Parâmetros:**
```json
{
  "term": "Fotossíntese",
  "context": "Biologia - Ensino Médio"
}
```

### GET /api/status
Verifica o status do servidor.

## 🔒 Segurança

- A chave da API Gemini fica protegida no servidor
- CORS configurado para aceitar requisições do frontend
- Validação de parâmetros obrigatórios
- Tratamento de erros robusto

## 🚀 Como usar com o frontend

No seu `app.js`, substitua as chamadas diretas para a API Gemini por chamadas para este proxy:

```javascript
// Antes (inseguro)
const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {...});

// Depois (seguro)
const response = await fetch('http://localhost:3001/api/generate-quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, difficulty, questionsCount, topics, examples })
});
```

