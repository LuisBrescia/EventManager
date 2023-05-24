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
