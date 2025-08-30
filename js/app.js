// Elementos DOM
const elements = {
    // Modals
    loginModal: document.getElementById('loginModal'),
    signupModal: document.getElementById('signupModal'),
    createResourceModal: document.getElementById('createResourceModal'),
    flashcardModal: document.getElementById('flashcardModal'),
    quizModal: document.getElementById('quizModal'),
    
    // Buttons
    loginBtn: document.getElementById('loginBtn'),
    signupBtn: document.getElementById('signupBtn'),
    ctaSignupBtn: document.getElementById('ctaSignupBtn'),
    ctaDemoBtn: document.getElementById('ctaDemoBtn'),
    
    // Close buttons
    closeLoginModal: document.getElementById('closeLoginModal'),
    closeSignupModal: document.getElementById('closeSignupModal'),
    closeCreateModal: document.getElementById('closeCreateModal'),
    closeFlashcardModal: document.getElementById('closeFlashcardModal'),
    closeQuizModal: document.getElementById('closeQuizModal'),
    
    // Navigation
    showSignup: document.getElementById('showSignup'),
    showLogin: document.getElementById('showLogin'),
    
    // Create resource buttons
    createFlashcardBtn: document.getElementById('createFlashcardBtn'),
    createQuizBtn: document.getElementById('createQuizBtn'),
    
    // Forms
    loginForm: document.getElementById('loginForm'),
    signupForm: document.getElementById('signupForm'),
    flashcardForm: document.getElementById('flashcardForm'),
    quizForm: document.getElementById('quizForm'),
    
    // Flashcard elements
    flashcardList: document.getElementById('flashcardList'),
    addFlashcard: document.getElementById('addFlashcard'),
    cancelFlashcard: document.getElementById('cancelFlashcard'),
    
    // AI elements
    generateAIFlashcard: document.getElementById('generateAIFlashcard'),
    aiTerm: document.getElementById('aiTerm'),
    aiContext: document.getElementById('aiContext'),
    
    // Quiz elements
    cancelQuiz: document.getElementById('cancelQuiz'),
    
    // Other elements
    dailyFlashcard: document.getElementById('dailyFlashcard'),
    toast: document.getElementById('toast')
};

// Mock data for the application
const mockData = {
    user: {
        name: "João Silva",
        role: "Aluno",
        xp: 1247,
        level: 12,
        stats: {
            flashcardsCreated: 47,
            quizzesSolved: 12,
            groupsJoined: 8,
            resourcesShared: 3
        },
        achievements: [
            { id: 1, title: "Iniciante Incansável", description: "Complete 5 simulados", icon: "star" },
            { id: 2, title: "Criador de Conteúdo", description: "Crie 10 flashcards", icon: "book" },
            { id: 3, title: "Colaborador Ativo", description: "Compartilhe 3 recursos", icon: "users" },
            { id: 4, title: "Mentor Comunitário", description: "Ajude 5 colegas", icon: "heart" }
        ],
        isAuthenticated: false
    }
};

// Função para processar resposta da API e extrair questões
function parseQuizResponse(response) {
    const questions = [];
    const questionBlocks = response.split('---').filter(block => block.trim());
    
    questionBlocks.forEach((block, index) => {
        const lines = block.trim().split('\n').filter(line => line.trim());
        
        if (lines.length < 7) return; // Questão incompleta
        
        const questionMatch = lines[0].match(/QUESTÃO\s*\d+:\s*(.*)/i);
        if (!questionMatch) return;
        
        const question = questionMatch[1].trim();
        const alternatives = [];
        let correctAnswer = '';
        let explanation = '';
        
        // Extrair alternativas
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            const altMatch = line.match(/^([a-e])\)\s*(.*)/i);
            if (altMatch) {
                alternatives.push({
                    letter: altMatch[1].toLowerCase(),
                    text: altMatch[2].trim()
                });
            } else if (line.startsWith('RESPOSTA:')) {
                correctAnswer = line.replace('RESPOSTA:', '').trim().toLowerCase();
            } else if (line.startsWith('EXPLICAÇÃO:')) {
                explanation = line.replace('EXPLICAÇÃO:', '').trim();
            }
        }
        
        if (question && alternatives.length === 5 && correctAnswer && explanation) {
            questions.push({
                id: index + 1,
                question,
                alternatives,
                correctAnswer,
                explanation
            });
        }
    });
    
    return questions;
}

// Função para salvar dados do usuário no localStorage
function saveUserDataToStorage() {
    localStorage.setItem('eduHubUser', JSON.stringify(mockData.user));
}

// Função para carregar dados do usuário do localStorage
function loadUserDataFromStorage() {
    const userData = localStorage.getItem('eduHubUser');
    if (userData) {
        mockData.user = { ...mockData.user, ...JSON.parse(userData) };
    }
}

// Inicialização da aplicação
function init() {
    loadUserDataFromStorage();
    updateAuthUI();
    setupEventListeners();
    
    // Verificar se o proxy está disponível
    checkProxyAvailability();
}

// Verificar disponibilidade do proxy
async function checkProxyAvailability() {
    try {
        await checkProxyStatus();
        console.log('✅ Proxy está disponível');
    } catch (error) {
        console.warn('⚠️ Proxy não está disponível:', error.message);
        showToast('Servidor proxy não está disponível. Inicie o servidor proxy para usar a geração de IA.', 'error');
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Flashcard flip
    if (elements.dailyFlashcard) {
        elements.dailyFlashcard.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    }
    
    // Modal triggers
    elements.loginBtn?.addEventListener('click', () => showModal('login'));
    elements.signupBtn?.addEventListener('click', () => showModal('signup'));
    elements.ctaSignupBtn?.addEventListener('click', () => showModal('signup'));
    elements.ctaDemoBtn?.addEventListener('click', () => showToast('Demonstração em desenvolvimento. Em breve!', 'error'));
    
    // Modal close buttons
    elements.closeLoginModal?.addEventListener('click', () => hideAllModals());
    elements.closeSignupModal?.addEventListener('click', () => hideAllModals());
    elements.closeCreateModal?.addEventListener('click', () => hideAllModals());
    elements.closeFlashcardModal?.addEventListener('click', () => hideAllModals());
    elements.closeQuizModal?.addEventListener('click', () => hideAllModals());
    
    // Modal navigation
    elements.showSignup?.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllModals();
        showModal('signup');
    });
    
    elements.showLogin?.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllModals();
        showModal('login');
    });
    
    // Create resource options
    elements.createFlashcardBtn?.addEventListener('click', () => {
        if (!mockData.user.isAuthenticated) {
            showModal('login');
            showToast('Você precisa estar logado para criar recursos', 'error');
            return;
        }
        hideAllModals();
        showModal('flashcard');
    });
    
    elements.createQuizBtn?.addEventListener('click', () => {
        if (!mockData.user.isAuthenticated) {
            showModal('login');
            showToast('Você precisa estar logado para criar recursos', 'error');
            return;
        }
        hideAllModals();
        showModal('quiz');
    });
    
    // AI Flashcard Generation
    elements.generateAIFlashcard?.addEventListener('click', async () => {
        const term = elements.aiTerm.value.trim();
        const context = elements.aiContext.value.trim();
        
        if (!term) {
            showToast('Por favor, digite um termo ou conceito', 'error');
            return;
        }
        
        // Mostrar estado de carregamento
        const originalText = elements.generateAIFlashcard.innerHTML;
        elements.generateAIFlashcard.innerHTML = '<div class="spinner"></div>Gerando...';
        elements.generateAIFlashcard.disabled = true;
        
        try {
            // Usar o proxy ao invés da chamada direta
            const flashcard = await generateFlashcardWithProxy(term, context);
            
            // Adicionar o flashcard gerado à lista
            addFlashcardToList(flashcard.front, flashcard.back);
            
            // Limpar campos
            elements.aiTerm.value = '';
            elements.aiContext.value = '';
            
            showToast('Flashcard gerado com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao gerar flashcard:', error);
            showToast('Erro ao gerar flashcard. Verifique se o servidor proxy está rodando.', 'error');
        } finally {
            // Restaurar botão
            elements.generateAIFlashcard.innerHTML = originalText;
            elements.generateAIFlashcard.disabled = false;
        }
    });
    
    // Add flashcard functionality
    elements.addFlashcard?.addEventListener('click', () => {
        addFlashcardToList('', '');
    });
    
    // Cancel buttons
    elements.cancelFlashcard?.addEventListener('click', () => hideAllModals());
    elements.cancelQuiz?.addEventListener('click', () => hideAllModals());
    
    // Form submissions
    elements.loginForm?.addEventListener('submit', handleLogin);
    elements.signupForm?.addEventListener('submit', handleSignup);
    elements.flashcardForm?.addEventListener('submit', handleFlashcardSubmit);
    elements.quizForm?.addEventListener('submit', handleQuizSubmit);

    // Adicionar event listeners para os botões dos cards principais
    const flashcardsCard = document.querySelector('#flashcards .btn-primary');
    const simuladosCard = document.querySelector('#simulados button');
    
    flashcardsCard?.addEventListener('click', () => {
        if (!mockData.user.isAuthenticated) {
            showModal('login');
            showToast('Você precisa estar logado para criar recursos', 'error');
            return;
        }
        showModal('createResource');
    });
    
    simuladosCard?.addEventListener('click', () => {
        if (!mockData.user.isAuthenticated) {
            showModal('login');
            showToast('Você precisa estar logado para criar recursos', 'error');
            return;
        }
        showModal('quiz');
    });
}

// Função para adicionar flashcard à lista
function addFlashcardToList(front = '', back = '') {
    const flashcard = document.createElement('div');
    flashcard.className = 'bg-gray-50 p-4 rounded-lg';
    flashcard.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Frente</label>
                <input type="text" placeholder="Pergunta ou termo" value="${front}" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Verso</label>
                <input type="text" placeholder="Resposta ou definição" value="${back}" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            </div>
        </div>
        <button type="button" class="remove-flashcard text-red-600 hover:text-red-800 font-medium text-sm">Remover este cartão</button>
    `;
    elements.flashcardList.appendChild(flashcard);
    
    // Add remove functionality
    flashcard.querySelector('.remove-flashcard').addEventListener('click', () => {
        flashcard.remove();
    });
}

// Mostrar modal
function showModal(modal) {
    hideAllModals();
    const modalElement = document.getElementById(`${modal}Modal`);
    if (modalElement) {
        modalElement.classList.remove('hidden');
    }
}

// Esconder todos os modais
function hideAllModals() {
    const modals = ['login', 'signup', 'createResource', 'flashcard', 'quiz'];
    modals.forEach(modal => {
        const modalElement = document.getElementById(`${modal}Modal`);
        if (modalElement) {
            modalElement.classList.add('hidden');
        }
    });
}

// Lidar com login
function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(elements.loginForm);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simular chamada da API
    setTimeout(() => {
        if (email && password) {
            mockData.user.isAuthenticated = true;
            mockData.user.email = email;
            saveUserDataToStorage();
            hideAllModals();
            updateAuthUI();
            showToast('Login realizado com sucesso!', 'success');
        } else {
            showToast('Email ou senha inválidos', 'error');
        }
    }, 500);
}

// Lidar com cadastro
function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(elements.signupForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const role = formData.get('role');
    
    // Simular chamada da API
    setTimeout(() => {
        if (name && email && password) {
            mockData.user.isAuthenticated = true;
            mockData.user.name = name;
            mockData.user.email = email;
            mockData.user.role = role;
            saveUserDataToStorage();
            hideAllModals();
            updateAuthUI();
            showToast('Cadastro realizado com sucesso!', 'success');
        } else {
            showToast('Por favor, preencha todos os campos', 'error');
        }
    }, 500);
}

// Atualizar UI baseado no status de autenticação
function updateAuthUI() {
    if (mockData.user.isAuthenticated) {
        elements.loginBtn.textContent = mockData.user.name;
        elements.signupBtn.style.display = 'none';
    } else {
        elements.loginBtn.textContent = 'Entrar';
        elements.signupBtn.style.display = 'block';
    }
}

// Lidar com submissão de flashcard
function handleFlashcardSubmit(e) {
    e.preventDefault();
    const formData = new FormData(elements.flashcardForm);
    const title = formData.get('title');
    const subject = formData.get('subject');
    const visibility = formData.get('visibility');
    
    // Obter todos os flashcards
    const flashcards = [];
    const flashcardElements = elements.flashcardList.querySelectorAll('.bg-gray-50');
    
    flashcardElements.forEach(card => {
        const front = card.querySelector('input[placeholder="Pergunta ou termo"]').value;
        const back = card.querySelector('input[placeholder="Resposta ou definição"]').value;
        if (front && back) {
            flashcards.push({ front, back });
        }
    });
    
    if (title && subject && flashcards.length > 0) {
        // Simular chamada da API
        setTimeout(() => {
            // Atualizar estatísticas do usuário
            mockData.user.stats.flashcardsCreated += flashcards.length;
            mockData.user.xp += flashcards.length * 10;
            
            // Verificar subida de nível
            const newLevel = Math.floor(mockData.user.xp / 100) + 1;
            if (newLevel > mockData.user.level) {
                mockData.user.level = newLevel;
                showToast(`Parabéns! Você subiu para o Nível ${newLevel}!`, 'success');
            }
            
            saveUserDataToStorage();
            hideAllModals();
            showToast(`Lista de ${flashcards.length} flashcards criada com sucesso!`, 'success');
            
            // Resetar formulário
            elements.flashcardForm.reset();
            // Manter apenas um flashcard vazio
            elements.flashcardList.innerHTML = '';
            addFlashcardToList();
        }, 1000);
    } else {
        showToast('Por favor, preencha todos os campos e adicione pelo menos um flashcard', 'error');
    }
}

// Lidar com submissão de quiz (ATUALIZADO PARA USAR O PROXY)
async function handleQuizSubmit(e) {
    e.preventDefault();
    const formData = new FormData(elements.quizForm);
    const title = formData.get('title');
    const subject = formData.get('subject');
    const difficulty = formData.get('difficulty');
    const questionsCount = parseInt(formData.get('questionsCount'));
    const topics = formData.get('topics');
    const examples = formData.get('examples');
    const visibility = formData.get('visibility');
    
    if (title && subject && difficulty && questionsCount) {
        // Mostrar estado de carregamento
        const submitBtn = elements.quizForm.querySelector('button[type="submit"]');
        const submitText = submitBtn.querySelector('.submit-text');
        const originalText = submitText.textContent;
        submitText.textContent = 'Gerando...';
        submitBtn.disabled = true;
        
        try {
            // Usar o proxy ao invés da chamada direta para Gemini
            const response = await generateQuizWithProxy(subject, difficulty, questionsCount, topics, examples);
            
            // Processar resposta
            const questions = parseQuizResponse(response);
            
            if (questions.length > 0) {
                // Salvar quiz gerado (em uma aplicação real, salvaria no backend)
                const quiz = {
                    title,
                    subject,
                    difficulty,
                    visibility,
                    questions,
                    createdAt: new Date().toISOString()
                };
                
                // Atualizar estatísticas do usuário
                mockData.user.stats.quizzesSolved += 1;
                mockData.user.xp += questions.length * 5;
                
                // Verificar subida de nível
                const newLevel = Math.floor(mockData.user.xp / 100) + 1;
                if (newLevel > mockData.user.level) {
                    mockData.user.level = newLevel;
                    showToast(`Parabéns! Você subiu para o Nível ${newLevel}!`, 'success');
                }
                
                saveUserDataToStorage();
                hideAllModals();
                showToast(`Simulado com ${questions.length} questões gerado com sucesso!`, 'success');
                
                // Mostrar preview do quiz
                showQuizPreview(quiz);
                
                // Resetar formulário
                elements.quizForm.reset();
            } else {
                throw new Error('Nenhuma questão válida foi gerada');
            }
        } catch (error) {
            console.error('Erro ao gerar quiz:', error);
            showToast('Erro ao gerar simulado. Verifique se o servidor proxy está rodando.', 'error');
        } finally {
            // Restaurar botão
            submitText.textContent = originalText;
            submitBtn.disabled = false;
        }
    } else {
        showToast('Por favor, preencha todos os campos obrigatórios', 'error');
    }
}

// Função para mostrar preview do quiz gerado
function showQuizPreview(quiz) {
    const previewHtml = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" id="quizPreview">
            <div class="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-900">Preview: ${quiz.title}</h3>
                    <button onclick="closeQuizPreview()" class="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="mb-4">
                    <span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2">${quiz.subject}</span>
                    <span class="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mr-2">${quiz.difficulty}</span>
                    <span class="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">${quiz.questions.length} questões</span>
                </div>
                <div class="space-y-6">
                    ${quiz.questions.map((q, index) => `
                        <div class="border border-gray-200 rounded-lg p-4">
                            <h4 class="font-semibold text-gray-900 mb-3">Questão ${index + 1}:</h4>
                            <p class="text-gray-700 mb-4">${q.question}</p>
                            <div class="space-y-2">
                                ${q.alternatives.map(alt => `
                                    <div class="flex items-center">
                                        <span class="font-medium text-gray-600 mr-2">${alt.letter.toUpperCase()})</span>
                                        <span class="text-gray-700">${alt.text}</span>
                                        ${alt.letter === q.correctAnswer ? '<span class="ml-2 text-green-600 font-semibold">✓</span>' : ''}
                                    </div>
                                `).join('')}
                            </div>
                            <div class="mt-3 p-3 bg-green-50 rounded-lg">
                                <p class="text-sm text-green-800"><strong>Explicação:</strong> ${q.explanation}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="flex justify-center mt-6">
                    <button onclick="closeQuizPreview()" class="btn-primary px-6 py-2 rounded-lg font-medium">Fechar Preview</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', previewHtml);
}

// Função global para fechar preview
window.closeQuizPreview = function() {
    const preview = document.getElementById('quizPreview');
    if (preview) {
        preview.remove();
    }
};

// Mostrar notificação toast
function showToast(message, type = 'success') {
    const toast = elements.toast;
    if (toast) {
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Substituir ícones do Feather
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Inicializar aplicação
    init();
});

// Exportar funções para uso global se necessário
window.EduHub = {
    showModal,
    hideAllModals,
    showToast
};

