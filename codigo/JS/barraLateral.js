var menuAtivo = true;
var allowCtrl = true;

// * No momento #salvaCard está sendo utilizado para esconder o menu lateral
$('#salvaCard').on('click', () => {  
    console.log('salvaCard');
    $('aside').toggleClass('active');
    $('#salvaCard span').toggleClass('rodar');
    $('.card-container').removeClass('mover');
    menuAtivo = !menuAtivo;
});

// * Atalho: Ctrl + B
$(document).on('keydown', function (e) {
    if (e.ctrlKey && e.keyCode === 66 && allowCtrl) {
        console.log('ctrl');
        $('aside').toggleClass('active');
        $('#salvaCard span').toggleClass('rodar');
        allowCtrl = false;
    }
});

$(document).on('keyup', function (e) {
    if (e.ctrlKey || e.keyCode === 66) {
        allowCtrl = true;
    }
});
