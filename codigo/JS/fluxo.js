// > No momento criarei um objeto que conterá apenas coordenadas
function Elemento(_id, titulo, coordenadas, linhas) {
    this._id = _id;
    this.titulo = titulo;
    this.coordenadas = coordenadas;
    this.linhas = linhas;
}
// Primeiramente, pegarei os elementos do LocalStorage
var ListasParticipantes = JSON.parse(localStorage.getItem("ListaParticipantes")) || [];
var elementosParticipantes = JSON.parse(localStorage.getItem("elementosParticipantes")) || [];

// Fazer o mesmo para insumos 
var ListasInsumos = JSON.parse(localStorage.getItem("ListaInsumos")) || [];
var elementosInsumos = JSON.parse(localStorage.getItem("elementosInsumos")) || [];

// > A variável titulo será de uma página, e a variavel coordenada, de outra
console.log("Fluxo");

function carregaElementos() {

    let contP = 0;
    let contI = 0;

    // * Carrega os participantes
    for (let i = 0; i < 6; i++) {
        if (ListasParticipantes[i] != null) {
            if (elementosParticipantes[i] == null) {
                elementosParticipantes[i] = new Elemento(i, ListasParticipantes[i].titulo, null, null);
            } else {
                elementosParticipantes[i] = new Elemento(i, ListasParticipantes[i].titulo, elementosParticipantes[i].coordenadas, null);
            }
            var elementoParticipanteCarregado = criaElementoParticipante(elementosParticipantes[i], contP++);
            $('section').append(elementoParticipanteCarregado);
        }
        if (ListasInsumos[i] != null) {
            if (elementosInsumos[i] == null) {
                elementosInsumos[i] = new Elemento(i, ListasInsumos[i].titulo, null, ListasInsumos[i].linhas);
            } else {
                elementosInsumos[i] = new Elemento(i, ListasInsumos[i].titulo, elementosInsumos[i].coordenadas, ListasInsumos[i].linhas);
            }
            var elementoInsumoCarregado = criaElementoInsumo(elementosInsumos[i], contI++);
            $('section').append(elementoInsumoCarregado);
        }
    }
    customDrag($('.card-container'));
    dragInsumos($('.insumos-container'));
}

$(document).ready(() => {
    carregaElementos();
    console.log("ola");
    $('#dividirFluxo').click(() => {
        for (let i = 0; i < 6; i++) {
            if (elementosParticipantes[i] != null) {
                elementosParticipantes[i].coordenadas = null;
            }
            if (elementosInsumos[i] != null) {
                elementosInsumos[i].coordenadas = null;
            }
        }
        localStorage.setItem("elementosParticipantes", JSON.stringify(elementosParticipantes));
        localStorage.setItem("elementosInsumos", JSON.stringify(elementosInsumos));
        location.reload(); // ? Se fosse utilizar a função de carregar elementos, teria que apagar os elementos já existentes
    });

    // ! Código da linha
   
    // ! Termina código da linha
});

// * Função para configurar regras para movimentação do card
function customDrag(elemento) {
    elemento.find(".draggable").draggable({
        containment: "section",
        scroll: false,
        snap: false,
        stack: ".draggable",
        cursor: "grabbing",
        handle: ".moverElemento",
        stop: function () { // * Executado sempre que o card é solto
            let cardId = $(this).closest('.card-container').attr('id');
            let cardNumber = parseInt(cardId.split('-')[1]);
            elementosParticipantes[cardNumber].coordenadas = [$(this).offset().left - 48, $(this).offset().top];
            localStorage.setItem("elementosParticipantes", JSON.stringify(elementosParticipantes));
            console.log('Coordenadas salvas no elemento PARTICIPANTE de ID ' + cardNumber + ' como: ' + elementosParticipantes[cardNumber].coordenadas);
        }
    });
}
function dragInsumos(elemento) {
    elemento.find(".draggable").draggable({
        containment: "section",
        scroll: false,
        snap: false,
        stack: ".draggable",
        cursor: "grabbing",
        handle: ".moverElemento",
        stop: function () { // * Executado sempre que o card é solto
            let cardId = $(this).closest('.insumos-container').attr('id');
            let cardNumber = parseInt(cardId.split('-')[1]);
            elementosInsumos[cardNumber].coordenadas = [$(this).offset().left - 48, $(this).offset().top];
            localStorage.setItem("elementosInsumos", JSON.stringify(elementosInsumos));
            console.log('Coordenadas salvas no elemento INSUMO de ID ' + cardNumber + ' como: ' + elementosInsumos[cardNumber].coordenadas);
        }
    });
}

function criaElementoParticipante(element, gapping) {

    let posicao = '';

    if (element.coordenadas == null) {
        posicao = 'top: ' + (gapping + 1) + '0%';
    } else {
        posicao = 'top: ' + element.coordenadas[1] + 'px; left: ' + element.coordenadas[0] + 'px';
    }

    return $(`
    <div id="listaP-${element._id}" class="bg-dark card-container ms-5" style="${posicao}; z-index: 0; width: 0%;">
        <div class="elementoMovivel draggable card col-3 border-0 overflow-x-hidden shadow-sm">
            <div class="fs-4 fw-bold text-nowrap d-flex justify-content-between align-items-center">
                <span class="py-2 d-flex moverElemento px-3 gap-2 border-0">
                    <i class="bi-people-fill"></i>
                    <span class="">${element.titulo}</span>
                </span>
                <button id="fluxoConecta" class="fluxoConecta py-2 bi-chevron-double-right d-inline-block text-white btn-3 Papel"
                style="border-top-right-radius: 5px; border-bottom-right-radius: 5px;"></button>
                <div id="linha"></div>
            </div>
        </div>
    </div>`);
}

function criaElementoInsumo(element, gapping) {

    let posicao = '';

    // > Quando um elemento é removido em card movível tenho também que remover as coordenadas dele aqui

    if (element.coordenadas == null) {
        posicao = 'top: ' + (gapping + 1) + '0%; right: 50%';
    } else {
        posicao = 'top: ' + element.coordenadas[1] + 'px; left: ' + element.coordenadas[0] + 'px';
    }

    let linha = '';

    // Se o elemento tiver apenas 1 linha, retirar todos os caracteres de espaço e verificar se sobrou alguma coisa
    if (element.linhas.length > 1) {
        for (let i = 0; i < element.linhas.length - 1; i++) {

        // Vou pegar só os 30 primeiros caracteres de cada linha
        let linhaAtual = element.linhas[i].substring(0, 30);

            linha += `
            <span class="shadow-sm bg-white mt-1">
                <button class="py-2 bi-record-circle d-inline-block text-white btn-3 Diagonal no-shadow"></button>
                <span class="text-nowrap px-2">${linhaAtual}</span>
            </span>`;
        }
        // ? Úlitma linha
        let linhaAtual = element.linhas[element.linhas.length - 1].substring(0, 30);
        linha += `
            <span class="shadow-sm bg-white mt-1" style="border-bottom-left-radius: 10px; border-bottom-right-radius: 5px;">
                <button class="py-2 bi-record-circle d-inline-block text-white btn-3 Diagonal no-shadow" style="border-bottom-left-radius: 5px;"></button>
                <span class="text-nowrap px-2">${linhaAtual}</span>
            </span>`;
    } else {
        linha = 
        `<span class="text-center py-2 px-3 shadow-sm bg-white" style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
            <span class="text-nowrap fs-5">Absoluto</span>
        </span>`;
    }

    return $(`
        <div id="listaI-${element._id}" class="bg-dark insumos-container ms-5" style="${posicao}; z-index: 0; width: 0%;">
            <div class="elementoMovivel draggable card col-3 border-0 overflow-x-hidden shadow rounded-5">
                <div class="moverElemento Papel bg-escuro fs-4 fw-bold text-nowrap d-flex justify-content-between align-items-center"
                style="border-top-left-radius: 20px; border-top-right-radius: 10px;">
                    <button class="py-2 bi-diamond d-inline-block text-white btn-3 Papel  no-shadow"
                    style="border-top-left-radius: 10px;"></button>
                    <span class="py-2 d-flex px-3 gap-2 border-0 w-100">
                        <span class="text-white">${element.titulo}</span>
                    </span>
                </div>
                <div class="bg-fundo Cork overflow-auto mx-0 p-0 d-flex flex-column" style="max-height: 500px">
                    ${linha}
                </div>
            </div>
        </div>`);
}
//  <i class="bi-wallet-fill"></i>
//<ul class="list-group list-group-flush mx-0 px-0">
//    ${linha}
//</ul>