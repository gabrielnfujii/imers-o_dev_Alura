function normalizarTexto(texto) {
    return texto
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

function criarLinkTitulo(titulo) {
    const tituloElemento = document.createElement('h2');
    const linkTitulo = document.createElement('a');

    linkTitulo.href = '#';
    linkTitulo.target = '_blank';
    linkTitulo.rel = 'noopener noreferrer';
    linkTitulo.textContent = titulo;

    tituloElemento.appendChild(linkTitulo);
    return tituloElemento;
}

function criarBotaoInfo(link) {
    const botao = document.createElement('a');
    botao.href = link;
    botao.target = '_blank';
    botao.rel = 'noopener noreferrer';
    botao.className = 'botao-info';

    const texto = document.createElement('span');
    texto.textContent = 'Mais informações';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('viewBox', '0 0 16 16');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('d', 'M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z');

    svg.appendChild(path);
    botao.append(texto, svg);

    return botao;
}

function renderizarResultados(section, resultadosEncontrados, termoPesquisado) {
    section.innerHTML = '';

    if (resultadosEncontrados.length > 0) {
        const contador = document.createElement('p');
        contador.className = 'contador-resultados';
        contador.textContent = `${resultadosEncontrados.length} resultado(s) encontrado(s)`;
        section.appendChild(contador);

        resultadosEncontrados.forEach((dado) => {
            const item = document.createElement('div');
            item.className = 'item-resultado';

            const descricao = document.createElement('p');
            descricao.className = 'descricao-meta';
            descricao.textContent = dado.descricao;

            item.appendChild(criarLinkTitulo(dado.titulo));
            item.appendChild(descricao);
            item.appendChild(criarBotaoInfo(dado.link));
            section.appendChild(item);
        });

        return;
    }

    const mensagem = document.createElement('p');
    mensagem.className = 'mensagem-erro';
    mensagem.textContent = `Nenhum resultado encontrado para "${termoPesquisado}".`;
    section.appendChild(mensagem);
}

function pesquisar() {
    const section = document.getElementById('resultados-pesquisa');
    const campoPesquisaElement = document.getElementById('campo-pesquisa');
    const campoPesquisa = normalizarTexto(campoPesquisaElement.value);

    section.innerHTML = '<div class="loading">Pesquisando...</div>';

    setTimeout(() => {
        if (!campoPesquisa) {
            section.innerHTML = '<p class="mensagem-erro">Por favor, digite algo para pesquisar.</p>';
            return;
        }

        const resultadosEncontrados = dados.filter((dado) => {
            const titulo = normalizarTexto(dado.titulo);
            const descricao = normalizarTexto(dado.descricao);
            return titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa);
        });

        renderizarResultados(section, resultadosEncontrados, campoPesquisaElement.value.trim());
    }, 500);
}

const campoPesquisa = document.getElementById('campo-pesquisa');
const formPesquisa = document.getElementById('form-pesquisa');

formPesquisa.addEventListener('submit', (event) => {
    event.preventDefault();
    pesquisar();
});

campoPesquisa.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        pesquisar();
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { pesquisar, normalizarTexto };
}
