const telaInterface = document.getElementById("exibeInterface")
const nomeInterface = document.getElementById("interfaceNome")

// Função que abre a página de convidados
function exibeInterface(botao){
    telaInterface.style.display = "block";
    nomeInterface.textContent = botao.innerHTML;
}
function fechaInterface(){
    telaInterface.style.display = "none";
}

function confirma(botao){
    let action = botao.innerHTML;
    action = action.toLowerCase();
    // Remover os 2 últimos caracteres da string
    action = action.substring(0, action.length - 2);
    action = action + "ido";
    action = action.charAt(0).toUpperCase() + action.slice(1);
    window.alert(action + " com sucesso.")
}
