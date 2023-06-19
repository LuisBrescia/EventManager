// > No momento criarei um objeto que conterá apenas coordenadas
function Elemento(_id, titulo, coordenadas) {
    this._id = _id;
    this.titulo = titulo;
    this.coordenadas = coordenadas;
}
// Primeiramente, pegarei os elementos do LocalStorage
var ListasParticipantes = JSON.parse(localStorage.getItem("ListaParticipantes")) || [];
var elementosParticipantes = JSON.parse(localStorage.getItem("elementosParticipantes")) || [];

// Fazer o mesmo para insumos 
var ListasInsumos = JSON.parse(localStorage.getItem("ListaInsumos")) || [];
var elementosInsumos = JSON.parse(localStorage.getItem("elementosInsumos")) || [];

// > A variável titulo será de uma página, e a variavel coordenada, de outra

let cont = 0;

// * Carrega os participantes
for (let i = 0; i < 6; i++) {

    if (ListasParticipantes[i] != null) {

        if(elementosParticipantes[i] == null){
            elementosParticipantes[i] = new Elemento(i, ListasParticipantes[i].titulo, null);
        }else{
            elementosParticipantes[i] = new Elemento(i, ListasParticipantes[i].titulo, elementosParticipantes[i].coordenadas);
        }

        var elementoParticipanteCarregado = criaElementoParticipante(elementosParticipantes[i], cont++);
        $('section').append(elementoParticipanteCarregado);

    }
}

cont = 0;

// * Carrega os insumos
for (let i = 0; i < 6; i++) {

    if (ListasInsumos[i] != null) {

        if(elementosInsumos[i] == null){
            elementosInsumos[i] = new Elemento(i, ListasInsumos[i].titulo, null);
        }else{
            elementosInsumos[i] = new Elemento(i, ListasInsumos[i].titulo, elementosInsumos[i].coordenadas);
        }

        var elementoInsumoCarregado = criaElementoInsumo(elementosInsumos[i], cont++);
        // > Problema pode estar aqui
        $('section').append(elementoInsumoCarregado);
    }

}

customDrag($('.card-container'));
dragInsumos($('.insumos-container'));

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
                <button class="py-2 bi-chevron-double-right d-inline-block text-white btn-3 Papel rounded-1"></button>
            </div>
        </div>
    </div>`);
}

function criaElementoInsumo(element, gapping) {

    let posicao = '';

    if (element.coordenadas == null) {
        // posicao = 'top: ' + (gaping + 1) + '0%; left: 40%';
        posicao = 'top: ' + (gapping + 1) + '0%';
    } else {
        posicao = 'top: ' + element.coordenadas[1] + 'px; left: ' + element.coordenadas[0] + 'px';
    }

    return $(`
        <div id="listaI-${element._id}" class="bg-dark insumos-container ms-5" style="${posicao}; z-index: 0; width: 0%;">
            <div class="elementoMovivel draggable card col-3 border-0 overflow-x-hidden shadow">
                <div class="fs-4 fw-bold text-nowrap d-flex justify-content-between align-items-center">
                    <button class="py-2 bi-diamond d-inline-block text-white btn-3 Papel rounded-1"></button>
                    <span class="py-2 d-flex moverElemento px-3 gap-2 border-0">
                        <i class="bi-wallet-fill"></i>
                        <span class="">${element.titulo}</span>
                    </span>
                </div>
            </div>
        </div>`);
}