// ? Objeto do tipo chamado
function Chamado(id, tipo, titulo, valor, categoria, status) {
  this.id = id;
  this.tipo = tipo;
  this.titulo = titulo;
  this.valor = valor;
  this.categoria = categoria;
  this.status = status;
}


// * Primeiramente vou pegar a listaInsumos do localStorage
var ListaInsumos = JSON.parse(localStorage.getItem("ListaInsumos")) || [];
var ListaServicos = JSON.parse(localStorage.getItem("ListaServicos")) || [];

var chamados = JSON.parse(localStorage.getItem("Chamados")) || [];

// Caso chamados não exista no localStorage, criarei um vetor com 12 objetos do tipo Chamado
if (chamados.length == 0) {
  for (let i = 0; i < 12; i++) {
    chamados.push(new Chamado(i, i < 6 ? "Insumo" : "Servico", "Vazio", 0, "1", false));
  }
  console.log(typeof chamados[0].categoria);
  localStorage.setItem("Chamados", JSON.stringify(chamados));
}

var TAM = 6;

$(document).ready(function () {
  carregaBlocos();
});

function carregaBlocos() {
  let bloco;
  for (let i = 0; i < TAM; i++) {
    if (ListaInsumos[i] != null) {
      bloco = blocoChamadoHTML_I(ListaInsumos[i]);
      valorChamado(bloco);
      realizaChamado(bloco);
      $('#items-chamado-I').append(bloco);
      chamados[i].titulo = ListaServicos[i].titulo;
      $(bloco).find(`#valorChamado`).val(chamados[i].valor);
      if (chamados[i].status == true) {
        $(bloco).find('#realizaChamado').text(" Fechar chamado");
        $(bloco).find('#realizaChamado').addClass("bi-wifi-off aberto").removeClass("bi-wifi");
      }
    }
    if (ListaServicos[i] != null) {
      bloco = blocoChamadoHTML_S(ListaServicos[i]);
      valorChamado(bloco);
      realizaChamado(bloco);
      $('#items-chamado-S').append(bloco);

      $(bloco).find(`#valorChamado`).val(chamados[i + 6].valor);
      chamados[i + 6].titulo = ListaServicos[i].titulo;
      // Também vou checar o status
      if (chamados[i + 6].status == true) {
        $(bloco).find('#realizaChamado').text(" Fechar chamado");
        $(bloco).find('#realizaChamado').addClass("bi-wifi-off aberto").removeClass("bi-wifi");
      }
      // $(bloco).find(`[name="categoria"]`).val(chamados[i + 6].categoria);
    }
  }
  
  let qtd = $('#items-chamado-I').children().length - 1;
  let resto = qtd % 3;
  let htmlCaixaTracejada = '';

  if (qtd == 0) {resto = 3;}
  if (qtd == 1) {resto = 2;}
  if (qtd == 2) {resto = 1;}
  if (qtd == 3) {resto = 0;}
  if (qtd == 4) {resto = 2;}
  if (qtd == 5) {resto = 1;}
  if (qtd >= 6) {resto = 0;}

  for (let i = 0; i < resto; i++) {
    htmlCaixaTracejada += '<div class="caixa-tracejada rounded-3"></div>';
  }
  $('#items-chamado-I').append(htmlCaixaTracejada)

  qtd = $('#items-chamado-S').children().length - 1;
  resto = qtd % 3;
  htmlCaixaTracejada = '';

  if (qtd == 0) {resto = 3;}
  if (qtd == 1) {resto = 2;}
  if (qtd == 2) {resto = 1;}
  if (qtd == 3) {resto = 0;}
  if (qtd == 4) {resto = 2;}
  if (qtd == 5) {resto = 1;}
  if (qtd >= 6) {resto = 0;}
  
  for (let i = 0; i < resto; i++) {
    htmlCaixaTracejada += '<div class="caixa-tracejada rounded-3"></div>';
  }
  $('#items-chamado-S').append(htmlCaixaTracejada);
}
// > Futuramente quero que essa funcionalidade seja drag & drop
// * Botão para abrir fechar chamado
function realizaChamado(element) {
  
  if (element == null) {return;}

  element.find('#realizaChamado').click(function () {

    $(this).text($(this).text() == " Fechar chamado" ? " Abrir chamado " : " Fechar chamado");
    $(this).toggleClass("bi-wifi bi-wifi-off aberto");

    console.log($(this).parent().parent().attr('id') + " Mudou seus status");

    // Tenho que pegar o id e setar aquele chamado com true
    let id = $(this).parent().parent().attr('id').split('-')[1];
    chamados[id].status = !chamados[id].status;
    localStorage.setItem("Chamados", JSON.stringify(chamados));
  });
}
// * Sempre que algum atributo é alterado, essa função é chamada
function valorChamado(element) {
  // console.log(typeof chamados[0].categoria);
  if (element == null) {return;}

  // * Valor em dinheiro
  element.find('#valorChamado').change(function () {
    // > Colocar uma máscara e adicionar R$ ao começo
    console.log($(this).parent().parent().parent().attr('id') + " valor: " + $(this).val());
    let id = $(this).parent().parent().parent().attr('id').split('-')[1];
    console.log(typeof chamados[id].valor);
    chamados[id].valor = $(this).val();
    localStorage.setItem("Chamados", JSON.stringify(chamados));
  });
  // * Categoria
  element.find('[name="categoria"]').change(function () {
    // ! Provavelmente está pegando a id errada
    console.log(typeof chamados[0].categoria);
    console.log($(this).parent().parent().parent().attr('id') + " categoria: " + $(this).val());
    let id = $(this).parent().parent().parent().attr('id').split('-')[1];
    console.log(typeof chamados[id].categoria);
    chamados[id].categoria = $(this).val();
    localStorage.setItem("Chamados", JSON.stringify(chamados));
  });
}
// * Carrega os blocos referentes a insumos
function blocoChamadoHTML_I(ListaInsumo) {
  let dicionario = JSON.parse(localStorage.getItem("dicionario-" + ListaInsumo.titulo));
  if (dicionario == null) {return;}
  let conteudo = "";

  Object.keys(dicionario).forEach(chave => {
    if (dicionario[chave] != null && dicionario[chave] > 0) {
      conteudo += `<li class="d-flex list-group-item justify-content-between"><span>${chave}</span><span class="font-monospace">${dicionario[chave]}</span></li>`;
    }
  });

  if (conteudo == "") {return;}
  // conteudo = `<li class="d-flex list-group-item justify-content-between"><span>Crie conexões entre Insumos e Participantes na tela de fluxo.</span></li>`;

  return $(`
    <div id="chamado-${ListaInsumo._id}" class="bloco-chamado text-white p-3 rounded Papel shadow-sm d-flex flex-column">
      <div class="bloco-chamado-header fs-3 fw-bold d-flex justify-content-between">
          <span class="Topography shadow px-3 bg-1 py-2 text-nowrap rounded-3 w-100 text-center mb-3">${ListaInsumo.titulo}</span>
      </div>
      <div class="bloco-chamado-body m-0 p-0 flex-grow-1">
          <ul class="list-group list-unstyled w-100 bg-1 shadow rounded-3 bg-light text-dark mb-3">
              ${conteudo}
          </ul>
      </div>
      <div class="d-flex gap-3 mb-3 justify-content-end">
        <span class="input-group shadow-sm">
            <span class="input-group-text btn-chamado" style="filter: none !important; font-size: 12px;">R$</span>
            <input id="valorChamado" type="number" class="form-control shadow-none" placeholder="Valor do chamado">  
        </span>

        <select class="form-select shadow-sm" aria-label="Default select example">
            <option value="0">Selecione a categoria</option>
            <option value="1">Alimento</option>
            <option value="2">Bebidas</option>
            <option value="3">Ingressos</option>
            <option value="4">Peças</option>
            <option value="5">Ferramentas</option>
            <option value="6">Roupas</option>
            <option value="7">+18</option>
            <option value="8">Outros</option>
        </select>       
      </div>

      <div class="d-flex gap-3 justify-content-end">
        <button id="realizaChamado" class="btn btn-chamado border border-white rounded-5 bi-wifi shadow-sm text-nowrap"> Abrir Chamado </button>
      </div>
    </div>
  `);
}
// * Carrega os blocos referentes a serviços
function blocoChamadoHTML_S(ListaServicos) { // 309 x 340

  if (ListaServicos.linhas == null) {return;}

  let conteudo = "";

  for (let i = 0; i < ListaServicos.linhas.length; i++) {
    conteudo += `<li class="d-flex list-group-item justify-content-between"><span class="text-wrap">${ListaServicos.linhas[i]}</span></li>`;
  }

  if (conteudo == "" || ListaServicos.linhas[0].trim() == "") {
    conteudo = `<li class="d-flex list-group-item justify-content-between"><span>Adicione uma descrição para esse serviço na tela de listas.</span></li>`;
  }

  return $(`
    <div id="chamado-${ListaServicos._id + 6}" class="bloco-chamado text-white p-3 rounded Papel shadow-sm d-flex flex-column">
      <div class="bloco-chamado-header fs-3 fw-bold d-flex justify-content-between">
          <span class="Topography shadow px-3 bg-1 py-2 text-nowrap rounded-3 w-100 text-center mb-3">${ListaServicos.titulo}</span>
      </div>
      <div class="bloco-chamado-body m-0 p-0 flex-grow-1">
          <ul class="list-group list-unstyled w-100 bg-1 shadow rounded-3 bg-light text-dark mb-3">
              ${conteudo}
          </ul>
      </div>
      <div class="d-flex gap-3 mb-3 justify-content-end">
        <span class="input-group shadow-sm">
            <span class="input-group-text btn-chamado" style="filter: none !important; font-size: 12px;">R$</span>
            <input id="valorChamado" type="number" class="form-control shadow-none" placeholder="Valor do chamado">  
        </span>

        <select name="categoria" class="form-select shadow-sm" aria-label="Default select example">
            <option value="0">Selecione a categoria</option>
            <option value="1">Fotógrado</option>
            <option value="2">Designer</option>
            <option value="3">Garçom</option>
            <option value="4">Goleiro</option>
            <option value="4">Motorista</option>
            <option value="4">Faxineiro</option>
            <option value="4">Acompanhante</option>
            <option value="4">Segurança</option>
            <option value="5">+18</option>
            <option value="6">Outros</option>
        </select>
        
      </div>
      <div class="d-flex gap-3 justify-content-end">
        <button id="realizaChamado" class="btn btn-chamado border border-white rounded-5 bi-wifi shadow-sm text-nowrap"> Abrir Chamado </button>
      </div>
    </div>
  `);
}