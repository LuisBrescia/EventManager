// É necessário realizar um casting de JSON para dicionário javascript
const dadosEvento = JSON.parse(localStorage.getItem('dadosEvento'));

// Toda vez que a página for carregada, o código abaixo será executado.
document.getElementById('orcamento').textContent = dadosEvento.orcamento;
document.getElementById('convidados').textContent = dadosEvento.convidados;
document.getElementById('area').textContent = dadosEvento.area;
