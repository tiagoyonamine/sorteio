# Site de Sorteio - 20ª Festa do Sukiyaki

## Descrição

Site de sorteio simplificado para a 20ª Festa do Sukiyaki das Lojas Maçônicas de Bertioga. O layout foi otimizado para exibição em telão durante eventos, com foco na experiência visual e facilidade de uso.

## Características

### ✨ **Layout Simplificado**
- Design limpo e minimalista inspirado no estilo Apple
- Layout responsivo que se adapta a diferentes tamanhos de tela
- Otimizado para exibição em telão de eventos
- Sem informações de prêmios/patrocinadores para máxima simplicidade

### 📊 **Contadores Inteligentes**
- **Sorteio nº**: Contador automático que incrementa a cada sorteio realizado
- **Participantes**: Número total de participantes carregados da planilha
- Atualizados automaticamente em tempo real

### 🎯 **Funcionalidades**
- Sorteio aleatório com animação de 3 segundos
- Integração automática com planilha do Google Sheets
- Controle por teclado (barra de espaço para sortear)
- Sistema de fallback com dados de teste
- Aleatoriedade criptográfica para máxima imparcialidade

### 🎨 **Design**
- Paleta de cores oficial do evento Sukiyaki
- Logo oficial integrado
- Tipografia moderna e legível
- Animações suaves e profissionais

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
- **Múltiplos sorteios**: O contador incrementa automaticamente

## Funcionalidades Técnicas

### 🔒 **Segurança e Aleatoriedade**
- Utiliza `crypto.getRandomValues()` para aleatoriedade criptográfica
- Algoritmo Fisher-Yates para embaralhamento eficiente
- Fallback para `Math.random()` em navegadores antigos

### 📱 **Responsividade**
- Layout adaptativo para desktop, tablet e mobile
- Otimizado para telas de telão (1920x1080 e superiores)
- Fontes e elementos escaláveis

### 🛠️ **Debugging**

Comandos disponíveis no console do navegador:

```javascript
// Recarregar participantes da planilha
reloadParticipants();

// Resetar contadores
resetCounters();

// Verificar participantes carregados
console.log(participantes);

// Verificar número de sorteios
console.log(drawCount);
```

### ⚡ **Performance**
- Otimizado para mais de 1000 participantes
- Carregamento assíncrono da planilha
- Animações GPU-aceleradas
- Código JavaScript minificado e eficiente

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

## Suporte

Para dúvidas ou problemas:
1. Verifique o console do navegador (F12)
2. Teste com dados de fallback
3. Recarregue a página completamente

## Versão

**Versão**: 2.0 - Layout Simplificado  
**Data**: Julho 2025  
**Evento**: 20ª Festa do Sukiyaki das Lojas Maçônicas de Bertioga

