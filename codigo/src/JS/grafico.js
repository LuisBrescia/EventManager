// > Aqui irei colocar toda a lógica por tras da página de resultado
// > Na página de resultados deverá ter uma checklist onde o usuário deverá conseguir 
// > criar novos itens e marcar os que já foram feitos
// > Na parte cima da tela tem 2 "Cards" confirmados, CustO e Progresso, muito provavelmente
// > Terá Chamados ativos também

import './bootstrap.js';
import 'jquery-ui-dist/jquery-ui';
import * as bootstrap from 'bootstrap';

// https://cdn.jsdelivr.net/npm/chart.js
import Chart from 'chart.js/auto';

class ListaParticipantes {
    constructor(titulo, elementos, percentual) {
        this.titulo = titulo;
        this.elementos = elementos;
        this.percentual = percentual;
    }
}

class Chamado {
    constructor(titulo, valor, percentual) {
        this.titulo = titulo;
        this.valor = valor;
        this.percentual = percentual;
    }
}

// * Aqui eu tenho todas as listas de participantes do usuário
var ListasParticipantes = JSON.parse(localStorage.getItem("ListaParticipantes")) || [];
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

if (graficoParticipantes.length == 0) {
    graficoParticipantes[0] = new ListaParticipantes("Crie listas de Participantes para o gráfico ser exibido", 100, 100);
}

// * Aqui começa o código do gráfico
$('.valor-P h6').text("Participantes (" + totalParticipantes + ")");

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

// ! Gráfico de gastos
var Chamados = JSON.parse(localStorage.getItem("Chamados")) || [];
let totalGastos = 0;
let custoTotal = 0;

var backgroundColors2 = ["#0088ff", "#1066ff", "#0044ff", "#0224d0", "#0020a0", "#016"];
backgroundColors2.reverse();

for (let i = 0; i < Chamados.length; i++) {
    if (Chamados[i].valor > 0) {
        totalGastos++;
        custoTotal += parseInt(Chamados[i].valor);
    }
}

console.log("Custo total é", custoTotal);

$('.valor-S h6').text("Gastos (" + totalGastos + ")");

var graficoChamados = [];

var k = -1;
for (let i = 0; i < Chamados.length; i++) {
    if (Chamados[i].valor > 0) {
        graficoChamados[++k] = new Chamado(Chamados[i].titulo, Chamados[i].valor, 0);
        graficoChamados[k].percentual = (graficoChamados[k].valor / custoTotal) * 100;
        graficoChamados[k].titulo += " R$ " + graficoChamados[k].valor;
    }
}

if (graficoChamados.length == 0) {
    graficoChamados[0] = new Chamado("Insira valores nos chamados para visualizar o gráfico de Gastos.", 100, 100);
}

var data = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: backgroundColors2,
        pattern: {
            src: backgroundImageUrl,
            repeat: 'repeat'
        }
    }]
};

for (var i = 0; i < graficoChamados.length; i++) {
    data.labels.push(graficoChamados[i].titulo);
    data.datasets[0].data.push(graficoChamados[i].percentual);
}

var options = {
    responsive: true
};

var ctx = document.getElementById("graficoChamados").getContext("2d");

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