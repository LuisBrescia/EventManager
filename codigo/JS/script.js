// function movivel(elemento) {
//     elemento.draggable({
//         // containment: [
//         //     $("main").offset().left, 
//         //     $(".btn-group").outerHeight(), 
//         //     $(window).width() - $(".card").outerWidth() - 20, 
//         //     $(window).height() - $(".card").outerHeight() - 20 
//         // ],
//     })
// }
const sidebarItems = document.querySelectorAll("aside ul li");

sidebarItems.forEach(function (item) {
    item.addEventListener("click", function () {
        sidebarItems.forEach(function (item) {
            item.classList.remove("active");
        });
        this.classList.add("active");
    });
});
