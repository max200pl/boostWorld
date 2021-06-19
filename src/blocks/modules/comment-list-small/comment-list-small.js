

const button__prev = document.querySelector('.slider__control_prev');
const button__next = document.querySelector('.slider__control_next');

const item = document.querySelectorAll('.slider__item');
const slider = document.querySelector('.slider__items');

let counter = 0;
let maxItem = item.length;

let widthItem = item[0].clientWidth;

/**
 * Подстройка области просмотра при изменении ширины экрана 
*/
window.addEventListener('resize', () =>
{
  if (item[0].clientWidth !== widthItem) widthItem = item[0].clientWidth;
  slider.style.transform = 'translateX(' + `${-widthItem * counter}px)`;
});

/**
 * Добавление класса active к появляющемуся item 
*/
function addedActive(index)
{
  console.log(index);

  for (var i = 0; i < maxItem; i++) {
    item[i].classList.remove("active");
  }

  item[index].classList.add("active");
}


button__next.addEventListener("click", () =>
{
  counter >= item.length - 1 ? (counter = - 1) : null;
  slider.classList.add("transformAnim");
  counter++
  slider.style.transform = 'translateX(' + `${-widthItem * counter}px`;
  addedActive(counter);
});
button__prev.addEventListener("click", () =>
{
  slider.classList.add("transformAnim");
  if (counter <= 0) counter = item.length
  counter--
  slider.style.transform = 'translateX(' + `${-widthItem * counter}px`;
  addedActive(counter);
});





/* item[it+1].classList.add("active"); */