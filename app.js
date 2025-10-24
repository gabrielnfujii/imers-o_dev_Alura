function pesquisar() {
    // Obtém a seção HTML onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");
    let campoPesquisa = document.getElementById("campo-pesquisa").value
    section.classList.add("resultados");

    // Adiciona feedback visual de carregamento
    section.innerHTML = `<div class="loading">Pesquisando...</div>`;

    // Simula um pequeno delay para melhor experiência do usuário
    setTimeout(() => {
        // se campo pesquisa for uma string sem nada
        if (campoPesquisa == "") {
            section.innerHTML = `<p class="mensagem-erro">Por favor, digite algo para pesquisar.</p>`;
            return
        }
    
        campoPesquisa = campoPesquisa.toLowerCase()
    
        // Inicializa uma string vazia para armazenar os resultados
        let resultados = "";
        let titulo = "";
        let descricao = "";
        let encontrados = 0;
    
        // Itera sobre cada dado da pesquisa
        for (let dado of dados) {
            titulo = dado.titulo.toLocaleLowerCase()
            descricao = dado.descricao.toLocaleLowerCase()
            // se titulo includes campoPesquisa
            if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa)) {
                encontrados++;
                // Cria o HTML para um item de resultado
                resultados += `
                    <div class="item-resultado">
                        <h2>
                            <a href="#" target="_blank">${dado.titulo}</a>
                        </h2>
                        <p class="descricao-meta">${dado.descricao}</p>
                        <a href="${dado.link}" target="_blank" class="botao-info">
                            <span>Mais informações</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </a>
                    </div>
                `;
            }
        }
    
        // Adiciona contador de resultados
        const contador = encontrados > 0 
            ? `<p class="contador-resultados">${encontrados} resultado(s) encontrado(s)</p>`
            : '';
    
        // Atualiza o conteúdo da seção com os resultados
        section.innerHTML = contador + (resultados || `<p class="mensagem-erro">Nenhum resultado encontrado para "${campoPesquisa}".</p>`);
    }, 500); // Delay de 500ms
}

// Adiciona evento de tecla Enter no campo de pesquisa
document.getElementById("campo-pesquisa").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        pesquisar();
    }
});
  
// console.log(dados);
  
if (typeof module !== 'undefined' && module.exports) {
  module.exports = pesquisar;
}
  
