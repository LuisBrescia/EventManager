var telaMD = false; // Para tela md ou maiores essa variável será true

// * Responsivididade, basicamente altera entre uma tela e outra
$('#collectionParticipantes').on('click', function () {
    if (window.matchMedia("(min-width: 768px)").matches) return;
    console.log("Participantes");
    $('.colParticipantes').addClass('d-none');
    $('.colInsumos').removeClass('d-none');
});
$('#collectionInsumos').on('click', function () {
    if (window.matchMedia("(min-width: 768px)").matches) return;
    console.log("Insumos");
    $('.colInsumos').addClass('d-none');
    $('.colServicos').removeClass('d-none');
});
$('#collectionServicos').on('click', function () {
    if (window.matchMedia("(min-width: 768px)").matches) return;
    console.log("Servicos");
    $('.colServicos').addClass('d-none');
    $('.colParticipantes').removeClass('d-none');
});
$(window).on('resize', function () {
    if ($(window).width() >= 768) {
        console.log("Tela MD");
        $('.colInsumos, .colServicos, .colParticipantes').removeClass('d-none');
        $('.colInsumos, .colServicos, .colParticipantes').addClass('col-md-4');
        $('.colInsumos, .colServicos, .colParticipantes').removeClass('col-md-3');
        $('.colInsumos, .colServicos, .colParticipantes').removeClass('col-md-6');
        telaMD = true;
    } else if (telaMD === true) {
        console.log("Tela SM");
        $('.colInsumos, .colServicos').addClass('d-none');
        telaMD = false;
    }
});

// * Blur nos outros accordions quando o botão em algum estiver em hover 
$('#collectionInsumos').hover(
    () => { $('.accordionParticipantes, .accordionServicos').toggleClass('blur') }
)
$('#collectionParticipantes').hover(
    () => { $('.accordionInsumos, .accordionServicos').toggleClass('blur')}
)
$('#collectionServicos').hover(
    () => { $('.accordionInsumos, .accordionParticipantes').toggleClass('blur') }
)
// > Se tiver 2 true o outro automaticamente será none
var expandidos = [false, false, false]
var elementos = [$('.colParticipantes'), $('.colInsumos'), $('.colServicos'),]
$('#collectionParticipantes').on('click', () => {
    if (window.matchMedia("(max-width: 767px)").matches) return;
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
    if (window.matchMedia("(max-width: 767px)").matches) return;
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
    if (window.matchMedia("(max-width: 767px)").matches) return;
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