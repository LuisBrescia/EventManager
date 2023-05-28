var menuAtivo = true;
var allowCtrl = true;
var primariaN1 = "#00ffff";
var primaria = "#0044ff";
var primaria1 = "#0044fe";
var primaria2 = "#003bfb";
var primaria3 = "#0033ee";

// $('#azul').on('click', () => {
// $('aside').css('margin-left', ($('aside').offsetWidth * -1) + 'px');




// * No momento #salvaCard está sendo utilizado para esconder o menu lateral
$('#salvaCard').on('click', () => {
    if (menuAtivo) {
        console.log('Menu Fechado');
    } else {
        console.log('Menu Aberto');
        $('.card-container').find('.mover').each(function () {
            console.log('MoverRemovido pois menu aberto');
            $(this).removeClass('mover');
            $(this).find('.card-header').css('background-color', '#fff');
            $(this).css({
                'transition': 'all 0.3s',
                'left': '300%'
            });
            setTimeout(() => {
                $(this).css('transition', '0s');
            }, 100);
        });
    }

    $('.barraLista').toggleClass('col-xxl-10 col-xxl-12');

    $('aside').toggleClass('active');
    menuAtivo = !menuAtivo;
});

// * Atalho: Ctrl + B
$(document).on('keydown', function (e) {
    if (e.ctrlKey && e.keyCode === 66 && allowCtrl) {
        console.log('ctrl');
        $('aside').toggleClass('active');
        $('#salvaCard span').toggleClass('rodar');
        allowCtrl = false;
        menuAtivo = !menuAtivo;
        // * Caso uma elemento da classe .funcionalides tenha a classe col-xll-10, mudar para col-xll-12

        $('.barraLista').toggleClass('col-xxl-10 col-xxl-12');

    }
});

$(document).on('keyup', function (e) {
    if (e.ctrlKey || e.keyCode === 66) {
        allowCtrl = true;
    }
});
