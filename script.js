import * as v from "./modules/variables.js"

function confirm(formDisplay, divDisplay) {
  v.form.style.display = formDisplay;
  v.section.classList.toggle("completed");
  v.div.style.display = divDisplay;
}

v.inputName.addEventListener("keyup", (e) => {
  
  if (!/^[A-Za-z\s]+$/.test(e.target.value) && e.key != "Backspace") {
    v.inputName.style.marginBottom = "0.4rem"
    v.errorCardholderName.textContent = "Inserisci solo lettere"
    v.errorCardholderName.style.marginBottom = "1.075rem"
    v.inputName.blur()
    v.inputName.style.borderColor = "red"
  } else {
    v.errorCardholderName.textContent = ""
    v.name.textContent = e.target.value.toUpperCase()
    v.errorCardholderName.style.marginBottom = 0
    v.inputName.style.borderColor = v.colorInput
  }
})

v.nrCardInput.addEventListener("keyup", (e) => {
  let value = e.target.value;
  if (!/^\d+$/.test(value) && e.key != "Backspace" && e.key != "Tab") {
    v.nrCardInput.style.marginBottom = "0.4rem"
    v.errorNrCard.textContent = "Inserisci solo numeri"
    v.errorNrCard.style.marginBottom = "1.075rem"
    v.nrCardInput.blur()
    v.nrCardInput.style.borderColor = "red"
  } else {
    v.errorNrCard.textContent = ""
    v.nrCardInput.style.borderColor = v.colorInput
    v.nrCard[0].textContent = value.slice(0, 4) || '0000';
    v.nrCard[1].textContent = value.slice(4, 8) || '0000';
    v.nrCard[2].textContent = value.slice(8, 12) || '0000';
    v.nrCard[3].textContent = value.slice(12, 16) || '0000';
  }

})

v.mounth.addEventListener("keyup", (e) => {
  v.expireMonth.textContent = e.target.value
  if (e.key != "Tab" && e.target.value) {
    if (v.expireMonth.textContent > 12) {
      v.errorMonth.textContent = "Il mese dev'essere minore o uguale a 12"
      v.inputs.forEach(input => {
        input.style.marginBottom = "0.4rem";
      });
    } else {
      v.errorMonth.textContent = ""
      v.inputs.forEach(input => {
        input.style.marginBottom = "1.075rem";
      });
    }
  } else {
    v.expireMonth.textContent = "00"
  }
})

v.year.addEventListener("keyup", (e) => {
  if (e.key != "Tab") {
    v.expireYear.textContent = e.target.value
  }
})

v.cvvInput.addEventListener("keyup", (e) => {
  if (e.key != "Tab") {
    v.cvv.textContent = e.target.value
  }
})

v.confirmBtn.addEventListener("click", (e) => {
  e.preventDefault()
  if (v.form.checkValidity()) {
    confirm('none', 'flex')
  } else {
    v.form.classList.add("error")

  }
})

v.continueBtn.addEventListener("click", () => {
  confirm('flex', 'none')
  
  // form reset 
  v.form.classList.remove("error")
  v.form.reset();
  
  // reset visuale della carta ai valori di default
  if (typeof v.name !== 'undefined') v.name.textContent = 'JANE APPLESEED';
  if (v.nrCard && v.nrCard.length) {
    v.nrCard.forEach(span => span.textContent = '0000');
  }
  if (v.expireMonth) v.expireMonth.textContent = '00';
  if (v.expireYear) v.expireYear.textContent = '00';
  if (v.cvv) v.cvv.textContent = '000';
})