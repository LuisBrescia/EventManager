/*
? Documentação
carregaElementos() - Função que carrega os elementos na tela
customDrag(elemento) - Função que configura as regras para movimentação do card participante
dragInsumos(elemento) - Função que configura as regras para movimentação do card insumo
fluxoConecta(element) - Função que configura as regras para conexão
excluiConexao(element) - Função que exclui uma conexão em específico
guardaValor(element) - Função que guarda os valores de cada conexão
criaElementoParticipante(element, gapping) - HTML de um elemento participante
criaElementoInsumo(element, gapping) - HTML de um elemento insumo
criaConexao(element) - Criará as conexões que ficam em baixo de um elemento do tipo participante
recalculaValor(idDestino, insumoAlterado) - Função para setar os valores da conexão
*/
// * Pegará as informações da página anterior e salvará as coordenadas dos elementos
function Elemento(_id, titulo, coordenadas, linhas) {
    this._id = _id;
    this.titulo = titulo;
    this.coordenadas = coordenadas;
    this.linhas = linhas;
}
// * Objeto que guardará informações de cada conexão
function Conexao(idOrigem, idDestino, quantidade, medida, insumo) {
    this.idOrigem = idOrigem;
    this.idDestino = idDestino;
    this.quantidade = quantidade;
    this.medida = medida;
    this.insumo = insumo;
}
// * Estilização da linha
var options = {
    size: 5,
    layer: 0,
    endPlug: 'behind',
    startSocket: 'right',
    endSocket: 'left',
    startPlugColor: '#04f',
    endPlugColor: '#08f',
    gradient: true,
    // color: '#04f',
};
var TAM = 6; // * Número de cards que são possíveis de serem criados no momento

var ListasParticipantes = JSON.parse(localStorage.getItem("ListaParticipantes")) || [];
var elementosParticipantes = JSON.parse(localStorage.getItem("elementosParticipantes")) || [];

var ListasInsumos = JSON.parse(localStorage.getItem("ListaInsumos")) || [];
var elementosInsumos = JSON.parse(localStorage.getItem("elementosInsumos")) || [];

var conexoesVisiveis = JSON.parse(localStorage.getItem("conexoesVisiveis"));
var conexoes = JSON.parse(localStorage.getItem("conexoes")) || [];
if (conexoes.length === 0 || conexoes.length !== TAM || conexoes[0].length !== TAM) {
    conexoes = [];
    for (let i = 0; i < TAM; i++) {
        conexoes[i] = [];
        for (let j = 0; j < TAM; j++) {
            conexoes[i][j] = [null, []];
        }
    }
}

// * Botões só estarão disponíveis após o carregamento da página
$(document).ready(() => {

    carregaElementos();
    carregaConexoes();

    if (conexoesVisiveis == null) { conexoesVisiveis = true; }
    for (let i = 0; i < TAM; i++) {
        for (let j = 0; j < TAM; j++) {
            if (conexoes[i][j][0] != null) {
                conexoes[i][j][0].startPlugColor = conexoesVisiveis ? '#04f' : 'aliceblue';
                conexoes[i][j][0].endPlugColor = conexoesVisiveis ? '#08f' : 'aliceblue';
            }
        }
    }
    if (conexoesVisiveis) { // ? Quando página é criada i não tem nenhuma das 2 classes, portanto não é possivel utilizar toggleClass
        $('#visibilidadeFluxo').find('i').addClass('bi-eye-slash').removeClass('bi-eye');
    } else {
        $('#visibilidadeFluxo').find('i').addClass('bi-eye').removeClass('bi-eye-slash');
    }
    $('#visibilidadeFluxo').find('span').text(conexoesVisiveis ? 'Ocultar' : 'Exibir');

    // > Para funcionar tem que ser passado por dentro do card
    $('.select-icon').click(function () {
        $(this).siblings('select').trigger('click');
    });

    // * Organiza a área de trabalho
    $('#dividirFluxo').click(() => {
        for (let i = 0; i < TAM; i++) {
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
    // * Oculta/Exibe LeaderLines
    $('#visibilidadeFluxo').click(() => {
        for (let i = 0; i < TAM; i++) {
            for (let j = 0; j < TAM; j++) {
                if (conexoes[i][j][0] != null) {
                    conexoes[i][j][0].startPlugColor = conexoesVisiveis ? 'aliceblue' : '#04f';
                    conexoes[i][j][0].endPlugColor = conexoesVisiveis ? 'aliceblue' : '#08f';
                }
            }
        }
        $('#visibilidadeFluxo').find('i').toggleClass('bi-eye bi-eye-slash');
        $('#visibilidadeFluxo').find('span').text(conexoesVisiveis ? 'Exibir' : 'Ocultar');
        conexoesVisiveis = !conexoesVisiveis; // Alterna o valor da variável conexoesVisiveis
        localStorage.setItem("conexoesVisiveis", JSON.stringify(conexoesVisiveis));
    });
});
// * Função para carregar os elementos
function carregaElementos() {
    let contP = 0; // ? Para calcular posição onde os elementos serão gerados
    let contI = 0; // ? Para calcular posição onde os elementos serão gerados

    for (let i = 0; i < TAM; i++) {
        if (ListasParticipantes[i] != null) {
            if (elementosParticipantes[i] != null && elementosParticipantes[i].coordenadas != null) { // ? Caso o elemento exista e tenha coordenadas salvas
                elementosParticipantes[i] = new Elemento(ListasParticipantes[i]._id, ListasParticipantes[i].titulo, elementosParticipantes[i].coordenadas, ListasParticipantes[i].linhas);
            } else {
                elementosParticipantes[i] = new Elemento(ListasParticipantes[i]._id, ListasParticipantes[i].titulo, null, ListasParticipantes[i].linhas);
            }
            var elementoParticipanteCarregado = criaElementoParticipante(elementosParticipantes[i], contP++);

            customDrag($(elementoParticipanteCarregado));
            fluxoConecta($(elementoParticipanteCarregado));
            excluiConexao($(elementoParticipanteCarregado));
            adicionaConexao($(elementoParticipanteCarregado));
            guardaValor($(elementoParticipanteCarregado));
            $('section').append(elementoParticipanteCarregado);

        } else { // * Se a conexão já existir, mas o elemento não, apagar conexões onde está envolvido
            for (let j = 0; j < TAM; j++) {
                if (conexoes[i][j][0] != null) {
                    conexoes[i][j] = [null, []];
                }
            }
        }
        if (ListasInsumos[i] != null) {
            if (elementosInsumos[i] != null && elementosInsumos[i].coordenadas != null) {
                elementosInsumos[i] = new Elemento(i, ListasInsumos[i].titulo, elementosInsumos[i].coordenadas, ListasInsumos[i].linhas);
            } else {
                elementosInsumos[i] = new Elemento(i, ListasInsumos[i].titulo, null, ListasInsumos[i].linhas);
            }
            var elementoInsumoCarregado = criaElementoInsumo(elementosInsumos[i], contI++);

            dragInsumos($(elementoInsumoCarregado));
            $('section').append(elementoInsumoCarregado);

        } else { // * Se a conexão já existir, mas o elemento não, apagar conexões onde está envolvido
            for (let j = 0; j < TAM; j++) {
                if (conexoes[j][i][0] != null) {
                    conexoes[j][i] = [null, []];
                }
            }
        }
    }
    localStorage.setItem("conexoes", JSON.stringify(conexoes));
}
// * Função para carregar as conexões
function carregaConexoes() {
    for (let i = 0; i < TAM; i++) {
        for (let j = 0; j < TAM; j++) {
            if (conexoes[i][j][0] != null) { // * Se a conexão existir, cria uma LeaderLine e um objeto do tipo Conexão
                let startEl = document.getElementById(`fluxoConecta-${i}`);
                let endEl = document.getElementById(`fluxoDestino-${j}`);
                conexoes[i][j][0] = new LeaderLine(
                    startEl,
                    endEl,
                    options
                );
                // : Quando a conexão for criada, os parametros dela já deverão existir
                let novaConexao = criaConexao(i, elementosInsumos[j]); // ? criaConexão() retorna o HTML da janelinha azul que fica no elemento participante
                $(`#listaP-${i}`).find('.card-body').append(novaConexao);

                // : Jeito novo
                // : Aqui estarei colocando os inputs do localStorage dentro dos inputs da conexão
                for (let k = 0; k < conexoes[i][j][1].length; k++) {
                    $(novaConexao).find(`#param-${k} input`).val(conexoes[i][j][1][k].quantidade);
                    $(novaConexao).find(`#param-${k} [name="insumo"]`).val(conexoes[i][j][1][k].insumo);
                    recalculaValor(j, conexoes[i][j][1][k]);
                }
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

    // > Aumenta a performance porem está apresentando problemas
    // elemento.find('.draggable').on('mousedown', function () {
    //     let id = $(this).closest('.card-container').attr('id');
    //     let idNumber = parseInt(id.split('-')[1]);
    //     let conexoesElements = []; // Array para armazenar os elementos de conexão
    //     // Preencha o array conexoesElements com os elementos de conexão uma vez
    //     for (let i = 0; i < TAM; i++) {
    //         if (conexoes[idNumber][i][0] != null) {
    //             conexoesElements.push(conexoes[idNumber][i][0]);
    //         }
    //     }
    //     elemento.find(".draggable").on("drag", function () {
    //         for (let i = 0; i < conexoesElements.length; i++) {
    //             conexoesElements[i].position();
    //         }
    //     });
    // });

    elemento.find(".draggable").on("drag", function () {
        let id = $(this).closest('.card-container').attr('id');
        let idNumber = parseInt(id.split('-')[1]);

        for (let i = 0; i < TAM; i++) {
            if (conexoes[idNumber][i][0] != null) {
                conexoes[idNumber][i][0].position();
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
        for (let i = 0; i < TAM; i++) {
            if (conexoes[i][idNumber][0] != null) {
                conexoes[i][idNumber][0].position();
            }
        }

    });
}
// * Função para configurar regras para conexão
function fluxoConecta(element) {
    element.find(".fluxoConecta").mousedown(function () {
        let id = $(this).attr('id');
        let idNumber = parseInt(id.split('-')[1]);

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
        // * Ao mover o mouse, a linha deve acompanhá-lo
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

                if (conexoes[idNumber][idDestinoNumber][0] != null) { // * Toaster
                    $('.toast-body').text('Este elemento já está conectado a este insumo. Burro!');
                    $('.toast').toast('show');
                    linhaMouse.remove();
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                    return;
                }

                let startEl = document.getElementById(`fluxoConecta-${idNumber}`);
                let endEl = document.getElementById(`fluxoDestino-${idDestinoNumber}`);

                // * Após a conexão ser criada, é criada também um objeto do tipo Conexão 
                conexoes[idNumber][idDestinoNumber][0] = new LeaderLine(
                    startEl,
                    endEl,
                    options
                );
                // ? Já que a conexão foi criada agora, não existirá outros parametros  
                conexoes[idNumber][idDestinoNumber][1][0] = new Conexao(idNumber, idDestinoNumber, null, null, null);

                var novaConexao = criaConexao(idNumber, elementosInsumos[idDestinoNumber]);
                $(`#listaP-${idNumber}`).find('.card-body').append(novaConexao);

                // * Salvar a conexão no LocalStorage
                localStorage.setItem("conexoes", JSON.stringify(conexoes));
            }
            console.log('COMO ASSIM????');
            linhaMouse.remove();
            elmpoint.remove();
            $(document).off('mousemove');
            $(document).off('mouseup');
        });
    });
}
// * Cria uma nova funcionalidade em conexão já existente
function adicionaConexao(element) {
    element.find('.card-body').on('click', '.adicionaConexao', function () {
        console.log('Adicionando nova conexão');
        let id = $(this).closest('.card-container').attr('id');
        let idNumber = parseInt(id.split('-')[1]);

        let idConexao = $(this).closest('.conexaoParticipante').attr('id');
        let idDestinoNumber = parseInt(idConexao.split('-')[1]);

        let novaConexao = novoParametro(idNumber, elementosInsumos[idDestinoNumber]);

        $(`#listaP-${idNumber}`).find('#conexaoCom-' + idDestinoNumber).append(novaConexao);

        // Criarei um novo objeto do tipo Conexao e colocarei no array conexoes
        let novaConexaoObjeto = new Conexao(idNumber, idDestinoNumber, null, null, null);
        conexoes[idNumber][idDestinoNumber][1].push(novaConexaoObjeto);

        localStorage.setItem("conexoes", JSON.stringify(conexoes));
    });
}
// * Exclui uma conexão em específico
function excluiConexao(element) {
    element.find('.card-body').on('click', '.excluiConexao', function () {
        let id = $(this).closest('.card-container').attr('id');
        let idNumber = parseInt(id.split('-')[1]);

        let idConexao = $(this).closest('.conexaoParticipante').attr('id');
        let idDestinoNumber = parseInt(idConexao.split('-')[1]);

        conexoes[idNumber][idDestinoNumber][0].remove();
        conexoes[idNumber][idDestinoNumber][0] = null;
        recalculaValor(idDestinoNumber, conexoes[idNumber][idDestinoNumber][1]); // Estou passando um vetor
        conexoes[idNumber][idDestinoNumber][1] = [];

        localStorage.setItem("conexoes", JSON.stringify(conexoes));

        $(this).closest('.conexaoParticipante').remove();
    });
}
// * Função que guarda os valores de cada conexão
function guardaValor(element) {
    // * Salva a quantidade
    element.find('.card-body').on('change', 'input', function () {
        let id = $(this).closest('.card-container').attr('id');
        let idNumber = parseInt(id.split('-')[1]);

        let idConexao = $(this).closest('.conexaoParticipante').attr('id');
        let idDestinoNumber = parseInt(idConexao.split('-')[1]);

        // * Tenho que achar de qual parametro se trata
        let k = $(this).closest('.row').attr('id');
        let idParam = parseInt(k.split('-')[1]);

        console.log(`Valor salvo no parametro ${idParam} da ${id} para o insumo ${idDestinoNumber} como: ${$(this).val()}}`);
        conexoes[idNumber][idDestinoNumber][1][idParam].quantidade = $(this).val();

        localStorage.setItem("conexoes", JSON.stringify(conexoes));

        recalculaValor(idDestinoNumber, conexoes[idNumber][idDestinoNumber][1]);
    });
    // * Salva o insumo selecionado
    element.find('.card-body').on('change', '[name="insumo"]', function () {
        let id = $(this).closest('.card-container').attr('id');
        let idNumber = parseInt(id.split('-')[1]);

        let idConexao = $(this).closest('.conexaoParticipante').attr('id');
        let idDestinoNumber = parseInt(idConexao.split('-')[1]);

        let k = $(this).closest('.row').attr('id');
        let idParam = parseInt(k.split('-')[1]);

        console.log(`Valor salvo no parametro ${idParam} da ${id} para o insumo ${idDestinoNumber} como: ${$(this).val()}}`);
        let antigo = conexoes[idNumber][idDestinoNumber][1];
        conexoes[idNumber][idDestinoNumber][1][idParam].insumo = $(this).val();
        localStorage.setItem("conexoes", JSON.stringify(conexoes));
        recalculaValor(idDestinoNumber, conexoes[idNumber][idDestinoNumber][1]);
        recalculaValor(idDestinoNumber, antigo);
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

    return $(`
    <div id="listaP-${element._id}" class="card-container ms-5" style="${posicao}; z-index: 1; width: 0%;">
        <div class="elementoMovivel draggable card col-3 border-0 overflow-x-hidden shadow-sm" style="min-width: 300px; width: fit-content;">
            <div class="w-100 fs-4 fw-bold text-nowrap d-flex justify-content-between align-items-center" style="width: fit-content;">
                <span class="w-100 py-2 d-flex moverElemento px-3 gap-2 border-0 Papel bg-escuro text-white" style="border-top-left-radius: 3px;">
                    <i class="bi-people-fill">
                        <span class="position-absolute translate-middle badge rounded-pill bg-1 bg-gradient"
                        style="font-size: 9px; top: 10px; left: 10px; font-family: Arial, Helvetica, sans-serif;">
                        ${element.linhas.length}
                        </span>
                    </i>
                    <span class="w-100 text-center">${element.titulo}</span>
                </span>
                <button id="fluxoConecta-${element._id}" class="fluxoConecta py-2 bi-chevron-double-right d-inline-block text-white btn-3 Papel"
                style="border-top-right-radius: 3px;"></button>
            </div>
            <div class="card-body p-0 pt-1 d-flex flex-column gap-1" style="overflow-y: auto;">
            </div>
        </div>
    </div>`);
}
// * HTML de um elemento insumo
function criaElementoInsumo(element, gapping) {
    let posicao = '';
    if (element.coordenadas == null) {
        posicao = 'top: ' + (gapping + 1) + '0%; right: 50%';
    } else {
        posicao = 'top: ' + element.coordenadas[1] + 'px; left: ' + element.coordenadas[0] + 'px';
    }
    let linha = '';
    if (element.linhas.length > 1) {
        for (let i = 0; i < element.linhas.length - 1; i++) {
            // Vou pegar só os 30 primeiros caracteres de cada linha
            let linhaAtual = element.linhas[i].substring(0, 30);
            linha += `
            <span id="${element._id}-${i}" class="shadow-sm bg-white mt-1">
                <button class="py-2 d-inline-block bg-1 border-0 bg-gradient text-white no-shadow quantidadeInsumo">0</button>
                <span class="text-nowrap px-2">${linhaAtual}</span>
            </span>`;
        }
        // ? Úlitma linha
        let linhaAtual = element.linhas[element.linhas.length - 1].substring(0, 30);
        linha += `
            <span id="${element._id}-${element.linhas.length - 1}" class="shadow-sm bg-white mt-1">
                <button class="py-2 d-inline-block border-0 bg-1 bg-gradient text-white no-shadow quantidadeInsumo">0</button>
                <span class="text-nowrap px-2">${linhaAtual}</span>
            </span>`;
    } else {
        linha =
            `<span class="text-center py-2 px-3 shadow-sm bg-white" style="border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;">
            <span class="text-nowrap fs-5">Absoluto</span>
        </span>`;
    }
    return $(`
        <div id="listaI-${element._id}" class="bg-dark insumos-container ms-5" style="${posicao}; z-index: 1; width: 0%;">
            <div class="elementoMovivel draggable card col-3 border-0 overflow-x-hidden shadow bg-escuro">
                <div class="moverElemento Papel bg-escuro fs-4 fw-bold text-nowrap d-flex justify-content-between align-items-center"
                style="border-top-left-radius: 20px; border-top-right-radius: 5px;">
                    <button id="fluxoDestino-${element._id}" class="fluxoDestinoGenerico py-2 bi-diamond d-inline-block text-white btn-3 Papel no-shadow"
                    style="border-top-left-radius: 5px;"></button>
                    <span class="py-2 d-flex px-3 gap-2 ps-4 border-0 w-100">
                        <span class="text-white ms-auto w-100">${element.titulo}</span>
                    </span>
                </div>
                <div class="bg-fundo Cork overflow-auto mx-0 p-0 d-flex flex-column" style="max-height: 400px; min-width:200px; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;">
                    ${linha}
                </div>
            </div>
        </div>`);
}
// * Elemento será uma lista do tipo Insumo
function criaConexao(idP, element) {
    // : Teria que fazer o código abaixo para cada linha da conexao
    let opcoes = '';
    if (element.linhas.length > 1) {
        element.linhas.forEach((linha) => {
            linha = linha.substring(0, 30);
            opcoes += `<option value="${linha}">${linha}</option>`;
        });
    }

    let parametros = '';
    for (let i = 0; i < conexoes[idP][element._id][1].length; i++) {
        // > Os valores serão passados em outra função, não é a pratica mais correta
        parametros += criaParametro(i, opcoes);
    }

    return $(`
    <div id="conexaoCom-${element._id}" class="d-flex flex-column conexaoParticipante">
        <span class="px-2 bg-1 Papel text-white d-flex justify-content-between">
            <i class="adicionaConexao bi-plus-circle position-absolute"></i>
            <span class="mx-auto opacity-0">${element.titulo}</span>
            <span class="position-absolute text-center" style="transform: translateX(-50%); left: 50%;">${element.titulo}</span>
            <i class="excluiConexao bi-trash"></i>
        </span>
        ${parametros}    
    </div>
    `);
}
// * Função que cria o conteúdo HTML do parametro de uma conexão
function criaParametro(i, opcoes) {
    return `
    <div id="param-${i}" class="row m-0 p-0 mt-1 border border-dark border-2">
        <span class="d-flex bg-dark p-0">
            <input class="col-8" type="number" placeholder="Para cada participante...">
            <select class="col-4" name="medida">
                <option selected>Unidade</option>
            </select>
        </span>
        <select name="insumo" class="p-0">
            <option value="">Todos</option>
            ${opcoes}
        </select>
    </div>`;
}
// * Função para setar os valores da conexão
function recalculaValor(idDestino, insumosAlterado) {
    if (elementosInsumos[idDestino].linhas.length == 1) { return; }
    // > Acredito que tenha formas mais simples de fazer isso, revisarei o código caso tenha tempo
    let quantidadeAtual = 0;

    // * Agora, como tenho um vetor de insumos alterados terei que realizar isso para cada um deles
    for (let i = 0; i < insumosAlterado.length; i++) {
        // * Percorre todos as linhas de uma lista Insumos
        elementosInsumos[idDestino].linhas.forEach((linha, index) => {
            console.log("Linha: ", linha, " Insumo:", insumosAlterado[i].insumo);
            if (linha == insumosAlterado[i].insumo) { // * Se o insumo for == a linha, então ele está conectado a esse insumo
                console.log("Opa é o mesmo")
                for (let i = 0; i < TAM; i++) { // * Pegarei todas as conexões á aquele insumo específico
                    if (conexoes[i][idDestino][0] != null) { // * Existe uma conexão entre o elemento i e o elementoInsumo
                        for (let j = 0; j < conexoes[i][idDestino][1].length; j++) { // * Verificarei todos os parametros de determinado elemento
                            if (conexoes[i][idDestino][1][j].insumo == linha) { // * Se este parametro estiver apontando para o determinado insumo
                                quantidadeAtual += conexoes[i][idDestino][1][j].quantidade * elementosParticipantes[i].linhas.length;
                            }
                        }
                    }
                }
                quantidadeAtual = Math.ceil(quantidadeAtual);
                $(`#${idDestino}-${index}`).find('.quantidadeInsumo').text(quantidadeAtual);
                console.log(`Procurado:  #${idDestino}-${index}`);
            }
        });
    }
}
// > Selection estilizado (não finalizado ainda)

// <div id="naoAlteraNada" class="row m-0 p-0 mt-1 border border-dark border-2">
//     <span class="select-wrapper d-flex bg-dark p-0">
//         <input class="col-8" type="number" placeholder="Para cada participante...">
//         <select class="col-4" name="medida">
//             <option selected>Unidade</option>
//         </select>
//     </span>
//     <div class="select-wrapper px-0 d-flex justify-content-between">
//         <select name="insumo" class="ps-3" style="z-index: 1">
//             <option value="">Todos</option>
//             ${opcoes}
//         </select>
//         <i class="select-icon bi-chevron-down m-0 bg-1 text-white Papel px-2" style="z-index: 0"></i>
//     </div>
// </div>
