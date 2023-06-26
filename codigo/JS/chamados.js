// * Primeiramente vou pegar a listaInsumos do localStorage
var ListaInsumos = JSON.parse(localStorage.getItem("ListaInsumos")) || [];
var novoBloco;

$(document).ready(function () {
    carregaBlocos();
    console.log("chamados.js carregado");
});


function carregaBlocos() {
    for (let i = 0; i < ListaInsumos.length; i++) {
        novoBloco = blocoChamadoHTML(ListaInsumos[i]);
        $('#items-chamado').append(novoBloco);
    }
}

function blocoChamadoHTML(ListaInsumo) {
    let dicionario = JSON.parse(localStorage.getItem("dicionario-" + ListaInsumo.titulo));
    if (dicionario == null) {
        console.log("dicionario não encontrado");
        return;}
    let conteudo = "";

    Object.keys(dicionario).forEach(chave => {
      if (dicionario[chave] != null && dicionario[chave] > 0) {
        conteudo += `<li class="d-flex list-group-item justify-content-between"><span>${chave}</span><span class="font-monospace">${dicionario[chave]}</span></li>`;
      }
    });

    if (conteudo == "") {
      // conteudo = `<li class="d-flex list-group-item justify-content-between"><span>Crie conexões entre Insumos e Participantes na tela de fluxo.</span></li>`;
      return;
    }

    return $(`
        <div class="bloco-chamado text-white py-2 px-3 rounded Papel shadow-sm">
          <div class="bloco-chamado-header fs-3 fw-bold d-flex justify-content-between">
            <span class="Topography shadow px-3 bg-1 py-2 text-nowrap rounded-3 w-100 text-center">${ListaInsumo.titulo}</span>
          </div>
          <div class="bloco-chamado-body h-100 d-flex align-items-center pb-4">
            <ul class="list-group list-unstyled w-100 bg-1 shadow rounded-3 bg-light text-dark mb-2">
            ${conteudo}
            </ul>
          </div>
        </div>
    `);
}