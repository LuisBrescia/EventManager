$('#salvaCard').on('click', () => {  
    console.log('salvaCard');
    $('aside').toggleClass('active');
    $('#salvaCard span').toggleClass('rodar');
});
var allowCtrl = true;

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