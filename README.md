# EduHub-Gemini

Uma plataforma educacional colaborativa com integração da API Gemini para geração automática de questões de estudo.

## 🚀 Funcionalidades

- **Flashcards Inteligentes**: Crie e organize cartões de estudo personalizados
- **Simulados com IA**: Gere questões automaticamente usando a API Gemini
- **Colaboração**: Compartilhe recursos educacionais com outros usuários
- **Sistema de Gamificação**: XP, níveis e conquistas para motivar o aprendizado
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile

## 🤖 Integração com API Gemini

O sistema utiliza a API Gemini do Google para gerar questões de múltipla escolha personalizadas:

- **Personalização por matéria**: Matemática, Português, Biologia, Química, Física, História, Geografia
- **Níveis de dificuldade**: Fácil, Médio, Difícil
- **Quantidade configurável**: De 5 a 30 questões por simulado
- **Tópicos específicos**: Possibilidade de focar em temas específicos
- **Exemplos orientativos**: Use exemplos para guiar o estilo das questões

## 📁 Estrutura do Projeto

```
EduHub-Gemini/
├── index.html          # Página principal
├── js/
│   └── app.js          # JavaScript principal com integração Gemini
└── README.md           # Este arquivo
```

## 🔧 Configuração

### Pré-requisitos

- Navegador web moderno
- Conexão com a internet
- Chave da API Gemini (já configurada)

### Instalação

1. Faça o download ou clone este repositório
2. Abra o arquivo `index.html` em um navegador web
3. Comece a usar a plataforma!

## 🎯 Como Usar

### Criando Flashcards

1. Clique em "Entrar" ou "Cadastrar" para fazer login
2. Clique no botão "Criar Flashcards" 
3. Preencha o título, matéria e adicione seus cartões
4. Escolha a visibilidade (público ou privado)
5. Salve sua lista de flashcards

### Gerando Simulados com IA

1. Faça login na plataforma
2. Clique em "Gerar Simulado" 
3. Preencha as informações:
   - **Título**: Nome do seu simulado
   - **Matéria**: Escolha a disciplina
   - **Dificuldade**: Selecione o nível
   - **Quantidade**: Escolha de 5 a 30 questões
   - **Tópicos** (opcional): Especifique temas específicos
   - **Exemplos** (opcional): Forneça exemplos para orientar a IA
4. Clique em "Gerar Simulado"
5. Aguarde a IA processar e gerar as questões
6. Visualize o preview com todas as questões e respostas

## 🔑 Configuração da API

A chave da API Gemini já está configurada no arquivo `js/app.js`:

```javascript
const GEMINI_API_KEY = 'AIzaSyALhJ4jZWVs5cJVhZFlCp7qAbglRYYd5f4';
```

## 🌟 Recursos Técnicos

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Styling**: Tailwind CSS
- **Icons**: Feather Icons
- **API**: Google Gemini Pro
- **Storage**: LocalStorage para dados do usuário
- **Responsivo**: Design adaptável para todos os dispositivos

## 📱 Compatibilidade

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Dispositivos móveis (iOS/Android)

## 🚀 Deploy

Para publicar o site:

1. **Hospedagem estática**: Faça upload dos arquivos para qualquer serviço de hospedagem (Netlify, Vercel, GitHub Pages, etc.)
2. **Servidor local**: Use um servidor HTTP simples para desenvolvimento
3. **CDN**: Os recursos externos (Tailwind, Feather Icons) são carregados via CDN

### Exemplo de deploy local:

```bash
# Usando Python
python -m http.server 8000

# Usando Node.js
npx serve .

# Usando PHP
php -S localhost:8000
```

## 🔒 Segurança

- A chave da API está exposta no frontend para fins de demonstração
- Em produção, recomenda-se usar um backend para proteger a chave da API
- Implementar autenticação real com backend seguro
- Validação de dados no servidor

## 🤝 Contribuição

Este é um projeto de demonstração. Para melhorias:

1. Implemente autenticação real
2. Adicione backend para gerenciar dados
3. Melhore a segurança da API
4. Adicione mais tipos de questões
5. Implemente sistema de ranking

## 📄 Licença

Este projeto é fornecido como está, para fins educacionais e de demonstração.

## 📞 Suporte

Para dúvidas sobre o uso da plataforma, consulte a documentação da API Gemini ou entre em contato com o desenvolvedor.

---

**EduHub-Gemini** - Transformando educação com inteligência artificial 🎓✨

