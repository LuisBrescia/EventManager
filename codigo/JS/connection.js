// > No momento criarei um objeto que conterá apenas coordenadas
function Elemento(coordanadas) {
    this.coordenadas = coordanadas;
}

var elementoParticipantes = [];

customDrag($('.card-container'));

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
            // let cardId = $(this).closest('.card-container').attr('id');
            // let cardNumber = parseInt(cardId.split('-')[1]);
            // todasListas[cardNumber].coordenadas = [$(this).offset().left - 48, $(this).offset().top];
            // localStorage.setItem(ListaTipo, JSON.stringify(todasListas));
            // console.log('Coordenadas salvas no card de ID ' + cardNumber + ' como: ' + todasListas[cardNumber].coordenadas);
        }
    });
}