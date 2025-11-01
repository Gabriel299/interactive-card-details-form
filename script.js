let section = document.querySelector("section")
let form = document.querySelector("form")
let div = document.querySelector("section div:last-child")

function confirm(formDisplay, divDisplay) {
  form.style.display = formDisplay;
  section.classList.toggle("completed");
  div.style.display = divDisplay;
}