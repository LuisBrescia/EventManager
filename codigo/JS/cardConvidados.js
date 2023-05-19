var adicionaCard = $('#adicionaCard');  // Botão de adicionar card
var removeCard = $('#removeCard');      // Botão de remover card
var canvas = $('section');              // Os botões também contam como filhos
var maxWidth = 250; // Máximo de pixels permitidos no título
var maxLength = 15; // Máximo de caracteres permitidos no título

var contador = 1; // Contador de cards
var ordem = 1;    // Ordem em que os cards foram adicionados

// > Preciso que cards com position diferentes tenham a mesma largura
// > Preciso que todos os cards manteham suas coordenadas após mudança de posição

// ? Botão de adicionar card
adicionaCard.on('click', () => {

    // * Limite de 6 cards
    if (canvas.children().length >= 7) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance($('#liveToast'))
        toastBootstrap.show();
        setTimeout(() => { toastBootstrap.hide(); }, 3000);
        return;
    }
    // * Conteúdo HTML do card
    var newCard = $(
        // Se colocado position absolute aqui, outros cards não serão movidos para baixo
        // Porém acontecerá bugs de cards se tornarem imovéis
        // > Adicionar e remover propriedade position absolute quando necessário
        // ? Possível solução:          (Farei quando tiver tempo)
        // > Cards que não estão sendo utilizados, terão position fixed       
        // ? Acredito que a solução envolva mudar algo desta linha de baixo
        '<div id="card-' + ordem + '" class="col-10 card-container ms-5" style="top:' + contador + '0%">' +
        '<div class="cardConvidado draggable card col-3 shadow border-0 rounded-3 overflow-x-hidden"' +
        'style="max-height:300px; width:300px">' +
        '<div class="card-header fs-4 fw-bolder text-nowrap d-flex justify-content-between align-items-center">' +
        '<span class="mt-3 mb-1 lh-1 pt-2">' +
        'Lista' + contador + '_id:' + ordem +
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
        '</div>'
    );
    // * Permite que o card seja arrastado
    newCard.find(".draggable").draggable({
        containment: "section",
        scroll: false,
        snap: false,
        stack: ".draggable",
        cursor: "grabbing",
        handle: ".card-header",
        stop: function () {
            $(this).closest('.card-container').css('position', 'absolute');
            // > Se a ID do card
            // if (contador <= 2) {
            //     // * Só funciona na primeira vez porque o calor não é resetado
            //     if ($('.funcionalidades:hover').length > 0) {
            //         $(this).css('top', '10px');
            //     } 
            //     $(this).closest('.card-container').css('position', 'static');
            // }
        }
    });

    // * Editar o conteúdo do card
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
        $(document).on('click', function() {
            // > Aqui possívelmente está gastando mais processamento que o necessário
            $('.card-container').each(function() {
                removerLiVazias($(this));
            });
        });
        
        $(document).on('click', function (e) {
            var currentLi = $('.list-group li:focus');
            var currentLiText = currentLi.text();
            var listGroup = currentLi.closest('.list-group');

            if ((!$(e.target).closest('.card-container').length) && currentLiText === '' && listGroup.children().length > 1) {
                e.preventDefault();
                currentLi.remove();
                var lastLi = listGroup.find('li:last-child').focus();
                finalDaLinha(lastLi[0]);
            }
        });
    });
    // * Botão que edita o título do card
    newCard.find('.nomeiaCard').on('click', function () {
        var cardContainer = $(this).closest('.card-container');
        var cardConvidado = cardContainer.find('.cardConvidado');
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
        // * Ao pressionar enter, o título é alterado
        cardTitle.on('keydown', function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                var novoNome = $(this).text().trim();
                if (novoNome !== '') {
                    cardTitle.text(novoNome);
                }
                cardTitle.attr('contenteditable', 'false');
                var listGroup = cardContainer.find('.list-group');
                var lastLi = listGroup.find('li:last-child').focus();
                finalDaLinha(lastLi[0]);
            } else {
                var currentWidth = $(this).width();
                var currentLength = $(this).text().length;

                var isContentSelected = isTextSelected(cardTitle[0]);

                if ((currentWidth >= maxWidth || currentLength >= maxLength) && !isContentSelected && e.keyCode !== 8 && e.keyCode !== 46 && !e.ctrlKey) {
                    e.preventDefault();
                }
            }
            if (currentLength > maxLength) {
                var trimmedText = $(this).text().substring(0, maxLength);
                cardTitle.text(trimmedText);
            }

        });
        // * Permite alterar o título caso conteúdo esteja inteiramente selecionado
        function isTextSelected(element) {
            var selection = window.getSelection();
            var selectedText = selection.toString();
            var elementText = element.textContent;

            return selectedText === elementText;
        }
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
        $(this).closest('.card-container').remove();
        contador--;
    });
    contador++;
    ordem++;
    $('.info').addClass('d-none');
    canvas.append(newCard); // Adiciona o novo card ao canvas
});
// * Apaga todos os cards
// * ID só é reiniciado quando todos cards são apagados 
$('#removeCard').on('click', () => {
    $('.card').parent().remove();
    contador = 1;
    ordem = 1;
    $('.info').removeClass('d-none');   
});
// * Cursor no final de cada linha
function finalDaLinha(element) {
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(element.childNodes[0], element.childNodes[0].length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}
// * Remove li vazias
function removerLiVazias(cardContainer) {
    cardContainer.find('.list-group-item').each(function() {
        // * Vai remover todos os espaços em branco, e checar se ainda resta alguma coisa
        if ($(this).text().trim() === '' && cardContainer.find('.list-group-item').length > 1) {
            $(this).remove();
        }
    });
}
