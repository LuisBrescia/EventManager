// É necessário realizar um casting de JSON para dicionário javascript
const dadosEvento = JSON.parse(localStorage.getItem('dadosEvento'));

document.getElementById('convidados').textContent = dadosEvento.convidados;
document.getElementById('custoConvidado').textContent = Math.round(dadosEvento.orcamento / dadosEvento.convidados);
document.getElementById('area').textContent = dadosEvento.area;

// Toda vez que a página for carregada, o código abaixo será executado.
document.getElementById('orcamento').textContent = "R$" + dadosEvento.orcamento + ",00";
document.getElementById('convidados').textContent = dadosEvento.convidados;
document.getElementById('custoConvidado').textContent = Math.round(dadosEvento.orcamento / dadosEvento.convidados);
document.getElementById('area').textContent = dadosEvento.area;

// for (const i in dadosEvento) {
//     if (dadosEvento[i] == "") {
//       document.getElementById(i).textContent = "Não informado"; 
//     } else {
//       document.getElementById(i).textContent = dadosEvento[i];
//     }
// }

/*
> Futuras implementações
document.getElementById('nome').textContent = dadosEvento.nome;
document.getElementById('data').textContent = dadosEvento.data;
document.getElementById('comida').textContent = dadosEvento.comida;
document.getElementById('bebidas').textContent = dadosEvento.bebidas;
*/