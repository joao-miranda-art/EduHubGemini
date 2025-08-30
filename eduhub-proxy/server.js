const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Polyfill para fetch no Node.js
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: '*', // Permite requisições de qualquer origem
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Função para chamar a API Gemini
async function callGeminiAPI(prompt) {
    try {
        const response = await fetch(`${process.env.GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 8192,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Erro da API Gemini:', response.status, errorData);
            throw new Error(`Erro na API Gemini: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Resposta inválida da API Gemini');
        }
        
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Erro ao chamar API Gemini:', error);
        throw error;
    }
}

// Endpoint para gerar simulados
app.post('/api/generate-quiz', async (req, res) => {
    try {
        const { subject, difficulty, questionsCount, topics, examples } = req.body;

        // Validação dos dados recebidos
        if (!subject || !difficulty || !questionsCount) {
            return res.status(400).json({
                error: 'Parâmetros obrigatórios: subject, difficulty, questionsCount'
            });
        }

        // Gerar prompt para o quiz
        let prompt = `Gere ${questionsCount} questões de múltipla escolha sobre ${subject} com nível de dificuldade ${difficulty.toLowerCase()}.

Formato para cada questão:
QUESTÃO X:
[Enunciado da questão]

a) [Alternativa A]
b) [Alternativa B] 
c) [Alternativa C]
d) [Alternativa D]
e) [Alternativa E]

RESPOSTA: [Letra da alternativa correta]
EXPLICAÇÃO: [Breve explicação da resposta]

---

Requisitos:
- Questões claras e bem formuladas
- Alternativas plausíveis e bem distribuídas
- Uma única resposta correta por questão
- Explicações didáticas e concisas
- Conteúdo adequado ao nível educacional brasileiro`;

        if (topics && topics.trim()) {
            prompt += `\n- Focar nos seguintes tópicos: ${topics}`;
        }

        if (examples && examples.trim()) {
            prompt += `\n\nExemplos de questões para referência:\n${examples}`;
        }

        console.log('Gerando quiz para:', { subject, difficulty, questionsCount });

        // Chamar API Gemini
        const response = await callGeminiAPI(prompt);

        // Retornar resposta
        res.json({
            success: true,
            data: response,
            metadata: {
                subject,
                difficulty,
                questionsCount,
                generatedAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Erro no endpoint generate-quiz:', error);
        res.status(500).json({
            error: 'Erro interno do servidor',
            message: error.message
        });
    }
});

// Endpoint para gerar flashcards
app.post('/api/generate-flashcard', async (req, res) => {
    try {
        const { term, context } = req.body;

        if (!term) {
            return res.status(400).json({
                error: 'Parâmetro obrigatório: term'
            });
        }

        const prompt = `Crie um flashcard educativo otimizado para memorização sobre o termo: "${term}"

${context ? `Contexto adicional: ${context}` : ''}

Formato de resposta:
FRENTE: [Pergunta clara e direta sobre o termo]
VERSO: [Definição concisa e fácil de memorizar, máximo 2-3 frases]

Requisitos:
- A pergunta deve ser clara e específica
- A resposta deve ser concisa mas completa
- Use linguagem simples e didática
- Foque nos aspectos mais importantes para memorização
- Evite informações desnecessárias ou muito técnicas`;

        console.log('Gerando flashcard para:', { term, context });

        const response = await callGeminiAPI(prompt);

        res.json({
            success: true,
            data: response,
            metadata: {
                term,
                context,
                generatedAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Erro no endpoint generate-flashcard:', error);
        res.status(500).json({
            error: 'Erro interno do servidor',
            message: error.message
        });
    }
});

// Endpoint de status
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        service: 'EduHub Proxy',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: [
            'POST /api/generate-quiz',
            'POST /api/generate-flashcard',
            'GET /api/status'
        ]
    });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: err.message
    });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor proxy rodando na porta ${PORT}`);
    console.log(`📡 Endpoints disponíveis:`);
    console.log(`   - POST http://localhost:${PORT}/api/generate-quiz`);
    console.log(`   - POST http://localhost:${PORT}/api/generate-flashcard`);
    console.log(`   - GET  http://localhost:${PORT}/api/status`);
    console.log(`🔑 Certifique-se de configurar GEMINI_API_KEY no arquivo .env`);
});

module.exports = app;

