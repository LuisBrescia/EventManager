var menuAtivo  =      true;
var allowCtrl  =      true;
var primariaN1 = "#ffa07d";
var primaria1  = "#ff4400";
var primaria2  = "#fe4400";
  
// $('#azul').on('click', () => {

// * No momento #salvaCard está sendo utilizado para esconder o menu lateral
$('#salvaCard').on('click', () => {   
    if (menuAtivo) {
        console.log('Menu Fechado');
    } else {
        console.log('Menu Aberto');
        $('.card-container').find('.mover').each(function() {
            console.log('MoverRemovido pois menu aberto');
            $(this).removeClass('mover');
            $(this).find('.card-header').css('background-color', '#fff');
            $(this).css({
                'transition': 'all 0.3s',
                'left': '200%'
            });
            setTimeout(() => {
                $(this).css('transition', '0s');
            }, 100);    
        });
    }
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
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance($('#liveToast'));
        toastBootstrap.show();
        setTimeout(() => { toastBootstrap.hide(); }, 99999);
    }
});

$(document).on('keyup', function (e) {
    if (e.ctrlKey || e.keyCode === 66) {
        allowCtrl = true;
    }
});
