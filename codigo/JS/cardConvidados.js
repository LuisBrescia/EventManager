var adicionaCard = $('#adicionaCard');  // Botão de adicionar card
var removeCard = $('#removeCard');      // Botão de remover card
var canvas = $('section');              // Os botões também contam como filhos

var contador = 1;
const toastLiveExample = document.getElementById('liveToast')

adicionaCard.on('click', () => {

    if (canvas.children().length >= 5) {
        // alert('Não é possível adicionar mais de 4 cards em uma mesma página.');
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show();
        setTimeout(() => {toastBootstrap.hide();}, 2000);
        return;
    }

    var newCard = $(
        '<div class="card-container">' +
            '<div class="cardConvidado draggable card col-3 shadow border-0 rounded overflow-auto" style="max-height:300px">' +
                '<div class="card-header fs-4 fw-bolder text-center d-flex justify-content-between align-items-center">' +
                    '<span>' + 
                        'Lista' + contador + '</span>' + 
                    '<span>'+
                    '<button type="button" class="btn bi-pen nomeiaCard btn-sm"></button>' +
                    '<button type="button" class="btn bi-x-lg removeCard btn-sm" aria-label="Close"></button>' +
                    '</span>' +
                '</div>' +
                '<div class="card-body overflow-auto" style="max-height: 500px">' +
                    '<ul class="list-group list-group-flush">' +
                        '<li class="list-group-item fw-lighter" contenteditable="true"></li>' +
                    '</ul>' +
                '</div>' +
            '</div>'+
        '</div>'
    );

    newCard.find(".draggable").draggable({
        containment: "section",
        scroll: false,
        snap: false,
        stack: ".draggable",
        cursor: "grabbing",
        handle: ".card-header",
    });

    newCard.find('.removeCard').on('click', function() {
        $(this).closest('.card-container').remove();
        contador--;
    });

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
            } else {
                var maxLength = 15; // Defina o número máximo de caracteres permitidos
                var currentLength = $(this).text().length;
                var isContentSelected = isTextSelected(cardTitle[0]);
                if (currentLength >= maxLength && !isContentSelected && e.keyCode !== 8 && e.keyCode !== 46 && !e.ctrlKey) {
                  e.preventDefault();
                }
            }
        });

        function isTextSelected(element) {
            var selection = window.getSelection();
            var selectedText = selection.toString();
            var elementText = element.textContent;
            
            return selectedText === elementText;
            }
    });
      
    contador++;
    canvas.append(newCard); // Adiciona o novo card ao canvas
});

$('#removeCard').on('click', () => {  
    $('.card').parent().remove();
    contador = 1;
});