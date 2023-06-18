// > Aqui irei colocar toda a lógica por tras da página de resultado
// > Na página de resultados deverá ter uma checklist onde o usuário deverá conseguir 
// > criar novos itens e marcar os que já foram feitos
// > Na parte cima da tela tem 2 "Cards" confirmados, CustO e Progresso, muito provavelmente
// > Terá Chamados ativos também

class ListaParticipantes {
    constructor(titulo, elementos, percentual) {
        this.titulo = titulo;
        this.elementos = elementos;
        this.percentual = percentual;
    }
}

// * Aqui eu tenho todas as listas de participantes do usuário
var ListasParticipantes = JSON.parse(localStorage.getItem("ListaParticipantes"));
// : graficoPizza será nosso vetor onde conterá as listas de participantes devidamente formatadas
var graficoParticipantes = [];

var k = -1;
var totalParticipantes = 0;

for (let i = 0; i < 6; i++) {
    if (ListasParticipantes[i] != null) {
        if (ListasParticipantes[i].linhas[0] != "") {
            graficoParticipantes[++k] = new ListaParticipantes(ListasParticipantes[i].titulo, ListasParticipantes[i].linhas.length, 0);
            // > Se o código de cardMovivel.js for revisado, será possível remover esse if
            // > Novas atualizações suportam, [-1] para pegar ultimo elemento do vetor
            if (ListasParticipantes[i].linhas[ListasParticipantes[i].linhas.length - 1] == "") {
                graficoParticipantes[k].elementos--;
            }
            totalParticipantes += graficoParticipantes[k].elementos;
            graficoParticipantes[k].titulo += " (" + graficoParticipantes[k].elementos + ")";
        }
    }
}
// ? O número de participantes dividido pelo total de participantes nos da o percentual
for (let i = 0; i < k + 1; i++) {
    graficoParticipantes[i].percentual = (graficoParticipantes[i].elementos / totalParticipantes) * 100;
}

// * Aqui começa o código do gráfico
$('.graficoPizza h6').text("Participantes (" + totalParticipantes + ")");

var backgroundImageUrl = "data:image/svg+xml,%3Csvg width='44' height='12' viewBox='0 0 44 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 12v-2L0 0v10l4 2h16zm18 0l4-2V0L22 10v2h16zM20 0v8L4 0h16zm18 0L22 8V0h16z' fill='%230088ff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E";
var backgroundColors = ["#0088ff", "#1066ff", "#0044ff", "#0224d0", "#0020a0", "#016"];

var data = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: backgroundColors,
        pattern: {
            src: backgroundImageUrl,
            repeat: 'repeat'
        }
    }]
};

for (var i = 0; i < graficoParticipantes.length; i++) {
    data.labels.push(graficoParticipantes[i].titulo);
    data.datasets[0].data.push(graficoParticipantes[i].percentual);
}

var options = {
    responsive: true
};

var ctx = document.getElementById("graficoParticipantes").getContext("2d");
var myChart = new Chart(ctx, {
    type: "pie",
    data: data,
    options: options
});
/* TIPOS DE GRÁFICOS
pie
doughnut
polarArea
bar
line
radar
bubble
scatter */

// * Começa o código da checklist 
// ? Todo é como a lista é chamada
var editaTodo = false;

$(document).ready(function () {

    $('#adicionaTodo').click(function () {

        if ($('#todoConteudo li').length >= 12) { // * Máximo de 12 tarefas
            $('.toast-body').text('Você atingiu o limite de tarefas');
            $('.toast').toast('show');
            return;
        }

        if (editaTodo) {
            $('#todoConteudo li h6').prop('contenteditable', 'false');
            $('#todoConteudo .dadoTarefa').css('margin-left', '0px');
            $('.excluirTarefa').toggleClass('d-none');
            $('#editaTodo').toggleClass('active');
            editaTodo = !editaTodo;
        }

        novaTarefa = $(
            `<li class="list-group-item py-2">
            <div class="row align-items-center no-gutters">
            <div class="col me-2 dadosTarefa p-0">
            <i class="bi-trash text-secondary position-absolute excluirTarefa d-none" ms-3></i>
            <h6 class="dadoTarefa mb-0 fw-bolder" style="z-index: 1" contenteditable="true">Título da tarefa </h6>`
            // <br>&nbsp;&nbsp;&nbsp;
            // <span class="text-xs" contenteditable="false">Descrição:</span>
            + `</div>
            <div class="col-auto">
            <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-1"><label
            class="form-check-label" for="formCheck-1"></label></div>
            </div>
            </div>
            </li>`);

        $('#todoConteudo').prepend(novaTarefa);
        $('#todoConteudo li:first-child h6').focus();

        $('.excluirTarefa').click(function () {
            // Caso só tenha uma tarefa, não é possível excluir
            if ($('#todoConteudo li').length <= 1) {
                $('.toast-body').text('Você não pode excluir todas as tarefas');
                $('.toast').toast('show');
                return;
            }
            console.log('clicou');
            $(this).closest('li').remove();
        });

        selectAll($('#todoConteudo li:first-child h6')[0]);
        todoTitulo($('#todoConteudo li:first-child'));

        $('#todoConteudo [type="checkbox"]').click(function () {
            if ($(this).prop('checked') == true) {
                $(this).closest('li').addClass('concluido');
            } else {
                $(this).closest('li').removeClass('concluido');
            }
        });
    });

    $('#editaTodo').click(function () {
        if (editaTodo == false) {
            $('#todoConteudo li h6').prop('contenteditable', 'true');
            $('#todoConteudo .dadoTarefa').css('margin-left', '25px');
        } else {
            $('#todoConteudo li h6').prop('contenteditable', 'false');
            $('#todoConteudo .dadoTarefa').css('margin-left', '0px');
        }
        $('.excluirTarefa').toggleClass('d-none');
        $('#editaTodo').toggleClass('active');
        editaTodo = !editaTodo;
    });

    $('#todoConteudo').on('click', 'h6', function () {
        if ($(this).find('h6').prop('contenteditable') == 'true') {
            $(this).find('h6').focus();
            selectAll($(this).find('h6')[0]);
            todoTitulo($(this));
        }
    });

    $('#todoConteudo [type="checkbox"]').click(function () {
        $(this).closest('li').addClass('concluido');
    });
});

// > Preciso que quando um item da lista for criado, seja criado juto uma checkbox que quando clicada adiciona a classe concluido somente na h6 clicada
// > Porém antes, vou fazer um botão para excluir items da checklist
// > Antes ainda, vou fazer um toast que é ativado caso seja criado mais de 20 tarefas 

// * Função ativa enquanto o usuário estiver editando o título de uma tarefa
function todoTitulo(elemento) {

    elemento.find('h6').on('blur', function () {
        if (!editaTodo) {
            elemento.find('h6').prop('contenteditable', 'false');
        }
    });
    elemento.find('h6').keydown(function (e) {
        // * Código comentado abaixo se refere a descrição da tarefa
        // if (e.keyCode === 13) {
        //     e.preventDefault();
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
        // }
        // > Ideal seria largura em pixels
        if (elemento.find('h6').width() > 400 && (e.keyCode != 8 && !isTextSelected(elemento.find('h6')[0]))) {
            e.preventDefault();
        }
    });
}
/* 
* HTML de um item da lista
<li class="list-group-item">
    <div class="row align-items-center no-gutters">
        <div class="col me-2">
            <h6 class="mb-0"><strong>Lunch meeting</strong></h6><span class="text-xs">10:30 AM</span>
        </div>
        <div class="col-auto">
            <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-1"><label
                class="form-check-label" for="formCheck-1"></label></div>
        </div>
    </div>
</li>
*/
/*
var ListaParticipantesConfirmados = JSON.parse(localStorage.getItem("ListaParticipantesConfirmados"));
function ListaParticipantesConfirmados() {
    var ListaParticipantesConfirmados = [];
    for (var i = 0; i < ListaParticipantes.length; i++) {
        if (ListaParticipantes[i].Confirmado == true) {
            ListaParticipantesConfirmados.push(ListaParticipantes[i]);
        }
    }
    return ListaParticipantesConfirmados;
}
*/

// * Permite selecionar todo o texto de um elemento
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