/* Em vez de ficarmos colocando document.querySelector toda hora,
podemos criar uma variável que armazena o valor do document.querySelector e depois só chamamos a variável.*/
const quantoFica = document.querySelector("#enviarCalculo");

// Aqui estamos criando uma função que será executada quando o botão for clicado.
quantoFica.addEventListener("click", () =>{

    // Mesma idéia do de cima, no casso aqui estamos pegando o valor de TODOS os inputs.
    const inputs = document.querySelectorAll('input');

    // Criamos um dicionário vazio onde o index será o nome do input e o valor será o valor do input;
    const data = {};

    // Irá rodar para cada input que tivermos.
    inputs.forEach(input => {
      data[input.name] = input.value;
    });

    // Estamos basicamente pegando o dicionário "data", e transformando ele em um arquivo JSON, como se fosse um casting.
    const jsonData = JSON.stringify(data);

    // Com o json criado, basta salvar no localStorage do navegador
    localStorage.setItem('dadosEvento', jsonData);
    const dadosEvento = localStorage.getItem('dadosEvento');
    console.log(dadosEvento);
})