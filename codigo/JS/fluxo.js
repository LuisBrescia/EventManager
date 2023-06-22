// ? Objeto que salvará conexões de cada elemento
function Elemento(_id, titulo, coordenadas, linhas) {
    this._id = _id;
    this.titulo = titulo;
    this.coordenadas = coordenadas;
    this.linhas = linhas;
}
// ? Estilização da linha
var options = {
    size: 5,
    layer: 0,
    endPlug: 'behind',
    startSocket: 'right',
    endSocket: 'left',
    startPlugColor: '#04f',
    endPlugColor: '#08f',
    gradient: true,
};

var ListasParticipantes = JSON.parse(localStorage.getItem("ListaParticipantes")) || [];
var elementosParticipantes = JSON.parse(localStorage.getItem("elementosParticipantes")) || [];

var ListasInsumos = JSON.parse(localStorage.getItem("ListaInsumos")) || [];
var elementosInsumos = JSON.parse(localStorage.getItem("elementosInsumos")) || [];

// > É possível fazer os 2 apenas com conexão, porém sem tempo para isso agora
var conexoes = JSON.parse(localStorage.getItem("conexoes")) || [];
var valoresConexoes = JSON.parse(localStorage.getItem("valoresConexoes")) || [];

// ! Não sei como funciona
if (conexoes.length === 0 || conexoes.length !== 6 || conexoes[0].length !== 6) {
    conexoes = [];
    for (let i = 0; i < 6; i++) {
        conexoes[i] = [];
        for (let j = 0; j < 6; j++) {
            conexoes[i][j] = null;
        }
    }
}
if (valoresConexoes.length === 0 || valoresConexoes.length !== 6 || valoresConexoes[0].length !== 6) {
    valoresConexoes = [];
    for (let i = 0; i < 6; i++) {
        valoresConexoes[i] = [];
        for (let j = 0; j < 6; j++) {
            valoresConexoes[i][j] = null;
        }
    }
}

// * Botões só estarão disponíveis após o carregamento da página	
$(document).ready(() => {
    carregaElementos();
    carregaConexoes();

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
    // > Apenas para desenvolvimento
    $('#removerConexoes').click(() => {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                if (conexoes[i][j] != null) {
                    conexoes[i][j].remove();
                    conexoes[i][j] = null;
                }
            }
        }
        localStorage.setItem("conexoes", JSON.stringify(conexoes));
    });
});
// * Função para carregar os elementos
function carregaElementos() {

    let contP = 0;
    let contI = 0;

    // * Carrega os participantes
    for (let i = 0; i < 6; i++) {
        if (ListasParticipantes[i] != null) {
            if (elementosParticipantes[i] == null) {
                elementosParticipantes[i] = new Elemento(ListasParticipantes[i]._id, ListasParticipantes[i].titulo, null, null);
            } else {
                elementosParticipantes[i] = new Elemento(ListasParticipantes[i]._id, ListasParticipantes[i].titulo, elementosParticipantes[i].coordenadas, null);
            }
            var elementoParticipanteCarregado = criaElementoParticipante(elementosParticipantes[i], contP++);

            customDrag($(elementoParticipanteCarregado));
            fluxoConecta($(elementoParticipanteCarregado));
            excluiConexao($(elementoParticipanteCarregado));
            guardaValor($(elementoParticipanteCarregado));

            $('section').append(elementoParticipanteCarregado);
        }
        if (ListasInsumos[i] != null) {
            if (elementosInsumos[i] == null) {
                elementosInsumos[i] = new Elemento(i, ListasInsumos[i].titulo, null, ListasInsumos[i].linhas);
            } else {
                elementosInsumos[i] = new Elemento(i, ListasInsumos[i].titulo, elementosInsumos[i].coordenadas, ListasInsumos[i].linhas);
            }
            var elementoInsumoCarregado = criaElementoInsumo(elementosInsumos[i], contI++);
            dragInsumos($(elementoInsumoCarregado));
            $('section').append(elementoInsumoCarregado);
        }
    }
}
// * Função para carregar as conexões
function carregaConexoes() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if (conexoes[i][j] != null) {
                // Criar uma leaderline para cada conexão não nula
                let startEl = document.getElementById(`fluxoConecta-${i}`);
                let endEl = document.getElementById(`fluxoDestino-${j}`);
                conexoes[i][j] = new LeaderLine(
                    LeaderLine.pointAnchor(startEl, {
                        x: 36,
                    }),
                    endEl,
                    options
                );
                // Também criar o HTML da conexão
                var novaConexao = criaConexao(elementosInsumos[j]);
                $(novaConexao).find('input').val(valoresConexoes[i][j]);
                $(`#listaP-${i}`).find('.card-body').append(novaConexao);
            }
        }
    }
}
// * Função para configurar regras para movimentação do card participante
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
        },
    });
    elemento.find(".draggable").on("drag", function () {
        // Pegara a id daquele elemento
        let id = $(this).closest('.card-container').attr('id');
        let idNumber = parseInt(id.split('-')[1]);
        // Atualizar cada uma das conexoes
        for (let i = 0; i < 6; i++) {
            if (conexoes[idNumber][i] != null) {
                conexoes[idNumber][i].position();
            }
        }
    });
}
// * Função para configurar regras para movimentação do card insumo
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
        elemento.find(".draggable").on("drag", function () {

            // * Pegar a id daquele elemento
            let id = $(this).closest('.insumos-container').attr('id');
            let idNumber = parseInt(id.split('-')[1]);

            // * Atualizar cada uma das conexoes
            for (let i = 0; i < 6; i++) {
                if (conexoes[i][idNumber] != null) {
                    conexoes[i][idNumber].position();
                }
            }

        });
}

// * Função para configurar regras para conexão
function fluxoConecta(element) {
    element.find(".fluxoConecta").mousedown(function () {

        let id = $(this).attr('id');
        let idNumber = parseInt(id.split('-')[1]);
        let elemento = elementosParticipantes[idNumber];

        const mouseX = event.clientX + pageXOffset;
        const mouseY = event.clientY + pageYOffset;

        let elmpoint = $(`<div id="elmpoint" style="top: ${mouseY}px; left: ${mouseX}px;"></div>`);
        $('section').append(elmpoint);

        let elmPoint = document.getElementById('elmpoint'); // * Elemento invisisel que acompanha o mouse
        let mouseEl = document.getElementById(`fluxoConecta-${idNumber}`); // * Elemento que foi clicado

        // * Ao clicar no botão, a linha deve ser criada
        let linhaMouse = new LeaderLine(mouseEl, elmPoint, {
            color: '#04f',
            size: 5,
            endPlug: 'disc',
            startSocket: 'right',
            endSocket: 'left',
            startPlugColor: '#04f',
            endPlugColor: '#08f',
            gradient: true
        });

        console.log(`Mousedown no elemento ${elemento.titulo} de ID ${idNumber}`);

        // * Ao mover o mouse, a linha deve acompanhar o mouse
        $(document).mousemove((e) => {
            elmPoint.style.left = `${e.clientX + pageXOffset}px`;
            elmPoint.style.top = `${e.clientY + pageYOffset}px`;
            linhaMouse.position();
        });

        // * Ao soltar o botão, a linha deve ser removida
        $(document).mouseup(function (event) {
            if ($(event.target).is(".fluxoDestinoGenerico")) {
                let idDestino = $(event.target).closest('.insumos-container').attr('id');
                let idDestinoNumber = parseInt(idDestino.split('-')[1]);

                if (conexoes[idNumber][idDestinoNumber] != null) {
                    $('.toast-body').text('Este elemento já está conectado a este insumo. Burro!');
                    $('.toast').toast('show');
                    linhaMouse.remove();
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                    return;
                }

                console.log(`Mouseup em cima de #fluxoDestino ${idDestinoNumber}`);
                console.log(`Linha conectada do elemento ${elementosParticipantes[idNumber].titulo} para o elemento ${elementosInsumos[idDestinoNumber].titulo}`);

                let startEl = document.getElementById(`fluxoConecta-${idNumber}`);
                let endEl = document.getElementById(`fluxoDestino-${idDestinoNumber}`);

                conexoes[idNumber][idDestinoNumber] = new LeaderLine(
                    LeaderLine.pointAnchor(startEl, {
                        x: 36,
                    }),
                    endEl,
                    options
                );

                var novaConexao = criaConexao(elementosInsumos[idDestinoNumber]);
                // $(this).find('.card-body').append(novaConexao);
                $(`#listaP-${idNumber}`).find('.card-body').append(novaConexao);

                console.log(conexoes[idNumber][idDestinoNumber]);
                // * Salvar a conexão no LocalStorage
                localStorage.setItem("conexoes", JSON.stringify(conexoes));
                linhaMouse.remove();
            } else {
                console.log('Elemento solto');
                linhaMouse.remove();
            }
            elmpoint.remove();
            $(document).off('mousemove');
            $(document).off('mouseup');
        });
    });
}
// * Exclui uma conexão em específico
function excluiConexao(element) {
    element.find('.card-body').on('click', '.bi-trash', function () {
        
        let id = $(this).closest('.card-container').attr('id');
        let idNumber = parseInt(id.split('-')[1]);

        let idConexao = $(this).closest('.conexaoParticipante').attr('id');
        let idDestinoNumber = parseInt(idConexao.split('-')[1]);

        conexoes[idNumber][idDestinoNumber].remove();
        conexoes[idNumber][idDestinoNumber] = null;
        localStorage.setItem("conexoes", JSON.stringify(conexoes));
        $(this).closest('.conexaoParticipante').remove();
    });
}
// * Função que guarda o valor aramzenado no input de cada row
function guardaValor(element) {
    element.find('.card-body').on('change', 'input', function () {
        let id = $(this).closest('.card-container').attr('id');
        let idNumber = parseInt(id.split('-')[1]);

        let idConexao = $(this).closest('.row').attr('id');
        let idDestinoNumber = parseInt(idConexao.split('-')[1]);

        console.log('Valor salvo no elemento ' + idNumber + ' para o insumo ' + idDestinoNumber + ' como: ' + $(this).val());

        valoresConexoes[idNumber][idDestinoNumber] = $(this).val();	

        localStorage.setItem("valoresConexoes", JSON.stringify(valoresConexoes));
    });
}

// * HTML de um elemento participante
function criaElementoParticipante(element, gapping) {
    let posicao = '';

    if (element.coordenadas == null) {
        posicao = 'top: ' + (gapping + 1) + '0%';
    } else {
        posicao = 'top: ' + element.coordenadas[1] + 'px; left: ' + element.coordenadas[0] + 'px';
    }
    ;
    return $(`
    <div id="listaP-${element._id}" class="bg-dark card-container ms-5" style="${posicao}; z-index: 1; width: 0%;">
        <div class="elementoMovivel draggable card col-3 border-0 overflow-x-hidden shadow-sm" style="min-width: 300px; width: fit-content;">
            <div class="w-100 fs-4 fw-bold text-nowrap d-flex justify-content-between align-items-center" style="width: fit-content;">
                <span class="w-100 py-2 d-flex moverElemento px-3 gap-2 border-0 bg-escuro Papel text-white" style="border-top-left-radius: 5px;">
                    <i class="bi-people-fill"></i>
                    <span class="w-100 text-center">${element.titulo}</span>
                </span>
                <button id="fluxoConecta-${element._id}" class="fluxoConecta py-2 bi-chevron-double-right d-inline-block text-white btn-3 Papel"
                style="border-top-right-radius: 5px;"></button>
            </div>
            <div class="card-body p-0 pt-1 d-flex flex-column gap-1">
            </div>
        </div>
    </div>`);
}
// * HTML de um elemento insumo
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
                <button class="py-2 d-inline-block bg-1 border-0 bg-gradient text-white no-shadow">15</button>
                <span class="text-nowrap px-2">${linhaAtual}</span>
            </span>`;
        }
        // ? Úlitma linha
        let linhaAtual = element.linhas[element.linhas.length - 1].substring(0, 30);
        linha += `
            <span class="shadow-sm bg-white mt-1" style="border-bottom-left-radius: 10px; border-bottom-right-radius: 5px;">
                <button class="py-2 d-inline-block border-0 bg-1 bg-gradient text-white no-shadow" style="border-bottom-left-radius: 5px;">10</button>
                <span class="text-nowrap px-2">${linhaAtual}</span>
            </span>`;
    } else {
        linha =
            `<span class="text-center py-2 px-3 shadow-sm bg-white" style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
            <span class="text-nowrap fs-5">Absoluto</span>
        </span>`;
    }
    return $(`
        <div id="listaI-${element._id}" class="bg-dark insumos-container ms-5" style="${posicao}; z-index: 1; width: 0%;">
            <div class="elementoMovivel draggable card col-3 border-0 overflow-x-hidden shadow rounded-5">
                <div class="moverElemento Papel bg-escuro fs-4 fw-bold text-nowrap d-flex justify-content-between align-items-center"
                style="border-top-left-radius: 20px; border-top-right-radius: 10px;">
                    <button id="fluxoDestino-${element._id}" class="fluxoDestinoGenerico py-2 bi-diamond d-inline-block text-white btn-3 Papel no-shadow"
                    style="border-top-left-radius: 10px;"></button>
                    <span class="py-2 d-flex px-3 gap-2 ps-4 border-0 w-100">
                        <span class="text-white ms-auto w-100">${element.titulo}</span>
                    </span>
                </div>
                <div class="bg-fundo Cork overflow-auto mx-0 p-0 d-flex flex-column" style="max-height: 400px; min-width:200px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                    ${linha}
                </div>
            </div>
        </div>`);
}
// * Elemento será uma lista do tipo Insumo
function criaConexao(element) {

    let opcoes = '';

    if (element.linhas.length > 1) {
        element.linhas.forEach((linha) => {
            opcoes += `<option value="">${linha}</option>`;
        });
    } else {
        opcoes = `<option value="">Absoluto</option>`;
    }

    return $(`
    <div id="conexaoCom-${element._id}" class="d-flex flex-column conexaoParticipante">
        <span class="px-2 bg-1 Papel text-white d-flex justify-content-between"><span>${element.titulo}</span><i class="excluiConexao bi-trash"></i></span>
        <span class="d-flex bg-dark p-0 ">
            <input class="col-8" type="number">
            <select class="col-4" name="" id="">
                <option selected value="">Unidade</option>
            </select>
        </span>
        <select name="" id="">
            <option selected value="">Todos</option>
            ${opcoes}
        </select>
    </div>
    `);
}

// > Para amanhâ, toda conexão de um elemento deverá ser exibido no próprio elemento, podendo ser personalizado
// > NOME CONEXÃO | INPUT NÚMERICO | UNIDADE - LITROS - QUILOS - PESO - ETC