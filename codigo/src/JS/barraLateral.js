var menuAtivo = true;
var allowCtrl = true;
const primariaN1 = "#00ffff";
const primaria = "#0044ff";
const primaria1 = "#0044fe";
const primaria2 = "#003bfb";
const primaria3 = "#0033ee";

import './bootstrap.js';
import 'jquery-ui-dist/jquery-ui';

$('#menu').on('click', () => {
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
    $('.ultraGambiarra').toggleClass('d-none');
    $('aside').toggleClass('active');
    menuAtivo = !menuAtivo;
});

// * Atalho: Ctrl + B
$(document).on('keydown', function (e) {
    if (e.ctrlKey && e.keyCode === 66 && allowCtrl) {
        console.log('ctrl');
        allowCtrl = false;
        menuAtivo = !menuAtivo;
        // * Caso uma elemento da classe .funcionalides tenha a classe col-xll-10, mudar para col-xll-12

        $('.barraLista').toggleClass('col-xxl-10 col-xxl-12');
        $('.ultraGambiarra').toggleClass('d-none');
        $('aside').toggleClass('active');

    }
});

$(document).on('keyup', function (e) {
    if (e.ctrlKey || e.keyCode === 66) {
        allowCtrl = true;
    }
});
