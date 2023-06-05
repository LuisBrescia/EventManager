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

var k = 0;
for (let i = 0; i < 6; i++) {
    if (ListasParticipantes[i] != null) {
        if (ListasParticipantes[i].linhas[0] != "") {
            graficoParticipantes[k] = new ListaParticipantes(ListasParticipantes[i].titulo, ListasParticipantes[i].linhas.length, 0);
            if (ListasParticipantes[i].linhas[ListasParticipantes[i].linhas.length - 1] == "") {
                graficoParticipantes[k].elementos--;
            }
            graficoParticipantes[k].titulo += " (" + graficoParticipantes[k].elementos + ")";
            k++;
        }
    }
}

var totalParticipantes = 0; 
for (let i = 0; i < graficoParticipantes.length; i++) {
    totalParticipantes += graficoParticipantes[i].elementos;
}

// Se pegar o número de participantes de cada lista e dividir pelo total de participantes
// Teremos o percentual de cada lista

for (let i = 0; i < graficoParticipantes.length; i++) {
    graficoParticipantes[i].percentual = (graficoParticipantes[i].elementos / totalParticipantes) * 100;
    console.log(graficoParticipantes[i].titulo, graficoParticipantes[i].percentual);
}

var data = {
    labels: [],
    datasets: [{
        data: [],
        // backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        backgroundColor: ["#04f", "#f40", "#0f4", "#fd0", "#a0d", "#f04"]
    }]
};
for (var i = 0; i < graficoParticipantes.length; i++) {
    data.labels.push(graficoParticipantes[i].titulo);
    data.datasets[0].data.push(graficoParticipantes[i].percentual);
}
// Opções do gráfico
var options = {
    responsive: true
};
$('.graficoPizza h6').text("Participantes (" + totalParticipantes + ")");
// Renderizar o gráfico
var ctx = document.getElementById("graficoParticipantes").getContext("2d");
var myChart = new Chart(ctx, {
    type: "pie",
    data: data,
    options: options
});

/* 
TIPOS DE GRÁFICOS
pie
doughnut
polarArea
bar
line
radar
bubble
scatter
*/
var editaTodo = false;

$(document).ready(function () {
    $('#adicionaTodo').click(function () {
        $('#todoConteudo li h6').prop('contenteditable', 'false');
        editaTodo = false;
        novaTarefa = $(
            '<li class="list-group-item py-2">'
            + '<div class="row align-items-center no-gutters">'
            + '<div class="col me-2">'
            + '<h6 class="mb-0 fw-bolder bg-gradient" contenteditable="true">Título da tarefa</h6>'
            // + '<br>&nbsp;&nbsp;&nbsp;'
            // +'<span class="text-xs" contenteditable="false">Descrição:</span>'
            + '</div>'
            + '<div class="col-auto">'
            + '<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-1"><label'
            + 'class="form-check-label" for="formCheck-1"></label></div>'
            + '</div>'
            + '</div>'
            + '</li>');

        $('#todoConteudo').prepend(novaTarefa);
        $('#todoConteudo li:first-child h6').focus();

        selectAll($('#todoConteudo li:first-child h6')[0]);
        todoTitulo($('#todoConteudo li:first-child'));
        // Caso aperte a tecla ENTER, o foco vai para o próximo item
        // Caso saia do titulo 


    });
    $('#editaTodo').click(function () {
        if (editaTodo == false) {
            $('#todoConteudo li h6').prop('contenteditable', 'true');
        } else {
            $('#todoConteudo li h6').prop('contenteditable', 'false');
        }
        $('#editaTodo').toggleClass('active');
        editaTodo = !editaTodo;
    });
    // Só sera clicavel se o contenteditable estiver como true
    $('#todoConteudo').on('click', 'h6', function () {
        if ($(this).find('h6').prop('contenteditable') == 'true') {
            $(this).find('h6').focus();
            selectAll($(this).find('h6')[0]);
            todoTitulo($(this));
        }
    });
});

// * Função ativa enquanto o usuário estiver editando o título de uma tarefa
function todoTitulo(elemento) {
    elemento.find('h6').on('blur', function () {
        if (!editaTodo) {
            elemento.find('h6').prop('contenteditable', 'false');
        }
    });
    elemento.find('h6').keydown(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            elemento.find('span').prop('contenteditable', 'true');
            elemento.find('span').prop('contenteditable', 'true');
            selectAll(elemento.find('span')[0]);
            elemento.find('span').keydown(function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                }
                if (elemento.find('span').text().length > 35 && e.keyCode != 8) {
                    e.preventDefault();
                }
            });
            elemento.find('span').on('blur', function () {
                elemento.find('span').prop('contenteditable', 'false');
            });
        }
        if (elemento.find('h6').text().length > 40 && e.keyCode != 8) {
            e.preventDefault();
        }
    });
    elemento.find('h6').on('blur', function () {
        if (!editaConteudo) {
            elemento.find('h6').prop('contenteditable', 'false');
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