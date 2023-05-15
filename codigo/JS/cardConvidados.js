var adicionaCard = $('#adicionaCard');  // Botão de adicionar card
var removeCard = $('#removeCard');      // Botão de remover card
var canvas = $('section');              // Os botões também contam como filhos

var contador = 1;
const toastLiveExample = document.getElementById('liveToast')

adicionaCard.on('click', () => {

    if (canvas.children().length >= 5) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show();
        setTimeout(() => {toastBootstrap.hide();}, 3000);
        return;
    }

    var newCard = $(
        '<div class="card-container">' +
            '<div class="cardConvidado draggable card col-3 shadow border-0 rounded-3 overflow-auto" style="max-height:300px">' +
                '<div class="card-header fs-4 fw-bolder text-center d-flex justify-content-between align-items-center">' +
                    '<span>' + 
                        'Lista' + contador + '</span>' + 
                    '<span>'+
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
            '</div>'+
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
    });
    // * Editar o conteúdo do card
    newCard.find('.list-group').on('keydown', function (e) {

        var listGroup = $(this).closest('.card-container').find('.list-group');
        var lastLi = listGroup.find('li:last-child');
        var lastLiText = lastLi.text().trim();

        // Se o usuário pressionar backspace e a linha estiver vazia, e não houver apenas 1 linha, linha atual é apagada, e o focus irá para a linha anterior
        if (e.keyCode === 8 && lastLiText === '' && listGroup.children().length > 1) {
            e.preventDefault();
            lastLi.remove();
            var liAnterior = listGroup.find('li:last-child');
            liAnterior.focus();
            // o focus vai para o final da linha
            var range = document.createRange();
            var sel = window.getSelection();
            range.setStart(liAnterior[0].childNodes[0], liAnterior[0].childNodes[0].length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            return;
        }

        if (e.keyCode === 13 && lastLiText === '') {
            e.preventDefault();
            return;
        }

        if (e.keyCode === 13) {
            e.preventDefault();
            var liVazia = $('<li class="list-group-item fw-lighter" contenteditable="true"></li>').text("");
            $(this).closest('.card-container').find('.list-group').append(liVazia);
            liVazia.focus();
        }
        if (e.keyCode === 38) {
            e.preventDefault();
            var liAnterior = $(this).closest('.card-container').find('.list-group li:focus').prev();
            liAnterior.focus();
        }
        if (e.keyCode === 40) {
            e.preventDefault();
            var liPosterior = $(this).closest('.card-container').find('.list-group li:focus').next();
            liPosterior.focus();
        }
    });
    // * Botão que edita o título do card
    newCard.find('.nomeiaCard').on('click', function () {
        var cardContainer = $(this).closest('.card-container');
        var cardTitle = cardContainer.find('.card-header span:first-child');
        cardTitle.attr('contenteditable', 'true');
        cardTitle.focus();
        selectAll(cardTitle[0]);

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

        cardTitle.on('keydown', function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                var novoNome = $(this).text().trim();
                if (novoNome !== '') {
                    cardTitle.text(novoNome);
                }
                cardTitle.attr('contenteditable', 'false');
                // Foca na primeira linha do card
                var listGroup = cardContainer.find('.list-group');
                var firstLi = listGroup.find('li:last-child');
                firstLi.focus();
            } else {
                var maxLength = 15; // Máximo de caracteres permitidos
                var currentLength = $(this).text().length;
                var isContentSelected = isTextSelected(cardTitle[0]);
                if (currentLength >= maxLength && !isContentSelected && e.keyCode !== 8 && e.keyCode !== 46 && !e.ctrlKey) {
                  e.preventDefault();
                }
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
    });
    // * Botão que apaga o card
    newCard.find('.removeCard').on('click', function() {
        $(this).closest('.card-container').remove();
        contador--;
    });
      
    contador++;
    canvas.append(newCard); // Adiciona o novo card ao canvas
});

$('#removeCard').on('click', () => {  
    $('.card').parent().remove();
    contador = 1;
});