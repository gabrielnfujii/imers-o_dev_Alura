function pesquisar() {
  // Obtém a seção HTML onde os resultados serão exibidos
  let section = document.getElementById("resultados-pesquisa");
  let campoPesquisa = document.getElementById("campo-pesquisa").value
  section.classList.add("resultados"); // Adiciona classe para estilização


  // se campo pesquisa for uma string sem nada
  if (campoPesquisa == "") {
    section.innerHTML = `<p>Por favor, digite algo para pesquisar.</p>`;;
    return
  }

  campoPesquisa = campoPesquisa.toLowerCase()

  // Inicializa uma string vazia para armazenar os resultados
  let resultados = "";
  let titulo = "";
  let descricao = "";

  // Itera sobre cada dado da pesquisa
  for (let dado of dados) {
    titulo = dado.titulo.toLocaleLowerCase()
    descricao = dado.descricao.toLocaleLowerCase()
    // se titulo includes campoPesquisa
    if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa)) {
      // Cria o HTML para um item de resultado
      resultados += `
          <div class="item-resultado">
            <h2>
              <a href="#" target="_blank">${dado.titulo}</a>
            </h2>
            <p class="descricao-meta">${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Mais informações</a>
          </div>
        `;
    }
  }
  // Atualiza o conteúdo da seção com os resultados
  section.innerHTML = resultados || `<p>Nenhum resultado encontrado para "${campoPesquisa}".</p>`;
}

// console.log(dados);


