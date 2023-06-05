// > Aqui irei colocar toda a lógica por tras da página de resultado

// > Na página de resultados deverá ter uma checklist onde o usuário deverá conseguir 
// > criar novos itens e marcar os que já foram feitos

// > Na parte cima da tela tem 2 "Cards" confirmados, CustO e Progresso, muito provavelmente
// > Terá Chamados ativos também

// : Começando com o gráfico pizza referente a participantes
// Aqui eu tenho todas as listas de participantes do usuário
var ListasParticipantes = JSON.parse(localStorage.getItem("ListaParticipantes"));
console.log("Número de listas:", ListasParticipantes.length);
console.log(ListasParticipantes);
// ListasParticipantes[0] = Primeira Lista 
// ListasParticipantes[0].linhas[0] = Primeiro Participante da Primeira Lista

// : graficoPizza será nosso vetor onde conterá as listas de participantes devidamente formatadas
var graficoParticipantes = [];

class ListaParticipantes {
    constructor(titulo, elementos, percentual) {
        this.titulo = titulo;
        this.elementos = elementos;
        this.percentual = percentual;
    }
}

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

var totalParticipantes = 0; // Vai me dizer quantos participantes tem no total
for (let i = 0; i < graficoParticipantes.length; i++) {
    totalParticipantes += graficoParticipantes[i].elementos;
}
console.log("Total de participantes:", totalParticipantes);

// Se pegar o número de participantes de cada lista e dividir pelo total de participantes
// Teremos o percentual de cada lista

for (let i = 0; i < graficoParticipantes.length; i++) {
    graficoParticipantes[i].percentual = (graficoParticipantes[i].elementos / totalParticipantes) * 100;
    console.log(graficoParticipantes[i].titulo, graficoParticipantes[i].percentual);
}

// Dados para o gráfico
var data = {
    labels: [],
    datasets: [{
        data: [],
        // backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        backgroundColor: ["#04f", "#f04", "#0d0"]
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
    type: "doughnut",
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
scatter
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