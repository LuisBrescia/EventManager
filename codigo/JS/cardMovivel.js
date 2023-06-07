// ? Mesmo não havendo caracteres menores que 2.5 pixels, é bom definir uma margem de segurança
// ? Seria possível colocar infinitos caracteres de largura 0
// ? estéticamente não teria efeito algum, porém travaria o programa

// * Objeto que guarda as informações de cada card (Objeto do tipo Lista)
function Lista(_id, titulo, linhas, coordenadas) {
    this._id = _id;
    this.titulo = titulo;
    this.linhas = linhas;
    this.coordenadas = coordenadas;
}
var maxWidth = 250;    // * Máximo de pixels permitidos no título
var maxLength = 100;    // * Máximo de caracteres permitidos no título
const TAM = 6;      // * Quantidade de cards que será possível adicionar

var vetor = Array(TAM).fill(true); // * True = Disponível, False = Ocupado
var matriz = Array(3).fill(Array(TAM).fill(true));
console.log(matriz);
// * Pegará do local Storage para deixar salvo quando a página recarregar
var ListaTipo = localStorage.getItem("ultimaLista");
if (ListaTipo == null) {
    ListaTipo = "ListaParticipantes";
}
var position = 0;
var todasListas = [];

if (ListaTipo === "ListaParticipantes") {
    $('#tipoLista').find('i').removeClass('bi-cash-stack bi-briefcase').addClass('bi-people');
    $('#tipoLista').find('span').text('Participantes');
    // $('.trocaTipo').css('color', '#0ff');
    $('.listaParticipantes').addClass('active');
    $('.listaInsumos, .listaServicos').removeClass('active');
    position = 0;
    carregaCards();
}
if (ListaTipo === "ListaInsumos") {
    $('#tipoLista').find('i').removeClass('bi-people bi-briefcase').addClass('bi-cash-stack');
    $('#tipoLista').find('span').text('Insumos');
    // $('.trocaTipo').css('color', '#fd6cfd');
    $('.listaInsumos').addClass('active');
    $('.listaParticipantes, .listaServicos').removeClass('active');
    position = 1;
    carregaCards();
}
if (ListaTipo === "ListaServicos") {
    $('#tipoLista').find('i').removeClass('bi-people bi-cash-stack').addClass('bi-briefcase');
    $('#tipoLista').find('span').text('Serviços');
    // $('.trocaTipo').css('color', '#ff0');
    $('.listaServicos').addClass('active');
    $('.listaParticipantes, .listaInsumos').removeClass('active');
    position = 2;
    carregaCards();
}

// * Carrega os cards salvos no localStorage quando a página é carregada
function carregaCards() {
    // * Limpa todos os cards
    $('.card').parent().remove();
    todasListas = JSON.parse(localStorage.getItem(ListaTipo)); // * Pega todas as listas salvas no localStorage
    console.log(ListaTipo);
    console.log(matriz);
    if (todasListas) { // ? Caso não exista nada no localStorage, todasListas será null e não entrará no if
        let cont = 0; // * Contador para definir a posição dos cards
        for (let i = 0; i < TAM; i++) {
            // * Caso não exista nenhuma informação salva naquela posição, não será criado o card
            if (todasListas[i] != null) {

                // * Cria um objeto do tipo Lista com as informações do objeto salvo no localStorage
                let lista = new Lista(todasListas[i]._id, todasListas[i].titulo, todasListas[i].linhas, todasListas[i].coordenadas);
                // * Cria o card com as informações do objeto
                let carregaCard = criaConteudo(lista, cont++);

                // ? É como se estivessemos adicionando funcionalidades que um card é capaz de fazer
                customDrag(carregaCard);
                editaCard(carregaCard);
                nomeiaCard(carregaCard);
                resetaCard(carregaCard);
                removeCard(carregaCard);
                $('section').append(carregaCard); // * Adiciona o card na página
                matriz[position][i] = false; // * Posição ocupada
            } else { matriz[position][i] = true; console.log("entrou") } // * Posição disponível
        }
    } else { todasListas = []; }
}
// > Preciso que cards com position diferentes tenham a mesma largura
// > Preciso que todos os cards manteham suas coordenadas após mudança de posição
// > Clicar em cima do nome do card deixa ele como position absolute, e permite mover ele

// * Botões só estarão disponíveis após o carregamento da página	
$(document).ready(() => {
    carregaCards();
    // * Botão de adicionar card
    $('#adicionaCard').click(() => {
        // * Percorre o vetor, se existir algum elemento com o valor true, criará card
        if (!matriz[position].includes(true)) {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance($('#liveToast'));
            toastBootstrap.show();
            return;
        }
        // : Sempre que um card é criado, é criado também um objeto que vai guardar as informações daquele card
        // * Realizar testes para checar se foi corrigido
        // ! Talvez cards se tornem impossíveis de serem arrastados	
        var lista = new Lista(matriz[position].indexOf(true), 'Lista ' + (matriz[position].indexOf(true) + 1), " ", null);
        var newCard = criaConteudo(lista, matriz[position].indexOf(true));
        customDrag(newCard);
        editaCard(newCard);
        nomeiaCard(newCard);
        resetaCard(newCard);
        removeCard(newCard);
        todasListas[matriz[position].indexOf(true)] = lista;
        localStorage.setItem(ListaTipo, JSON.stringify(todasListas));
        matriz[position][matriz[position].indexOf(true)] = false;
        $('section').append(newCard);
    });
    // * Botão de apagar todos os cards
    $('#removeCard').click(() => {
        $('.card').parent().remove();
        matriz[position].fill(true); // * Todas as posições se tornam disponíveis
        todasListas = []; // * Agora o vetor é vazio
        localStorage.setItem(ListaTipo, JSON.stringify(todasListas));
    });
    // * No momento #salvaCard está sendo utilizado para esconder o menu lateral
    $('#tipoLista').click(() => {
        if ($('#tipoLista').find('i').hasClass('bi-people')) {
            $('#tipoLista').find('i').toggleClass('bi-people bi-cash-stack');
            $('#tipoLista').find('span').text('Insumos');
            $('.escolheLista button').removeClass('active');
            $('.listaInsumos').addClass('active');
            ListaTipo = "ListaInsumos";
            localStorage.setItem("ultimaLista", ListaTipo);
            position = 1;
            localStorage.setItem("ultimaListaPosicao", position);
            carregaCards();
        }
        else if ($('#tipoLista').find('i').hasClass('bi-cash-stack')) {
            $('#tipoLista').find('i').toggleClass('bi-cash-stack bi-briefcase');
            $('#tipoLista').find('span').text('Serviços');
            $('.listaServicos').addClass('active');
            $('.listaParticipantes, .listaInsumos').removeClass('active');
            ListaTipo = "ListaServicos";
            localStorage.setItem("ultimaLista", ListaTipo);
            position = 2;
            localStorage.setItem("ultimaListaPosicao", position);
            carregaCards();
        }
        else if ($('#tipoLista').find('i').hasClass('bi-briefcase')) {
            $('#tipoLista').find('i').toggleClass('bi-briefcase bi-people');
            $('#tipoLista').find('span').text('Participantes');
            $('.listaParticipantes').addClass('active');
            $('.listaInsumos, .listaServicos').removeClass('active');
            ListaTipo = "ListaParticipantes";
            localStorage.setItem("ultimaLista", ListaTipo);
            position = 0;
            localStorage.setItem("ultimaListaPosicao", position);
            carregaCards();
        }
    });
    $('.listaParticipantes').click(() => {
            $('#tipoLista').find('i').removeClass('bi-cash-stack bi-briefcase').addClass('bi-people');
            $('#tipoLista').find('span').text('Participantes');
            $('.listaParticipantes').addClass('active');
            $('.listaInsumos, .listaServicos').removeClass('active');
            ListaTipo = "ListaParticipantes";
            localStorage.setItem("ultimaLista", ListaTipo);
            position = 0;
            localStorage.setItem("ultimaListaPosicao", position);
            carregaCards();
    });
    $('.listaInsumos').click(() => {
            $('#tipoLista').find('i').removeClass('bi-people bi-briefcase').addClass('bi-cash-stack');
            $('#tipoLista').find('span').text('Insumos');
            $('.listaInsumos').addClass('active');
            $('.listaParticipantes, .listaServicos').removeClass('active');
            ListaTipo = "ListaInsumos";
            localStorage.setItem("ultimaLista", ListaTipo);
            position = 1;
            localStorage.setItem("ultimaListaPosicao", position);
            carregaCards();
    });
    $('.listaServicos').click(() => {
            $('#tipoLista').find('i').removeClass('bi-people bi-cash-stack').addClass('bi-briefcase');
            $('#tipoLista').find('span').text('Serviços');
            $('.listaServicos').addClass('active');
            $('.listaParticipantes, .listaInsumos').removeClass('active');
            ListaTipo = "ListaServicos";
            localStorage.setItem("ultimaLista", ListaTipo);
            position = 2;
            localStorage.setItem("ultimaListaPosicao", position);
            carregaCards();
    });
});
// * Botão que edita o título do card
function nomeiaCard(element) {
    element.find('.nomeiaCard').click(function () {
        // * Seleciona o título, permite edição, foca nele, e seleciona todo o texto
        let cardTitle = $(this).closest('.card-container').find('.card-header span:first-child');
        cardTitle.attr('contenteditable', 'true');
        cardTitle.focus();
        selectAll(cardTitle[0]);
        // * Ao editar o título, outros cards se tornam fixos
        $('.card-container').not($(this).closest('.card-container')).css('position', 'fixed');
        // * Ao perder o foco, o título é alterado
        cardTitle.blur(function () {
            atualizaTitulo($(this));
        });
        // * Ao pressionar enter, o título é alterado
        cardTitle.on('keydown click', function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                atualizaTitulo($(this));
                cardTitle.attr('contenteditable', 'false');
                let listGroup = $(this).closest('.card-container').find('.list-group');
                let lastLi = listGroup.find('li:last-child').focus();
                finalDaLinha(lastLi[0]);
            } else if (($(this).width() >= maxWidth || $(this).text().length >= maxLength) &&
                !isTextSelected(cardTitle[0]) && e.keyCode !== 8 && e.keyCode !== 46 && !e.ctrlKey) {
                // * Impede que o usuário digite mais caracteres que o permitido
                e.preventDefault();
            }
            // * Caso o usuário consiga digitar mais caracteres que o permitido, o título é cortado
            if ($(this).text().length > maxLength) {
                let trimmedText = $(this).text().substring(0, maxLength);
                cardTitle.text(trimmedText);
            }
        });
    });
}
// * Botão que reseta o conteúdo do card
function resetaCard(element) {
    element.find('.resetaCard').click(function () {
        $(this).closest('.card-container').find('.list-group li').remove();
        let liVazia = $('<li class="list-group-item fw-lighter" contenteditable="true"></li>').text("");
        $(this).closest('.card-container').find('.list-group').append(liVazia);
        liVazia.focus();

        let cardId = $(this).closest('.card-container').attr('id');
        let cardNumber = parseInt(cardId.split('-')[1]);
        todasListas[cardNumber].linhas = [];
        localStorage.setItem(ListaTipo, JSON.stringify(todasListas));
    });
}
// * Botão que apaga o card
function removeCard(element) {
    element.find('.removeCard').click(function () {
        let cardId = $(this).closest('.card-container').attr('id');
        let cardNumber = parseInt(cardId.split('-')[1]);
        $(this).closest('.card-container').remove();
        todasListas[cardNumber] = null;
        localStorage.setItem(ListaTipo, JSON.stringify(todasListas));
        matriz[position][cardNumber] = true;
    });
}
// * Cursor no final de cada linha
function finalDaLinha(element) {
    if (element && element.childNodes && element.childNodes.length > 0) {
        let range = document.createRange();
        let sel = window.getSelection();
        range.setStart(element.childNodes[0], element.childNodes[0].length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
// * Remove li vazias
function removerLiVazias(cardContainer) {
    cardContainer.find('.list-group-item').each(function () {
        // * Vai remover todos os espaços em branco, e checar se ainda resta alguma coisa
        if ($(this).text().trim() === '' && cardContainer.find('.list-group-item').length > 1) {
            $(this).remove();
        }
    });
}
// * Atualiza o título do card
function atualizaTitulo(element) {
    let novoNome = element.text().trim();
    if (novoNome !== '') {
        element.text(novoNome);
        let cardId = element.closest('.card-container').attr('id');
        let cardNumber = parseInt(cardId.split('-')[1]);
        todasListas[cardNumber].titulo = novoNome;
        localStorage.setItem(ListaTipo, JSON.stringify(todasListas));
        ////console.log('Título salvo no card de ID ' + cardNumber + ' como: ' + novoNome);
    }
}
// * Atualiza conteudo do card
function atualizaConteudo(element) {
    let novoConteudo = [];
    element.find('.list-group-item').each(function () {
        novoConteudo.push($(this).text().trim());
    });
    let cardId = element.closest('.card-container').attr('id');
    // Caso card id seja null, não é necessário atualizar o conteúdo
    if (cardId != null) {
        let cardNumber = parseInt(cardId.split('-')[1]);
        todasListas[cardNumber].linhas = novoConteudo;
        localStorage.setItem(ListaTipo, JSON.stringify(todasListas));
        console.log('Conteúdo salvo no card de ID ' + cardNumber + ' como: ' + novoConteudo);
    }
}
// * Permite alterar o título caso conteúdo esteja inteiramente selecionado
function isTextSelected(element) {
    let selection = window.getSelection();
    let selectedText = selection.toString();
    let elementText = element.textContent;
    return selectedText === elementText;
}
// * Função para configurar regras para movimentação do card
function customDrag(elemento) {
    elemento.find(".draggable").draggable({
        containment: "section",
        scroll: false,
        snap: false,
        stack: ".draggable",
        cursor: "grabbing",
        handle: ".card-header",
        stop: function () { // * Executado sempre que o card é solto
            $(this).closest('.card-container').css('position', 'absolute');
            // var cardPosition = $(this).position().left + 48 + 300;
            // var canvasWidth = $('section').width();
            // if (!$('aside').hasClass('active')) {
            //     larguraPermitida = canvasWidth - 250;
            //     if (cardPosition > larguraPermitida && !$(this).hasClass('mover')) {
            //         $(this).addClass('mover');
            //         console.log('Mover adicionado');
            //         $(this).find('.card-header').css('background-color', '#f0f0f0');
            //     } else if (cardPosition <= larguraPermitida && $(this).hasClass('mover')) {
            //         $(this).removeClass('mover');
            //         console.log("Mover removido");
            //         $(this).find('.card-header').css('background-color', '#fff');
            //     }
            // }

            // * Quero pegar as coordanadas do card quando ele for solto
            // * E salvar no localStorage
            // * E quando a página for carregada, os cards serão carregados com as coordenadas salvas
            // * E quando um card for movido, as coordenadas serão atualizadas
            // * E quando um card for apagado, as coordenadas serão apagadas

            let cardId = $(this).closest('.card-container').attr('id');
            let cardNumber = parseInt(cardId.split('-')[1]);
            todasListas[cardNumber].coordenadas = [$(this).offset().left - 48, $(this).offset().top];
            localStorage.setItem(ListaTipo, JSON.stringify(todasListas));
            console.log('Coordenadas salvas no card de ID ' + cardNumber + ' como: ' + todasListas[cardNumber].coordenadas);
        }
    });
}
// * Editar o conteúdo do card quando clicar em alguma linha
function editaCard(element) {
    element.find('.list-group').on('keydown', function (e) {
        // ? Apenas para simplificar o código
        let listGroup = $(this).closest('.card-container').find('.list-group');
        let otherCards = $('.card-container').not($(this).closest('.card-container'));
        let currentLi = listGroup.find('li:focus');
        // * Ao perder o foco, o conteúdo é atualizado
        listGroup.on('blur', 'li', function () {
            atualizaConteudo(listGroup);
        });
        // * Se o usuário pressionar backspace e a linha estiver vazia, e não houver apenas 1 linha, linha atual é apagada, e o focus irá para a linha anterior
        if ((e.keyCode === 8 || e.keyCode === 38 || e.keyCode === 40) && currentLi.text() === '' && listGroup.children().length > 1) {
            e.preventDefault();
            currentLi.remove();
            var lastLi = listGroup.find('li:last-child').focus();
            finalDaLinha(lastLi[0]);
        }
        // * Usuário não pode criar nova linha se atual estiver em branco
        if (e.keyCode === 13 && currentLi.text() === '') {
            e.preventDefault();
            return;
        }
        // * Enter
        if (e.keyCode === 13) {
            e.preventDefault();
            let liVazia = $('<li class="list-group-item fw-lighter" contenteditable="true"></li>').text("");
            otherCards.css('position', 'fixed');
            listGroup.append(liVazia);
            liVazia.focus();
            finalDaLinha(liVazia[0]);
            atualizaConteudo($(this).closest('.card-container'));
        }
        // * Seta para cima
        if (e.keyCode === 38) {
            e.preventDefault();
            currentLi.prev().focus();
            finalDaLinha(currentLi.prev()[0]);
        }
        // * Seta para baixo
        if (e.keyCode === 40) {
            e.preventDefault();
            currentLi.next().focus();
            finalDaLinha(currentLi.next()[0]);
        }
        // * Remove li vazias quando um click é realizado
        $(document).click(function () {
            // > Aqui possívelmente está gastando mais processamento que o necessário
            $('.card-container').each(function () {
                removerLiVazias($(this));
            });
            atualizaConteudo($(this).closest('.card-container'));
        });
    });
}
// * Permite selecionar todo o texto de um elemento
function selectAll(element) {
    if (document.body.createTextRange) { // Suporte para Internet Explorer
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) { // Suporte para navegadores modernos
        var range = document.createRange();
        range.selectNodeContents(element);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
// * HTML de um card
function criaConteudo(lista, gapping) {
    var conteudo = '<li class="list-group-item fw-lighter" contenteditable="true"></li>';
    if (lista.linhas.length !== 0 && lista.linhas[0] !== '') {
        conteudo = '';
        for (let i = 0; i < lista.linhas.length; i++) {
            // * Caso a linha não seja vazia, ela é adicionada ao conteúdo
            if (lista.linhas[i] !== '') {
                conteudo += '<li class="list-group-item fw-lighter" contenteditable="true">' + lista.linhas[i] + '</li>';
            }
        }
    }
    // Caso lista.coordenadas estiver vazio
    let conteudoStyle = '';
    if (lista.coordenadas == null) {
        conteudoStyle = 'top: ' + (gapping + 1) + '0%;';
    } else {
        conteudoStyle = 'top: ' + lista.coordenadas[1] + 'px; left: ' + lista.coordenadas[0] + 'px;';
    }
    return $('<div id="card-' + lista._id + '" class="card-container ms-5" style="' +
        conteudoStyle + 'z-index: 0;">' +
        '<div class="cardConvidado draggable card col-3 shadow border-0 rounded-1 overflow-x-hidden">' +
        '<div class="card-header fs-4 fw-bolder text-nowrap d-flex justify-content-between align-items-center">' +
        '<span class="mt-3 mb-1 lh-1 pt-2 fs-md-1">' +
        lista.titulo +
        '</span>' +
        '<span class="position-absolute end-0 top-0 m-0 p-0">' +
        '<button type="button" class="btn bi-arrow-clockwise resetaCard btn-sm"></button>' +
        '<button type="button" class="btn bi-pen nomeiaCard btn-sm"></button>' +
        '<button type="button" class="btn bi-x-lg removeCard btn-sm" aria-label="Close"></button>' +
        '</span>' +
        '</div>' +
        '<div class="card-body overflow-auto mx-1 p-0" style="max-height: 500px">' +
        '<ul class="list-group list-group-flush mx-0 px-0">' +
        conteudo +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>');
    /*
    > Será feito algo como:
    > if lista.coordenadas == null, então seguirá o procedimento de gapping padrão
    > caso contrário, o left será definido como lista.coordenadas[0] e o top como lista.coordenadas[1]
    : Primeiramente vamos pegar a posição do card, para isso criarei uma função dentro de customDrag, que irá dar 
    : um console log com as coordenadas dele, após isso, testarei como salvar no localStorage, e como carregar
    : concluindo, as coordenadas estarão feitas 
    ! Problema que não faço ideia como resolver:
    ! Quando uma página é redimensionada cards não são movidos para posições fora da tela
    * Possível solução: Mudar a forma de salvas as coordenadas, ao invés de salvar as coordenadas do card, 
    * salvar as coordenadas do card em relação ao canvas
    */
}
