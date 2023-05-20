var maxWidth = 250;         // Máximo de pixels permitidos no título
var maxLength = 15;         // Máximo de caracteres permitidos no título
const TAM = 6; // ? Quantidade de cards que será possível adicionar
// : TRUE == DISPONÍVEL
// ! FALSE == OCUPADO
const vetor = Array(TAM).fill(true);
var todasListas = [];

// > Preciso que cards com position diferentes tenham a mesma largura
// > Preciso que todos os cards manteham suas coordenadas após mudança de posição

// ? Botão de adicionar card
$('#adicionaCard').on('click', () => {
    // * Percorre o vetor, se existir algum elemento com o valor true, criará card
    if (!vetor.includes(true)) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance($('#liveToast'));
        toastBootstrap.show();
        return;
    }
    // : Sempre que um card é criado, é criado também um objeto que vai guardar as informações daquele card
    // * Conteúdo HTML do card
    // ! Periódicamente cards se tornam impossíveis de serem arrastados	
    // ! Realizar testes para checar se foi corrigido
    // > Adicionar e remover propriedade position absolute quando necessário
    // ? Possível solução:          (Farei quando tiver tempo)
    // > Cards que não estão sendo utilizados, terão position fixed       
    // ? Acredito que a solução envolva mudar algo desta linha de baixo
    var newCard = $(criaConteudo(vetor.indexOf(true), 'Lista ' + (vetor.indexOf(true) + 1)));
    // * Função para configurar regras para movimentação do card
    newCard.find(".draggable").draggable({
        containment: "section",
        scroll: false,
        snap: false,
        stack: ".draggable",
        cursor: "grabbing",
        handle: ".card-header",
        // * Funão chamada quando o card é solto
        stop: function () {
            $(this).closest('.card-container').css('position', 'absolute');
            // > Descobrir como a coordenada é calculada
            // * Adicionando 300 estará me falando onde o card acaba
            var cardPosition = $(this).position().left + 48 + 300;
            var canvasWidth = $('section').width();
            // ? ASIDE IS ACTIVE
            // : IF TRUE NÃO FAZER NADA
            if (!$('aside').hasClass('active')) {
                // : PEGAR A LARGURA DO CANVAS SUBTRAIR POR 250
                larguraPermitida = canvasWidth - 250;
                // : SE ALGUM CARD ESTIVER COM A COORDENADA MAIOR QUE A LARGURA PERMITIDA
                if (cardPosition > larguraPermitida && !$(this).hasClass('mover')) {
                    // : VAI SER ADICIONADA A ELE A CLASSE MOVER
                    $(this).addClass('mover');
                    console.log('Mover adicionado');
                    $(this).find('.card-header').css('background-color', '#f0f0f0');
                } else if (cardPosition <= larguraPermitida && $(this).hasClass('mover')) {
                    $(this).removeClass('mover');
                    console.log("Mover removido");
                    $(this).find('.card-header').css('background-color', '#fff');
                }
            }
            // : VOU PEGAR A COORDENADA DESTE CARD E SUBTRAIR PELA LARGURA PERMITIDA
            // : MOVER = COORDENADA DO CARD - LARGURA PERMITIDA
            // : E QUANDO O USUÁRIO APERTAR O BOTÃO DE MENU, VOU MOVER O CARD
            // : TRANSFORM: TRANSLATEX(-MOVER)
            // console.log('Coordenada X do card:', cardPosition);
        }
    });

    // * Editar o conteúdo do card quando clicar em alguma linha
    newCard.find('.list-group').on('keydown', function (e) {
        // ? Apenas para simplificar o código
        var listGroup = $(this).closest('.card-container').find('.list-group');
        var otherCards = $('.card-container').not($(this).closest('.card-container'));
        var currentLi = listGroup.find('li:focus');
        var currentLiText = listGroup.find('li:focus').text();

        // * Se o usuário pressionar backspace e a linha estiver vazia, e não houver apenas 1 linha, linha atual é apagada, e o focus irá para a linha anterior
        if ((e.keyCode === 8 || e.keyCode === 38 || e.keyCode === 40) && currentLiText === '' && listGroup.children().length > 1) {
            e.preventDefault();
            currentLi.remove();
            var lastLi = listGroup.find('li:last-child').focus();
            finalDaLinha(lastLi[0]);
        }
        // * Usuário não pode criar nova linha se atual está em branco
        if (e.keyCode === 13 && currentLiText === '') {
            e.preventDefault();
            return;
        }
        // * Enter
        if (e.keyCode === 13) {
            e.preventDefault();
            // $('.card-container').css('position', 'static'); // ! Desenvolvimento
            // > Por algum motivo, todos os cards são afetados pelas mudanças
            // > Talvez seja necessário criar uma classe específica para cada card
            var liVazia = $('<li class="list-group-item fw-lighter" contenteditable="true"></li>').text("");
            otherCards.css('position', 'fixed');
            $(this).closest('.card-container').find('.list-group').append(liVazia);
            liVazia.focus();
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
        $(document).on('click', function () {
            // > Aqui possívelmente está gastando mais processamento que o necessário
            $('.card-container').each(function () {
                removerLiVazias($(this));
            });
        });
        // ! Não sei para o que serve mas estou com medo de remover
        // $(document).on('click', function (e) {
        //     var currentLi = $('.list-group li:focus');
        //     var currentLiText = currentLi.text();
        //     var listGroup = currentLi.closest('.list-group');
        //     if ((!$(e.target).closest('.card-container').length) && currentLiText === '' && listGroup.children().length > 1) {
        //         e.preventDefault();
        //         currentLi.remove();
        //         var lastLi = listGroup.find('li:last-child').focus();
        //         finalDaLinha(lastLi[0]);
        //     }
        // });
    });
    // * Botão que edita o título do card
    newCard.find('.nomeiaCard').on('click', function () {
        var cardContainer = $(this).closest('.card-container');
        var cardTitle = cardContainer.find('.card-header span:first-child');
        cardTitle.attr('contenteditable', 'true');
        cardTitle.focus();
        selectAll(cardTitle[0]);

        // ! Não entendi o que isso faz
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
        // > Provavelemente tem um jeito mais eficiente de fazer isso
        // * Ao perder o foco, o título é alterado
        cardTitle.on('blur', function () {
            atualizaTitulo($(this));
        });
        // * Ao pressionar enter, o título é alterado
        cardTitle.on('keydown click', function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                atualizaTitulo($(this));
                cardTitle.attr('contenteditable', 'false');
                var listGroup = cardContainer.find('.list-group');
                var lastLi = listGroup.find('li:last-child').focus();
                finalDaLinha(lastLi[0]);
            } else if (($(this).width() >= maxWidth || $(this).text().length >= maxLength) &&
                !isTextSelected(cardTitle[0]) && e.keyCode !== 8 && e.keyCode !== 46 && !e.ctrlKey) {
                e.preventDefault();
            }
            if ($(this).text().length > maxLength) {
                var trimmedText = $(this).text().substring(0, maxLength);
                cardTitle.text(trimmedText);
            }
        });
    });
    // * Botão que reseta o conteúdo do card
    newCard.find('.resetaCard').on('click', function () {
        $(this).closest('.card-container').find('.list-group li').remove();
        var liVazia = $('<li class="list-group-item fw-lighter" contenteditable="true"></li>').text("");
        $(this).closest('.card-container').find('.list-group').append(liVazia);
        // > Adiciona Position Absolute ao card
    });
    // * Botão que apaga o card
    newCard.find('.removeCard').on('click', function () {
        var cardId = $(this).closest('.card-container').attr('id');
        var cardNumber = parseInt(cardId.split('-')[1]);
        vetor[cardNumber] = true;
        $(this).closest('.card-container').remove();
    });
    localStorage.setItem('titulo-' + vetor.indexOf(true), 'Lista ' + (vetor.indexOf(true) + 1));
    $('.info').addClass('d-none');
    vetor[vetor.indexOf(true)] = false;
    $('section').append(newCard);
});

// * Apaga todos os cards
$('#removeCard').on('click', () => {
    $('.card').parent().remove();
    vetor.fill(true);
    $('.info').removeClass('d-none');
});
// * No momento #salvaCard está sendo utilizado para esconder o menu lateral
$('#salvaCard').on('click', () => {
    $('.card').find('.card-container').removeClass('mover');
});
// * Cursor no final de cada linha
function finalDaLinha(element) {
    if (element && element.childNodes && element.childNodes.length > 0) {
        var range = document.createRange();
        var sel = window.getSelection();
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
    var novoNome = element.text().trim();
    if (novoNome !== '') {
        element.text(novoNome);
        var cardId = element.closest('.card-container').attr('id');
        var cardNumber = parseInt(cardId.split('-')[1]);
        localStorage.setItem('titulo-' + cardNumber, novoNome);
        console.log('Título salvo no card de ID ' + cardNumber + ' como: ' + novoNome);
    }
}
// * Permite alterar o título caso conteúdo esteja inteiramente selecionado
function isTextSelected(element) {
    var selection = window.getSelection();
    var selectedText = selection.toString();
    var elementText = element.textContent;
    return selectedText === elementText;
}

for (var i = 0; i < TAM; i++) {
    var lista = {
        Lista : i,
        titulo: localStorage.getItem('titulo-' + i),
        linhas : ["elemento1", "elemento2", "elemento3"],
        quantidade : 10
    };
    todasListas.push(lista);
    var carregaCard = $(criaConteudo(i, localStorage.getItem('titulo-' + i)));
    vetor[i] = false;
    $('section').append(carregaCard);
}
// localStorage.setItem("Listas", JSON.stringify(todasListas));

// Com esse código já é possível salvar o conteúdo de cada card
// Após a página ser carregada
// $(document).ready(function () {
//     todasListas = JSON.parse(localStorage.getItem("Listas"));
//     console.log("TODAS LISTAS",todasListas);
//     console.log(todasListas[i].titulo);
//     console.log(todasListas.length);
//     for (var i = 0; i < todasListas.length; i++) {
//         carregaCard = $(criaConteudo(todasListas[i].Lista, todasListas[i].titulo));    
//         vetor[todasListas[i].Lista] = false;
//         $('section').append(carregaCard);
//     }
// });

// function salvar() {
//     var lista = {
//         Lista : 1,
//         titulo: "Titulo",
//         linhas : ["elemento1", "elemento2", "elemento3"],
//         quantidade : 10
//     };
//     todasListas.push(lista);
//     localStorage.setItem("Listas", JSON.stringify(todasListas));
// }

// No caso de cima, elemento seria vetor.indexOf(true)
function criaConteudo(elemento, titulo) {
        
    return '<div id="card-' + elemento + '" class="card-container ms-5" style="top:' +
        (elemento + 1) + '0%">' +
        '<div class="cardConvidado draggable card col-3 shadow border-0 rounded-3 overflow-x-hidden"' +
        'style="max-height:300px; width:300px">' +
        '<div class="card-header fs-4 fw-bolder text-nowrap d-flex justify-content-between align-items-center">' +
        '<span class="mt-3 mb-1 lh-1 pt-2">' +
        titulo +
        '</span>' +
        '<span class="position-absolute end-0 top-0 m-0 p-0">' +
        '<button type="button" class="btn bi-arrow-clockwise resetaCard btn-sm"></button>' +
        '<button type="button" class="btn bi-pen nomeiaCard btn-sm"></button>' +
        '<button type="button" class="btn bi-x-lg removeCard btn-sm" aria-label="Close"></button>' +
        '</span>' +
        '</div>' +
        '<div class="card-body overflow-auto mx-1 p-0" style="max-height: 500px">' +
        '<ul class="list-group list-group-flush mx-0 px-0">' +
        '<li class="list-group-item fw-lighter" contenteditable="true"></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>';
}