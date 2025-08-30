// Configuração do Proxy Seguro
const PROXY_CONFIG = {
    BASE_URL: 'http://localhost:3001',
    ENDPOINTS: {
        GENERATE_QUIZ: '/api/generate-quiz',
        GENERATE_FLASHCARD: '/api/generate-flashcard',
        STATUS: '/api/status'
    }
};

// Função para chamar o proxy (substitui a chamada direta para Gemini)
async function callProxyAPI(endpoint, data) {
    try {
        const response = await fetch(`${PROXY_CONFIG.BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro do proxy:', response.status, errorData);
            throw new Error(errorData.message || `Erro no proxy: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Erro desconhecido do proxy');
        }
        
        return result.data;
    } catch (error) {
        console.error('Erro ao chamar proxy:', error);
        throw error;
    }
}

// Função para gerar quiz usando o proxy
async function generateQuizWithProxy(subject, difficulty, questionsCount, topics, examples) {
    return await callProxyAPI(PROXY_CONFIG.ENDPOINTS.GENERATE_QUIZ, {
        subject,
        difficulty,
        questionsCount,
        topics,
        examples
    });
}

// Função para gerar flashcard usando o proxy
async function generateFlashcardWithProxy(term, context) {
    const response = await callProxyAPI(PROXY_CONFIG.ENDPOINTS.GENERATE_FLASHCARD, {
        term,
        context
    });
    
    // Extrair frente e verso da resposta
    const fronteMatch = response.match(/FRENTE:\s*(.*?)(?=VERSO:|$)/s);
    const versoMatch = response.match(/VERSO:\s*(.*?)$/s);
    
    if (fronteMatch && versoMatch) {
        return {
            front: fronteMatch[1].trim(),
            back: versoMatch[1].trim()
        };
    } else {
        throw new Error('Formato de resposta inválido do proxy');
    }
}

// Função para verificar status do proxy
async function checkProxyStatus() {
    try {
        const response = await fetch(`${PROXY_CONFIG.BASE_URL}${PROXY_CONFIG.ENDPOINTS.STATUS}`);
        return await response.json();
    } catch (error) {
        console.error('Proxy não está disponível:', error);
        throw new Error('Servidor proxy não está disponível. Certifique-se de que está rodando na porta 3001.');
    }
}

// Exportar para uso global
window.PROXY_CONFIG = PROXY_CONFIG;
window.callProxyAPI = callProxyAPI;
window.generateQuizWithProxy = generateQuizWithProxy;
window.generateFlashcardWithProxy = generateFlashcardWithProxy;
window.checkProxyStatus = checkProxyStatus;

