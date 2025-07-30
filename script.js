// Configurações da planilha do Google Sheets
const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1_foOTolYHT5GByegXm0-0NpalC8mSMxgN15O7lCBgCQ/export?format=csv&gid=87642040';

// Lista de nomes para fallback (caso a planilha não carregue)
const participantesFallback = [
    'JOAQUIM JOSÉ DA SILVA XAVIER',
    'MARIA ANTÔNIA SILVA',
    'JOÃO PEDRO SANTOS',
    'ANA CAROLINA OLIVEIRA',
    'CARLOS EDUARDO LIMA',
    'FERNANDA COSTA ROCHA',
    'GABRIEL ALVES PEREIRA',
    'HELENA MARTINS SOUZA',
    'IGOR PEREIRA NUNES',
    'JULIA FERREIRA GOMES'
];

// Variáveis globais
let participantes = [];
let isDrawing = false;
let animationInterval;
let isLoading = true;
let drawCount = 0;

// Elementos do DOM
const drawButton = document.getElementById('drawButton');
const winnerName = document.getElementById('winnerName');
const drawCounter = document.getElementById('drawCounter');
const participantCounter = document.getElementById('participantCounter');
const statusIndicator = document.getElementById('statusIndicator');

// Função para atualizar os contadores
function updateCounters() {
    drawCounter.textContent = drawCount;
    participantCounter.textContent = participantes.length;
}

// Função para carregar dados da planilha
async function loadParticipants() {
    try {
        console.log('Carregando participantes da planilha...');
        
        // Faz a requisição direta para a planilha
        const response = await fetch(SPREADSHEET_URL);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const csvText = await response.text();
        console.log('CSV carregado com sucesso');
        
        // Processa o CSV e extrai a coluna B (índice 1)
        const lines = csvText.split('\n');
        const names = [];
        
        for (let i = 1; i < lines.length; i++) { // Pula o cabeçalho
            const line = lines[i].trim();
            if (line) {
                // Parse CSV considerando vírgulas dentro de aspas
                const columns = parseCSVLine(line);
                if (columns.length > 1 && columns[1] && columns[1].trim()) {
                    const name = columns[1].trim().replace(/^"|"$/g, ''); // Remove aspas
                    if (name && name !== 'Nome completo') { // Ignora cabeçalho
                        names.push(name.toUpperCase()); // Converte para maiúscula
                    }
                }
            }
        }
        
        if (names.length === 0) {
            throw new Error('Nenhum nome encontrado na planilha');
        }
        
        participantes = names;
        console.log(`Carregados ${participantes.length} participantes da planilha`);
        
        // Atualiza a interface
        updateLoadingState(false);
        updateCounters();
        
    } catch (error) {
        console.error('Erro ao carregar participantes:', error);
        
        // Usa dados de fallback
        participantes = participantesFallback;
        console.log('Usando dados de fallback devido ao erro:', error.message);
        
        // Atualiza a interface
        updateLoadingState(false, true);
        updateCounters();
    }
}

// Função para fazer parse de linha CSV considerando aspas
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current);
    return result;
}

// Função para atualizar o estado de carregamento
function updateLoadingState(loading, isError = false) {
    isLoading = loading;
    
    if (loading) {
        drawButton.textContent = 'CARREGANDO...';
        drawButton.disabled = true;
        drawButton.style.opacity = '0.6';
        winnerName.textContent = 'Carregando participantes...';
        statusIndicator.classList.remove('hidden');
    } else {
        drawButton.textContent = 'INICIAR SORTEIO';
        drawButton.disabled = false;
        drawButton.style.opacity = '1';
        statusIndicator.classList.add('hidden');
        
        if (isError) {
            winnerName.textContent = `Usando dados de teste (${participantes.length} nomes)`;
        } else {
            winnerName.textContent = `${participantes.length} participantes carregados`;
        }
        
        // Após 2 segundos, mostra a mensagem padrão
        setTimeout(() => {
            if (!isDrawing) {
                winnerName.textContent = 'Clique em "INICIAR SORTEIO"';
            }
        }, 2000);
    }
}

// Função para embaralhar array de forma eficiente (Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Função para gerar índice aleatório seguro
function getSecureRandomIndex(max) {
    if (window.crypto && window.crypto.getRandomValues) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] % max;
    } else {
        // Fallback para Math.random()
        return Math.floor(Math.random() * max);
    }
}

// Função para animar o texto do nome durante o sorteio
function animateNameRolling() {
    if (participantes.length === 0) {
        console.error('Nenhum participante carregado');
        return;
    }
    
    // Cria um pool de nomes embaralhados para a animação
    const shuffledNames = shuffleArray(participantes);
    let currentIndex = 0;
    
    winnerName.classList.add('animating');
    
    animationInterval = setInterval(() => {
        winnerName.textContent = shuffledNames[currentIndex];
        currentIndex = (currentIndex + 1) % shuffledNames.length;
    }, 80); // Velocidade otimizada para muitos nomes
}

// Função para parar a animação e mostrar o vencedor
function stopAnimationAndShowWinner() {
    clearInterval(animationInterval);
    
    if (participantes.length === 0) {
        winnerName.textContent = 'Erro: Nenhum participante carregado';
        drawButton.textContent = 'INICIAR SORTEIO';
        drawButton.classList.remove('drawing');
        isDrawing = false;
        return;
    }
    
    // Seleciona um vencedor aleatório usando crypto.getRandomValues para melhor aleatoriedade
    const randomIndex = getSecureRandomIndex(participantes.length);
    const winner = participantes[randomIndex];
    
    // Remove a classe de animação e adiciona a classe de vencedor
    winnerName.classList.remove('animating');
    winnerName.classList.add('winner-announced');
    winnerName.textContent = winner;
    
    // Incrementa o contador de sorteios
    drawCount++;
    updateCounters();
    
    // Remove a classe de vencedor após a animação
    setTimeout(() => {
        winnerName.classList.remove('winner-announced');
    }, 2000);
    
    // Reabilita o botão
    drawButton.classList.remove('drawing');
    drawButton.textContent = 'SORTEAR NOVAMENTE';
    isDrawing = false;
    
    console.log(`Ganhador sorteado: ${winner} (Sorteio #${drawCount})`);
}

// Função principal do sorteio
function performDraw() {
    if (isDrawing || isLoading || participantes.length === 0) {
        if (isLoading) {
            console.log('Aguarde o carregamento dos participantes');
        } else if (participantes.length === 0) {
            console.log('Nenhum participante disponível para sorteio');
        }
        return;
    }
    
    isDrawing = true;
    drawButton.classList.add('drawing');
    drawButton.textContent = 'SORTEANDO...';
    
    // Inicia a animação de rolagem dos nomes
    animateNameRolling();
    
    // Para a animação após 3 segundos e mostra o vencedor
    setTimeout(() => {
        stopAnimationAndShowWinner();
    }, 3000);
}

// Event listeners
drawButton.addEventListener('click', performDraw);

// Função para permitir sorteio via teclado (barra de espaço)
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isDrawing && !isLoading && participantes.length > 0) {
        event.preventDefault();
        performDraw();
    }
});

// Adiciona efeito de hover no botão (apenas quando não está carregando)
drawButton.addEventListener('mouseenter', () => {
    if (!isDrawing && !isLoading) {
        drawButton.style.transform = 'translateY(-2px)';
        drawButton.style.boxShadow = '0 8px 24px rgba(211, 47, 47, 0.4)';
    }
});

drawButton.addEventListener('mouseleave', () => {
    if (!isDrawing && !isLoading) {
        drawButton.style.transform = 'translateY(0)';
        drawButton.style.boxShadow = '0 4px 12px rgba(211, 47, 47, 0.3)';
    }
});

// Função para recarregar participantes (útil para debugging)
function reloadParticipants() {
    console.log('Recarregando participantes...');
    updateLoadingState(true);
    loadParticipants();
}

// Função para resetar contadores (útil para debugging)
function resetCounters() {
    drawCount = 0;
    updateCounters();
    console.log('Contadores resetados');
}

// Expõe funções para o console (debugging)
window.reloadParticipants = reloadParticipants;
window.resetCounters = resetCounters;

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Sistema de sorteio Sukiyaki carregado!');
    
    // Inicializa os contadores
    updateCounters();
    
    // Mostra estado de carregamento
    updateLoadingState(true);
    
    // Carrega participantes da planilha
    await loadParticipants();
    
    console.log('Sistema pronto para uso!');
    console.log(`Total de participantes: ${participantes.length}`);
    
    // Adiciona informações de debug no console
    console.log('Comandos disponíveis:');
    console.log('- reloadParticipants(): Recarrega a lista da planilha');
    console.log('- resetCounters(): Reseta os contadores de sorteio');
    console.log('- Espaço: Iniciar sorteio');
    
    // Expõe variáveis para debugging
    window.participantes = participantes;
    window.drawCount = drawCount;
});

