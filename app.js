let currentFilter = 'all';
let currentSort = 'relevance';
let filteredData = [...playersData];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    createBackgroundAnimation();
    displayResults(playersData);
    
    // Event listener para busca em tempo real
    document.getElementById('searchInput').addEventListener('input', debounce(performSearch, 300));
    
    // Event listener para Enter
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});

// Criar animação de fundo
function createBackgroundAnimation() {
    const container = document.getElementById('bgAnimation');
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 6 + 's';
        element.style.animationDuration = (4 + Math.random() * 4) + 's';
        container.appendChild(element);
    }
}

// Debounce para otimizar a busca em tempo real
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Função principal de busca
function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsGrid = document.getElementById('resultsGrid');
    const resultsHeader = document.getElementById('resultsHeader');

    // Mostrar loading
    showLoading();

    setTimeout(() => {
        let results = [...playersData];

        // Aplicar filtros
        if (currentFilter !== 'all') {
            results = results.filter(player => player.region === currentFilter);
        }

        // Aplicar busca
        if (query) {
            results = results.filter(player => 
                player.name.toLowerCase().includes(query) ||
                player.team.toLowerCase().includes(query) ||
                player.description.toLowerCase().includes(query) ||
                player.role.toLowerCase().includes(query)
            );
        }

        // Ordenar resultados
        sortPlayerData(results, currentSort);

        filteredData = results;
        displayResults(results);

        if (results.length > 0) {
            resultsHeader.style.display = 'flex';
        } else {
            resultsHeader.style.display = 'none';
        }
    }, 500);
}

// Mostrar loading
function showLoading() {
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = `
        <div class="loading" style="grid-column: 1 / -1;">
            <div class="loading-spinner"></div>
            <p>Buscando jogadores...</p>
        </div>
    `;
}

// Exibir resultados
function displayResults(results) {
    const resultsGrid = document.getElementById('resultsGrid');
    const resultsCount = document.getElementById('resultsCount');

    if (results.length === 0) {
        resultsGrid.innerHTML = `
            <div class="message empty" style="grid-column: 1 / -1;">
                <h3>Nenhum jogador encontrado</h3>
                <p>Tente ajustar os filtros ou termo de busca</p>
            </div>
        `;
        resultsCount.textContent = '';
        return;
    }

    resultsCount.textContent = `${results.length} jogador(es) encontrado(s)`;

    resultsGrid.innerHTML = results.map(player => `
        <div class="player-card">
            <div class="player-info">
                <h3 class="player-name">${player.name}</h3>
                <span class="player-region">${getRegionName(player.region)} • ${player.team}</span>
                <p class="player-description">${player.description}</p>
            </div>
            
            <div class="player-stats">
                <div class="stat-item">
                    <span class="stat-value">${player.rating}</span>
                    <span class="stat-label">Rating</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${player.achievements.length}</span>
                    <span class="stat-label">Títulos</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${player.role}</span>
                    <span class="stat-label">Função</span>
                </div>
            </div>
            
            <a href="${player.link}" target="_blank" class="player-link">
                <span>Ver Perfil</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
            </a>
        </div>
    `).join('');
}

// Filtrar por região
function filterByRegion(region) {
    currentFilter = region;
    
    // Atualizar botões ativos
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    performSearch();
}

// Ordenar resultados
function sortResults(sortType) {
    currentSort = sortType;
    
    // Atualizar botões ativos
    document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    sortPlayerData(filteredData, sortType);
    displayResults(filteredData);
}

// Função de ordenação
function sortPlayerData(data, sortType) {
    switch (sortType) {
        case 'name':
            data.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating':
            data.sort((a, b) => b.rating - a.rating);
            break;
        case 'relevance':
        default:
            // Manter ordem original ou por relevância
            break;
    }
}

// Obter nome da região
function getRegionName(region) {
    const regions = {
        'BR': 'Brasil',
        'NA': 'América do Norte',
        'LATAM': 'América Latina',
        'EU': 'Europa'
    };
    return regions[region] || region;
}