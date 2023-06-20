function Tarefa(_id, titulo, concluida) {
    this._id = _id;
    this.titulo = titulo;
    this.concluida = concluida;
}

var TAM = 12; // * Quantidade máxima de tarefas
var editaTodo = false; // * Salva se a lista está em modo de edição
var ListaTarefas = JSON.parse(localStorage.getItem("ListaTarefas")) || []; // * Será um vetor de objetos do tipo Tarefa

function carregaTarefas() {

    var tarefasConcluidas = 0;

    $('#todoConteudo li').remove();
    
    if (ListaTarefas == null) {return;}

    for (let i = 0; i < ListaTarefas.length; i++) {
        
        tarefaCarregada = criaHtmlTarefa(ListaTarefas[i], false);

        selectAll(tarefaCarregada.find('h6')[0]);
        nomeTarefa(tarefaCarregada);
        excluirTarefa(tarefaCarregada);
        estadoTarefa(tarefaCarregada);
        
        if (ListaTarefas[i].concluida == true) {
            tarefaCarregada.find('[type="checkbox"]').prop('checked', true);
            tarefaCarregada.addClass('concluido');
            tarefasConcluidas++;
        }
        $('#todoConteudo').append(tarefaCarregada);
    }

    console.log("Tarefas concluidas: ", tarefasConcluidas, " de ", ListaTarefas.length);
    var porcentagem = (tarefasConcluidas / ListaTarefas.length) * 100;
    // Desejo descartar as casas decimais
    porcentagem = Math.floor(porcentagem);
    console.log("Porcentagem de tarefas concluidas: ", porcentagem, "%");
    // .progress-bar
    $('.progress-bar').css('width', porcentagem + '%');
    $('.porcentagemConcluida').text(porcentagem + '%');
}

$(document).ready(() => {
    carregaTarefas();
    $('#adicionaTarefa').click(() => {

        if ($('#todoConteudo li').length >= TAM) { // * Máximo de 12 tarefas
            $('.toast-body').text('Você atingiu o limite de tarefas');
            $('.toast').toast('show');
            return;
        }

        if (editaTodo) { // * Caso esteja em modo de edição, desativa
            $('#todoConteudo li h6').prop('contenteditable', 'false');
            $('#todoConteudo .dadoTarefa').css('margin-left', '0px');
            $('.excluirTarefa').toggleClass('d-none');
            $('#editaTodo').toggleClass('active');
            editaTodo = !editaTodo;
        }

        var index = $('#todoConteudo li').length;
        
        var tarefinha= new Tarefa(0, "Random", false);
        novaTarefa = criaHtmlTarefa(tarefinha, true);

        $('#todoConteudo').prepend(novaTarefa);
        $('#todoConteudo li:first-child h6').focus();

        console.log("Número de tarefas existentes é", index);

        selectAll(novaTarefa.find('h6')[0]);
        nomeTarefa(novaTarefa);
        excluirTarefa(novaTarefa);
        estadoTarefa(novaTarefa);

        ListaTarefas.unshift(tarefinha);
        localStorage.setItem("ListaTarefas", JSON.stringify(ListaTarefas));

        atualizaBarraProgresso();
    });
    $('#editaTarefa').click(() => {
        if (editaTodo == false) {
            $('#todoConteudo li h6').prop('contenteditable', 'true');
            $('#todoConteudo .dadoTarefa').css('margin-left', '25px');
        } else {
            $('#todoConteudo li h6').prop('contenteditable', 'false');
            $('#todoConteudo .dadoTarefa').css('margin-left', '0px');
        }
        $('.excluirTarefa').toggleClass('d-none');
        $('#editaTarefa').toggleClass('active');
        editaTodo = !editaTodo;
    });
    // > Assinatura não descritiva
    $('#todoConteudo').on('click', 'h6', () => {
        if ($(this).find('h6').prop('contenteditable') == 'true') {
            $(this).find('h6').focus();
            selectAll($(this).find('h6')[0]);
            todoTitulo($(this));
        }
    });
    // $('#todoConteudo [type="checkbox"]').click(function () {
    //     $(this).closest('li').toggleClass('concluido');
    //     ListaTarefas[$(this).closest('li').index()].concluida = true;
    // });
});

// * Função ativa enquanto o usuário estiver editando o título de uma tarefa
function nomeTarefa(element) {
    //$('#todoConteudo li:first-child')
    element.find('h6').on('blur', function () {
        if (!editaTodo) {element.find('h6').prop('contenteditable', 'false');}
        ListaTarefas[element.index()].titulo = element.find('h6').text();
        localStorage.setItem("ListaTarefas", JSON.stringify(ListaTarefas));
    });
    element.find('h6').keydown(function (e) {
        if ((element.find('h6').width() > 400 && (e.keyCode != 8 && !isTextSelected(element.find('h6')[0]))) 
        || e.keyCode === 13) {
            e.preventDefault();
        }
    });
    element.find('h6').on('click', function () {
        selectAll(element.find('h6')[0]);
    });
}
// * Muda o estado de uma tarefa já salvando seu novo estado no localStorage
function estadoTarefa(element) {
    element.find('[type="checkbox"]').click(function () {
        console.log("Alterado o estado da tarefa: ", $(this).closest('li').index());
        $(this).closest('li').toggleClass('concluido');
        ListaTarefas[$(this).closest('li').index()].concluida = !ListaTarefas[$(this).closest('li').index()].concluida;
        localStorage.setItem("ListaTarefas", JSON.stringify(ListaTarefas));
        atualizaBarraProgresso(); 
    });
}
// * Função que exclui uma tarefa
function excluirTarefa(element) {
    element.find('.excluirTarefa').click(function () {
        if ($('#todoConteudo li').length <= 1) {
            $('.toast-body').text('Você não pode excluir todas as tarefas');
            $('.toast').toast('show');
            return;
        }
        console.log("Tarefa excluida: ", $(this).closest('li').index());
        ListaTarefas.splice($(this).closest('li').index(), 1);
        localStorage.setItem("ListaTarefas", JSON.stringify(ListaTarefas));
        $(this).closest('li').remove();
        atualizaBarraProgresso();
    });
}
// * HTML de uma tarefa
function criaHtmlTarefa(tarefa, editavel) {
    return $(
        `<li class="list-group-item py-2">
            <div class="row align-items-center no-gutters">
                <div class="col me-2 dadosTarefa p-0">
                    <i class="bi-trash text-secondary position-absolute excluirTarefa d-none" ms-3></i>
                    <h6 class="dadoTarefa mb-0 fw-bolder" style="z-index: 1" contenteditable="${editavel}">${tarefa.titulo}</h6>
                </div>
                <div class="col-auto">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="formCheck-1">
                        <label class="form-check-label" for="formCheck-1"></label>
                    </div>
                </div>
            </div>
        </li>`);
}
function atualizaBarraProgresso() {
    var tarefasConcluidas = 0;
    for (let i = 0; i < ListaTarefas.length; i++) {
        if (ListaTarefas[i].concluida == true) {
            tarefasConcluidas++;
        }
    }
    var porcentagem = (tarefasConcluidas / ListaTarefas.length) * 100;
    porcentagem = Math.floor(porcentagem); // * Descartar casas decimais 
    console.log("Porcentagem de tarefas concluidas: ", porcentagem, "%");
    $('.progress-bar').css('width', porcentagem + '%');
    $('.porcentagemConcluida').text(porcentagem + '%');
}

// * Permite selecionar todo o texto de um element
function selectAll(element) {
    if (document.body.createTextRange) { // Suporte para Internet Explorer
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) { // Suporte para navegadores modernos
        var range = document.createRange();
        range.selectNodeContents(element);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
// * Permite alterar o título caso conteúdo esteja inteiramente selecionado
function isTextSelected(element) {
    let selection = window.getSelection();
    let selectedText = selection.toString();
    let elementText = element.textContent;
    return selectedText === elementText;
}

//     elemento.find('span').prop('contenteditable', 'true');
//     selectAll(elemento.find('span')[0]);
//     elemento.find('span').keydown(function (e) {
//         if (e.keyCode === 13) {
//             e.preventDefault();
//         }
//         if (elemento.find('span').text().length > 35 && e.keyCode != 8) {
//             e.preventDefault();
//         }
//     });
//     elemento.find('span').on('blur', function () {
//         elemento.find('span').prop('contenteditable', 'false');
//     });