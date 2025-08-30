# 🚀 INSTRUÇÕES DE USO - EduHub-Gemini

## ✅ Projeto Pronto para Publicação!

Seu site EduHub-Gemini está **100% funcional** e pronto para ser publicado. Todos os arquivos estão organizados e a integração com a API Gemini está implementada.

## 📁 Estrutura do Projeto

```
EduHub-Gemini/
├── index.html          # Página principal do site
├── js/
│   ├── config.js       # Configuração da API Gemini
│   └── app.js          # JavaScript principal da aplicação
├── README.md           # Documentação técnica
└── INSTRUCOES.md       # Este arquivo
```

## 🔑 Sua Chave API Configurada

✅ **Chave API Gemini**: `AIzaSyALhJ4jZWVs5cJVhZFlCp7qAbglRYYd5f4`
- Já está configurada no arquivo `js/config.js`
- Pronta para uso em produção

## 🎯 Funcionalidades Implementadas

### ✅ Geração de Questões com IA
- **Quantidade personalizável**: 5, 10, 15, 20, 25 ou 30 questões
- **Matérias disponíveis**: Matemática, Português, Biologia, Química, Física, História, Geografia
- **Níveis de dificuldade**: Fácil, Médio, Difícil
- **Tópicos específicos**: Campo opcional para focar em temas específicos
- **Exemplos orientativos**: Campo para guiar o estilo das questões

### ✅ Sistema de Flashcards
- Criação de cartões de estudo personalizados
- Organização por matérias
- Sistema de revisão interativo

### ✅ Interface Responsiva
- Design moderno com Tailwind CSS
- Compatível com desktop e mobile
- Animações e transições suaves

### ✅ Sistema de Usuário
- Login e cadastro simulados
- Gamificação com XP e níveis
- Notificações toast

## 🌐 Como Publicar o Site

### Opção 1: Hospedagem Gratuita (Recomendado)

#### **Netlify** (Mais fácil)
1. Acesse [netlify.com](https://netlify.com)
2. Faça login ou crie uma conta
3. Arraste a pasta `EduHub-Gemini` para o Netlify
4. Seu site estará online em segundos!

#### **Vercel**
1. Acesse [vercel.com](https://vercel.com)
2. Conecte com GitHub ou faça upload direto
3. Selecione a pasta do projeto
4. Deploy automático

#### **GitHub Pages**
1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Ative GitHub Pages nas configurações
4. Acesse via `username.github.io/repositorio`

### Opção 2: Hospedagem Paga
- **Hostinger**: A partir de R$ 2,99/mês
- **GoDaddy**: Planos a partir de R$ 5,99/mês
- **UOL Host**: Opção nacional

## 🧪 Como Testar Localmente

### Método 1: Servidor HTTP Simples
```bash
# No terminal, dentro da pasta EduHub-Gemini:
python -m http.server 8000
# Acesse: http://localhost:8000
```

### Método 2: Live Server (VS Code)
1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito no `index.html`
3. Selecione "Open with Live Server"

## 🎮 Como Usar o Site

### 1. **Fazer Login**
- Clique em "Entrar" ou "Cadastrar"
- Use qualquer email e senha (sistema simulado)
- Exemplo: `teste@eduhub.com` / `123456`

### 2. **Gerar Simulado com IA**
- Clique em "Gerar Simulado"
- Preencha os campos:
  - **Título**: Nome do simulado
  - **Matéria**: Escolha a disciplina
  - **Dificuldade**: Fácil, Médio ou Difícil
  - **Quantidade**: **5 a 30 questões** (conforme solicitado!)
  - **Tópicos**: Opcional - especifique temas
  - **Exemplos**: Opcional - oriente a IA
- Clique em "Gerar Simulado"
- Aguarde a IA processar (pode levar alguns segundos)
- Visualize o preview com todas as questões

### 3. **Criar Flashcards**
- Clique em "Criar Flashcards"
- Adicione título, matéria e cartões
- Use o botão "+" para adicionar mais cartões

## 🔧 Personalização

### Alterar Cores
Edite o arquivo `index.html` e modifique as classes do Tailwind CSS:
- `bg-blue-600` → `bg-green-600` (mudar cor primária)
- `text-blue-600` → `text-green-600` (mudar cor do texto)

### Adicionar Matérias
No arquivo `index.html`, encontre os `<select>` e adicione novas opções:
```html
<option>Nova Matéria</option>
```

### Modificar Quantidade de Questões
No arquivo `index.html`, edite o select de quantidade:
```html
<option value="50">50 questões</option>
```

## 🛡️ Segurança em Produção

⚠️ **IMPORTANTE**: Para uso em produção real, considere:

1. **Proteger a chave da API**:
   - Mova a chave para um backend
   - Use variáveis de ambiente
   - Implemente autenticação real

2. **Backend recomendado**:
   - Node.js + Express
   - Python + Flask
   - PHP + Laravel

## 📞 Suporte

### Problemas Comuns

**❌ "Erro ao gerar simulado"**
- Verifique sua conexão com internet
- Confirme se a chave da API está correta
- Tente com menos questões primeiro

**❌ Site não carrega estilos**
- Verifique se há conexão com internet (Tailwind CSS via CDN)
- Teste em navegador atualizado

**❌ JavaScript não funciona**
- Abra o console do navegador (F12)
- Verifique se há erros
- Confirme se todos os arquivos estão na pasta correta

### Melhorias Futuras
- [ ] Sistema de usuários real
- [ ] Banco de dados para salvar simulados
- [ ] Mais tipos de questões (V/F, dissertativas)
- [ ] Sistema de ranking
- [ ] Compartilhamento social

## 🎉 Parabéns!

Seu site EduHub-Gemini está pronto! 

**Recursos implementados conforme solicitado:**
✅ Estrutura completa do site
✅ Integração com API Gemini (sua chave configurada)
✅ **Opção para escolher quantidade de questões (5-30)**
✅ Interface moderna e responsiva
✅ Pronto para publicação

**Próximos passos:**
1. Teste o site localmente
2. Publique em uma plataforma de hospedagem
3. Compartilhe com seus usuários!

---

**Desenvolvido com ❤️ usando:**
- HTML5 + CSS3 + JavaScript
- Tailwind CSS
- API Google Gemini
- Feather Icons

**Boa sorte com seu projeto educacional! 🚀📚**

