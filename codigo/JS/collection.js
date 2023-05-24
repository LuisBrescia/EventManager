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

$('#collectionInsumos').hover (
    () => { $('.accordionParticipantes').toggleClass('blur'); $('.accordionServicos').toggleClass('blur')}
)
$('#collectionParticipantes').hover (
    () => { $('.accordionInsumos').toggleClass('blur'); $('.accordionServicos').toggleClass('blur') }
)
$('#collectionServicos').hover (
    () => { $('.accordionInsumos').toggleClass('blur'); $('.accordionParticipantes').toggleClass('blur') }
)

$('#collectionInsumos').on('click', () => {
    $('.colServicos').removeClass('col-md-4');
    $('.colServicos').addClass('col-md-3');
    $('.colParticipantes').removeClass('col-md-4');
    $('.colParticipantes').addClass('col-md-3');
    $('.colInsumos').removeClass('col-md-4');
    $('.colInsumos').addClass('col-md-6');
});
