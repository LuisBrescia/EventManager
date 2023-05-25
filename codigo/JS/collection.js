function executeOnScreenResize() {
    if (window.matchMedia("(min-width: 768px)").matches) {
        $('.colParticipantes').removeClass('d-none');
        $('.colInsumos').removeClass('d-none');
        $('.colServicos').removeClass('d-none');
    } else {
        $('#collectionParticipantes').on('click', function () {
            $('.colParticipantes').addClass('d-none');
            $('.colInsumos').removeClass('d-none');
        });
        $('#collectionInsumos').on('click', function () {
            $('.colInsumos').addClass('d-none');
            $('.colServicos').removeClass('d-none');
        });
        $('#collectionServicos').on('click', function () {
            $('.colServicos').addClass('d-none');
            $('.colParticipantes').removeClass('d-none');
        });
    }

}

executeOnScreenResize();

$(window).on('resize', function () {
    executeOnScreenResize();
});

$('#collectionInsumos').hover(
    () => { $('.accordionParticipantes').toggleClass('blur'); $('.accordionServicos').toggleClass('blur') }
)
$('#collectionParticipantes').hover(
    () => { $('.accordionInsumos').toggleClass('blur'); $('.accordionServicos').toggleClass('blur') }
)
$('#collectionServicos').hover(
    () => { $('.accordionInsumos').toggleClass('blur'); $('.accordionParticipantes').toggleClass('blur') }
)

// > Se tiver 2 true o outro automaticamente será none
var expandidos = [false, false, false]
var elementos = [$('.colParticipantes'), $('.colInsumos'), $('.colServicos'),]

$('#collectionParticipantes').on('click', () => {

    elementos[1].toggleClass('col-md-4');
    elementos[1].toggleClass('col-md-3');
    elementos[2].toggleClass('col-md-4');
    elementos[2].toggleClass('col-md-3');
    elementos[0].toggleClass('col-md-6');
    elementos[0].toggleClass('col-md-4');

    if (expandidos[0] === true) {
        expandidos[0] = false;
        console.log("Partipantes expandido");
        elementos[1].removeClass('d-none');
        elementos[2].removeClass('d-none');
    } else {
        expandidos[0] = true;
        console.log("Partipantes minimizado");
        if (expandidos[1] === true) {
            elementos[2].addClass('d-none');
        } else if (expandidos[2] === true) {
            elementos[1].addClass('d-none');
        }
    }
});
$('#collectionInsumos').on('click', () => {
    elementos[0].toggleClass('col-md-4');
    elementos[0].toggleClass('col-md-3');
    elementos[2].toggleClass('col-md-4');
    elementos[2].toggleClass('col-md-3');
    elementos[1].toggleClass('col-md-4');
    elementos[1].toggleClass('col-md-6');

    if (expandidos[1] === true) {
        expandidos[1] = false;
        console.log("Insumos minimizado");
        elementos[0].removeClass('d-none');
        elementos[2].removeClass('d-none');
    } else {
        expandidos[1] = true;
        console.log("Insumos expandido");
        if (expandidos[0] === true) {
            elementos[2].addClass('d-none');
        } else if (expandidos[2] === true) {
            elementos[0].addClass('d-none');
        }
    }
});
$('#collectionServicos').on('click', () => {

    elementos[0].toggleClass('col-md-4');
    elementos[0].toggleClass('col-md-3');
    elementos[1].toggleClass('col-md-4');
    elementos[1].toggleClass('col-md-3');
    elementos[2].toggleClass('col-md-4');
    elementos[2].toggleClass('col-md-6');

    if (expandidos[2] === true) {
        expandidos[2] = false;
        console.log("Insumos minimizado");
        elementos[0].removeClass('d-none');
        elementos[1].removeClass('d-none');
    } else {
        expandidos[2] = true;
        console.log("Insumos expandido");
        if (expandidos[0] === true) {
            elementos[1].addClass('d-none');
        } else if (expandidos[1] === true) {
            elementos[0].addClass('d-none');
        }
    }
});
