let acc = document.getElementsByClassName("ask__item-button");
console.log(acc);
let i = 0;

for (i = 0; i < acc.length; i++) {
     acc[i].addEventListener("click", function () {
          this.classList.toggle("active");
          let panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
               panel.style.maxHeight = null;
          } else {
               panel.style.maxHeight = panel.scrollHeight + "px";
          }
     });
}