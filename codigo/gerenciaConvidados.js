const divConvidados = document.getElementById("exibeJanela")

// Função que abre a página de convidados
function exibeConvidados(){
    if(divConvidados.style.display === "block"){
       divConvidados.style.display = "none";
      }
      else{
         divConvidados.style.display = "block";
    }
}
