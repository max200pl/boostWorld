document.getElementById("header").onmouseover = function (event) {
     var target = event.target; //элемент на котором произошел клик
     
     if (target.id !== 'header') { //target.id != 'active-header' &&
          //closeMenu()
     }
     if (target.id == 'active-header') {
          document.getElementById("navbar").style.display = "flex";
     }
}

function closeMenu() {
     const menu = document.getElementById("navbar");
     menu.style.display = "none";
}



