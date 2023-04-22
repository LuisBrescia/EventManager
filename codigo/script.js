const btn = document.querySelector("#send");

btn.addEventListener("click", function(e){

    e.preventDefault();
    
    const name = document.querySelector("#Convidados");
    const value = name.value;
    console.log(value);
})