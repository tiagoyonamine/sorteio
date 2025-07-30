# Site de Sorteio - 20ª Festa do Sukiyaki

## Descrição

Site de sorteio otimizado para a 20ª Festa do Sukiyaki das Lojas Maçônicas de Bertioga. O layout foi projetado especificamente para exibição em telão durante eventos, com foco na experiência visual e máxima simplicidade.

## Características

### ✨ **Layout Otimizado**
- Design limpo e minimalista inspirado no estilo Apple
- Layout de 3 colunas com elementos perfeitamente alinhados
- Logo maior e mais visível, posicionado à esquerda do box do ganhador
- Contador de participantes alinhado à direita do box do ganhador
- Otimizado para exibição em telão sem necessidade de scroll

### 📊 **Contador Inteligente**
- **Participantes**: Número total de participantes carregados da planilha em tempo real
- Removido o contador de sorteios para máxima simplicidade
- Atualizado automaticamente conforme os dados da planilha

### 🎯 **Funcionalidades**
- Sorteio aleatório com animação de 3 segundos
- Integração automática com planilha do Google Sheets
- Controle por teclado (barra de espaço para sortear)
- Sistema de fallback com dados de teste
- Aleatoriedade criptográfica para máxima imparcialidade

### 🎨 **Design**
- Paleta de cores oficial do evento Sukiyaki
- Logo oficial integrado e aumentado para melhor visibilidade
- Tipografia moderna e legível
- Animações suaves e profissionais
- Layout responsivo que se adapta a diferentes tamanhos de tela

## Configuração

### 📋 **Planilha do Google Sheets**

O sistema está configurado para carregar automaticamente os nomes da planilha:
- **URL**: `https://docs.google.com/spreadsheets/d/1_foOTolYHT5GByegXm0-0NpalC8mSMxgN15O7lCBgCQ/export?format=csv&gid=87642040`
- **Coluna utilizada**: B (Nome completo)
- **Formato**: CSV exportado automaticamente

### 🔧 **Personalização**

Para alterar a planilha, edite a variável `SPREADSHEET_URL` no arquivo `script.js`:

```javascript
const SPREADSHEET_URL = 'SUA_URL_AQUI';
```

### 📁 **Estrutura de Arquivos**

```
layout-sukiyaki/
├── index.html          # Estrutura da página
├── styles.css          # Estilos e layout
├── script.js           # Lógica do sorteio
├── sukiyaki-logo.png   # Logo oficial do evento
└── README.md           # Esta documentação
```

## Como Usar

### 🚀 **Execução Local**

1. Abra o arquivo `index.html` em um navegador web
2. Aguarde o carregamento dos participantes da planilha
3. Clique em "INICIAR SORTEIO" ou pressione a barra de espaço
4. Aguarde a animação de 3 segundos para ver o resultado

### 🌐 **Hospedagem em Servidor**

Para evitar problemas de CORS, hospede os arquivos em um servidor web:

```bash
# Usando Python (recomendado)
python3 -m http.server 8000

# Usando Node.js
npx serve .

# Usando PHP
php -S localhost:8000
```

### ⌨️ **Controles**

- **Clique no botão**: Inicia o sorteio
- **Barra de espaço**: Atalho para iniciar o sorteio
- **Múltiplos sorteios**: Possível sortear quantas vezes necessário

## Layout e Posicionamento

### 📐 **Estrutura Visual**
- **Coluna Esquerda**: Logo do Sukiyaki (aumentado para 280px)
- **Coluna Central**: Área do sorteio (título "Ganhador:", box do nome, botão)
- **Coluna Direita**: Contador de participantes
- **Alinhamento Vertical**: Todos os elementos alinhados na altura do box do ganhador

### 🎨 **Elementos Visuais**
- **Logo**: Posicionado à esquerda, tamanho otimizado para telão
- **Box do Ganhador**: Centro da tela, destaque máximo
- **Contador**: À direita, informação clara e visível
- **Cores**: Vermelho (#d32f2f), dourado (#ffa500) e preto

## Funcionalidades Técnicas

### 🔒 **Segurança e Aleatoriedade**
- Utiliza `crypto.getRandomValues()` para aleatoriedade criptográfica
- Algoritmo Fisher-Yates para embaralhamento eficiente
- Fallback para `Math.random()` em navegadores antigos

### 📱 **Responsividade**
- Layout adaptativo para desktop, tablet e mobile
- Otimizado para telas de telão (1920x1080 e superiores)
- Fontes e elementos escaláveis
- Grid responsivo que se adapta automaticamente

### 🛠️ **Debugging**

Comandos disponíveis no console do navegador:

```javascript
// Recarregar participantes da planilha
reloadParticipants();

// Verificar participantes carregados
console.log(participantes);
```

### ⚡ **Performance**
- Otimizado para mais de 1000 participantes
- Carregamento assíncrono da planilha
- Animações GPU-aceleradas
- Código JavaScript otimizado e eficiente

## Solução de Problemas

### ❌ **Planilha não carrega**
- Verifique se a URL da planilha está correta
- Certifique-se de que a planilha é pública
- O sistema usará dados de teste automaticamente

### 🐛 **Erro de CORS**
- Hospede os arquivos em um servidor web
- Não abra o arquivo HTML diretamente no navegador

### 🔄 **Sorteio não funciona**
- Verifique se os participantes foram carregados
- Aguarde o carregamento completo da página
- Verifique o console do navegador para erros

### 🖥️ **Layout não aparece corretamente**
- Certifique-se de que o arquivo `sukiyaki-logo.png` está na pasta
- Verifique se todos os arquivos CSS e JS estão carregando
- Teste em diferentes resoluções de tela

## Suporte

Para dúvidas ou problemas:
1. Verifique o console do navegador (F12)
2. Teste com dados de fallback
3. Recarregue a página completamente

## Versão

**Versão**: 2.1 - Layout Otimizado  
**Data**: Julho 2025  
**Evento**: 20ª Festa do Sukiyaki das Lojas Maçônicas de Bertioga  
**Mudanças**: Removido contador de sorteios, logo aumentado e reposicionado, layout de 3 colunas otimizado

