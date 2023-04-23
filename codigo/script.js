const botaoCalcular = document.querySelector("#send");

botaoCalcular.addEventListener("click", (e) =>{
    e.preventDefault();
    
    const value = document.querySelector("#Convidados").value;
    console.log(value);
})
