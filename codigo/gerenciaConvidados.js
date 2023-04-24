const divConvidados = document.getElementById("exibeJanela")

function exibeConvidados(){
    if(divConvidados.style.display === "block"){
       divConvidados.style.display = "none";
      }
      else{
         divConvidados.style.display = "block";
    }
}