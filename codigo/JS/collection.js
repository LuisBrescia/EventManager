// * Responsivididade, basicamente altera entre uma tela e outra
$('#collectionParticipantes').on('click', function () {
    if (window.matchMedia("(min-width: 768px)").matches) return;
    $('.colParticipantes').addClass('d-none');
    $('.colInsumos').removeClass('d-none');
});
$('#collectionInsumos').on('click', function () {
    if (window.matchMedia("(min-width: 768px)").matches) return;
    $('.colInsumos').addClass('d-none');
    $('.colServicos').removeClass('d-none');
});
$('#collectionServicos').on('click', function () {
    if (window.matchMedia("(min-width: 768px)").matches) return;
    $('.colServicos').addClass('d-none');
    $('.colParticipantes').removeClass('d-none');
});
$(window).on('resize', function () {
    if ($(window).width() >= 768) {
        $('.colInsumos, .colServicos, .colParticipantes').removeClass('d-none');
    }
});

// * Blur nos outros accordions quando o botão em algum estiver em hover 
$('#collectionInsumos').hover(
    () => { $('.accordionParticipantes, .accordionServicos').toggleClass('blur') }
)
$('#collectionParticipantes').hover(
    () => { $('.accordionInsumos, .accordionServicos').toggleClass('blur') }
)
$('#collectionServicos').hover(
    () => { $('.accordionInsumos, .accordionParticipantes').toggleClass('blur') }
)
// > Se tiver 2 true o outro automaticamente será none
var expandidos = [false, false, false]
var elementos = [$('.colParticipantes'), $('.colInsumos'), $('.colServicos'),]
$('#collectionParticipantes').on('click', () => {

    $(elementos[1]).toggleClass('col-md-4 col-md-3');
    $(elementos[2]).toggleClass('col-md-4 col-md-3');
    $(elementos[0]).toggleClass('col-md-6 col-md-4');

    if (expandidos[0] === true) {
        expandidos[0] = false;
        console.log("Partipantes expandido");
        elementos[1].removeClass('d-none');
        elementos[2].removeClass('d-none');
    } else {
        expandidos[0] = true;
        console.log("Partipantes minimizado");
        elementos[2].toggleClass('d-none', expandidos[1] === true);
        elementos[1].toggleClass('d-none', expandidos[2] === true);
    }
});
$('#collectionInsumos').on('click', () => {
    $(elementos[0]).toggleClass('col-md-4 col-md-3');
    $(elementos[2]).toggleClass('col-md-4 col-md-3');
    $(elementos[1]).toggleClass('col-md-6 col-md-4');

    if (expandidos[1] === true) {
        expandidos[1] = false;
        console.log("Insumos minimizado");
        elementos[0].removeClass('d-none');
        elementos[2].removeClass('d-none');
    } else {
        expandidos[1] = true;
        console.log("Insumos expandido");
        elementos[2].toggleClass('d-none', expandidos[0] === true);
        elementos[0].toggleClass('d-none', expandidos[2] === true);
    }
});
$('#collectionServicos').on('click', () => {

    $(elementos[0]).toggleClass('col-md-4 col-md-3');
    $(elementos[1]).toggleClass('col-md-4 col-md-3');
    $(elementos[2]).toggleClass('col-md-6 col-md-4');

    if (expandidos[2] === true) {
        expandidos[2] = false;
        console.log("Insumos minimizado");
        elementos[0].removeClass('d-none');
        elementos[1].removeClass('d-none');
    } else {
        expandidos[2] = true;
        console.log("Insumos expandido");
        elementos[1].toggleClass('d-none', expandidos[0] === true);
        elementos[0].toggleClass('d-none', expandidos[1] === true);
    }
});

// * Ativar sombra de um accordion somente quando último item estiver colapsado
var participantesExpandido = true;
$('.accordionParticipantes .accordion-item:last-child .accordion-button').on('click', () => {
    if (participantesExpandido === true) {
        $('.accordionParticipantes').addClass('shadow');
    } else {
        $('.accordionParticipantes').removeClass('shadow');
    }
    participantesExpandido = !participantesExpandido;
    console.log("Clicou");
});
var insumosExpandido = true;
$('.accordionInsumos .accordion-item:last-child .accordion-button').on('click', () => {
    if (insumosExpandido === true) {
        $('.accordionInsumos').addClass('shadow');
    } else {
        $('.accordionInsumos').removeClass('shadow');
    }
    insumosExpandido = !insumosExpandido;
    console.log("Clicou");
});
var servicosExpandido = true;
$('.accordionServicos .accordion-item:last-child .accordion-button').on('click', () => {
    if (servicosExpandido === true) {
        $('.accordionServicos').addClass('shadow');
    } else {
        $('.accordionServicos').removeClass('shadow');
    }
    servicosExpandido = !servicosExpandido;
    console.log("Clicou");
});
