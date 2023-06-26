// * Primeiramente vou pegar a listaInsumos do localStorage
var ListaInsumos = JSON.parse(localStorage.getItem("ListaInsumos")) || [];
var ListaServicos = JSON.parse(localStorage.getItem("ListaServicos")) || [];

var TAM = 6;

$(document).ready(function () {
  carregaBlocos();
});

function carregaBlocos() {
  let bloco;
  for (let i = 0; i < TAM; i++) {
    if (ListaInsumos[i] != null) {
      bloco = blocoChamadoHTML_I(ListaInsumos[i]);
      $('#items-chamado-I').append(bloco);
    }
    if (ListaServicos[i] != null) {
      bloco = blocoChamadoHTML_S(ListaServicos[i]);
      $('#items-chamado-S').append(bloco);
    }
  }

  let qtd = $('#items-chamado-I').children().length;
  let htmlCaixaTracejada = '';

  for (let i = 0; i < 4 - qtd; i++) {
    htmlCaixaTracejada += '<div class="caixa-tracejada rounded-3"></div>';
  }
  $('#items-chamado-I').append(htmlCaixaTracejada)

  qtd = $('#items-chamado-S').children().length;
  htmlCaixaTracejada = '';

  for (let i = 0; i < 4 - qtd; i++) {
    htmlCaixaTracejada += '<div class="caixa-tracejada rounded-3"></div>';
  }
  $('#items-chamado-S').append(htmlCaixaTracejada)

}

// * Carrega os blocos referentes a insumos
function blocoChamadoHTML_I(ListaInsumo) {
  let dicionario = JSON.parse(localStorage.getItem("dicionario-" + ListaInsumo.titulo));
  if (dicionario == null) {
    console.log("dicionario não encontrado");
    return;
  }
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
    <div class="bloco-chamado text-white p-3 rounded Papel shadow-sm d-flex flex-column">
      <div class="bloco-chamado-header fs-3 fw-bold d-flex justify-content-between">
          <span class="Topography shadow px-3 bg-1 py-2 text-nowrap rounded-3 w-100 text-center mb-3">${ListaInsumo.titulo}</span>
      </div>
      <div class="bloco-chamado-body m-0 p-0 flex-grow-1">
          <ul class="list-group list-unstyled w-100 bg-1 shadow rounded-3 bg-light text-dark mb-3">
              ${conteudo}
          </ul>
      </div>
      <div class="d-flex gap-3 justify-content-end">
          <button class="btn btn-escuro border border-white text-white rounded-5">Abrir Chamado</button>
      </div>
    </div>
  `);
}
// * Carrega os blocos referentes a serviços
function blocoChamadoHTML_S(ListaServicos) { // 309 x 340

  if (ListaServicos.linhas == null) {
    console.log("Não encontrado");
    return;
  }

  let conteudo = "";

  for (let i = 0; i < ListaServicos.linhas.length; i++) {
    conteudo += `<li class="d-flex list-group-item justify-content-between"><span class="text-wrap">${ListaServicos.linhas[i]}</span></li>`;
  }

  if (conteudo == "" || ListaServicos.linhas[0].trim() == "") {
    conteudo = `<li class="d-flex list-group-item justify-content-between"><span>Adicione uma descrição para esse serviço na tela de listas.</span></li>`;
  }

  return $(`
    <div class="bloco-chamado text-white p-3 rounded Papel shadow-sm d-flex flex-column">
      <div class="bloco-chamado-header fs-3 fw-bold d-flex justify-content-between">
          <span class="Topography shadow px-3 bg-1 py-2 text-nowrap rounded-3 w-100 text-center mb-3">${ListaServicos.titulo}</span>
      </div>
      <div class="bloco-chamado-body m-0 p-0 flex-grow-1">
          <ul class="list-group list-unstyled w-100 bg-1 shadow rounded-3 bg-light text-dark mb-3">
              ${conteudo}
          </ul>
      </div>
      <div class="d-flex gap-3 justify-content-end">
          <button class="btn btn-escuro border border-white text-white rounded-5">Abrir Chamado</button>
      </div>
    </div>
  `);
}