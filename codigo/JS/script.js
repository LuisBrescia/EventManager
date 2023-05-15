
// function movivel(elemento) {
//     elemento.draggable({
//         // containment: [
//         //     $("main").offset().left, 
//         //     $(".btn-group").outerHeight(), 
//         //     $(window).width() - $(".card").outerWidth() - 20, 
//         //     $(window).height() - $(".card").outerHeight() - 20 
//         // ],
//     })
// }

// Seleciona o botão de adicionar card
var adicionaCard = $('#adicionaCard');

// Seleciona o container onde os cards serão adicionados
var canva = $('.card-container');

// Adiciona um evento de clique ao botão de adicionar card
adicionaCard.on('click', () => {

    if (canva.children().length >= 4) {
        alert('Não é possível adicionar mais de 4 cards em uma mesma página.');
        return;
    }

    // Cria uma cópia do modelo de card
    var newCard = $(
        '<div class="card-container">' +
        '<div class="cardConvidado draggable card col-3 text-center shadow border-0 rounded-0">' +
        '<div class="card-header fw-bolder">Título</div>' +
        '<div class="card-body"><p contenteditable="true">Nomes dos convidados</p></div>' +
        '</div>' +
        '</div>'
    );

    // movivel(newCard);
    newCard.find(".draggable").draggable({
        containment: ".card-container",
        scroll: false,
        snap: false,
        stack: ".draggable",
        cursor: "grabbing",
    });

    // Adiciona o novo card ao container de cards
    canva.append(newCard);
});

const sidebarItems = document.querySelectorAll("aside ul li");

sidebarItems.forEach(function (item) {
    item.addEventListener("click", function () {
        sidebarItems.forEach(function (item) {
            item.classList.remove("active");
        });
        this.classList.add("active");
    });
});
