import * as v from "./modules/variables.js"
import * as f from "./modules/functions.js"


// Inserimento dati sull'immagine della carta
v.inputName.addEventListener("keyup", (e) => {

  // Escludo alcuni tasti dal controllo
  if (e.key === "Tab" || e.key === "Backspace" || e.key === "Shift") return

  // Verifico attraverso una regex che non vengano inserite lettere
  if (/^[A-Za-z\s]+$/.test(e.target.value)) {
    f.resetInput(v.errorCardholderName, v.inputName)
    v.name.textContent = e.target.value.toUpperCase()
  } else {
    f.errorMessage(v.inputName, v.errorCardholderName, "Inserisci solo lettere")
  }
})

v.nrCardInput.addEventListener("keyup", (e) => {
  let value = e.target.value;

  // Escludo alcuni tasti dal controllo
  if (e.key === "Tab" || e.key === "Backspace" || e.key === "Shift") return

  // Verifico attraverso una regex che non vengano inseriti numeri
  if (/^\d+$/.test(value)) {
    f.resetInput(v.errorNrCard, v.nrCardInput)
    v.nrCard[0].textContent = value.slice(0, 4) || '0000';
    v.nrCard[1].textContent = value.slice(4, 8) || '0000';
    v.nrCard[2].textContent = value.slice(8, 12) || '0000';
    v.nrCard[3].textContent = value.slice(12, 16) || '0000';
  } else {
    f.errorMessage(v.nrCardInput, v.errorNrCard, "Inserisci solo numeri")
  }

})

v.month.addEventListener("keyup", (e) => {
  let inserededMonth = e.target.value || "00"
  v.expireMonth.textContent = inserededMonth

  // Escludo alcuni tasti dal controllo
  if (e.key === "Tab" || e.key === "Backspace" || e.key === "Shift") return

  f.emptyInput(inserededMonth, v.month)

  // Verifico attraverso una regex che non vengano inseriti numeri
  if (!/^\d+$/.test(e.target.value)) {
    f.errorMessage(v.month, v.errorDate, "Inserisci solo numeri");
    f.modifyInputStyle("0.4rem");
    return;
  }

  // Verifico che non venga inserito un numero superiore ai mesi in un anno
  if (Number(e.target.value) > 12) {
    f.showError(v.month, "Il mese dev'essere minore o uguale a 12");
  } else {
    f.resetError(v.month)
  }
});

// Aggiungo un attributo dinamico all'input in cui inserire l'anno in modo da non poter inserire un anno minore di quello corrente 
v.year.setAttribute("min", v.currentYear)

v.year.addEventListener("keyup", (e) => {
  let inserededYears = e.target.value || "00"
  v.expireYear.textContent = inserededYears

  // Escludo alcuni tasti dal controllo
  if (e.key === "Tab" || e.key === "Backspace"  || e.key === "Shift") return

  f.emptyInput(inserededYears, v.year)

  // Verifico attraverso una regex che non vengano inseriti numeri
  if (!/^\d+$/.test(e.target.value)) {
    f.errorMessage(v.year, v.errorDate, "Inserisci solo numeri");
    return;
  }

  // Verifico che l'anno inserito non sia minore dell'anno corrente
  if (Number(inserededYears) < v.currentYear) {
    f.showError(v.year, "Non puoi inserire un'anno minore di quello attuale", false)
  } else {
    f.resetError(v.year)
  }

})

v.cvvInput.addEventListener("keyup", (e) => {

  // Escludo alcuni tasti dal controllo
  if (e.key === "Tab" || e.key === "Backspace"  || e.key === "Shift") return

  // Verifico attraverso una regex che non vengano inseriti numeri
  if (/^\d+$/.test(e.target.value)) {
    f.resetError(v.cvvInput)
    v.cvv.textContent = e.target.value
  } else {
    f.showError(v.cvvInput, "Inserisci solo numeri")
  }
})

// Conferma dei dati della carta
v.confirmBtn.addEventListener("click", (e) => {
  e.preventDefault()
  v.form.checkValidity() ? f.confirm('none', 'flex') : v.form.classList.add("error")
})

v.continueBtn.addEventListener("click", () => {
  f.confirm('flex', 'none')

  // Form reset 
  v.form.classList.remove("error")
  v.form.reset();

  // Reset visuale della carta ai valori di default
  if (typeof v.name !== 'undefined') v.name.textContent = 'JANE APPLESEED';
  if (v.nrCard && v.nrCard.length) {
    v.nrCard.forEach(span => span.textContent = '0000');
  }
  if (v.expireMonth) v.expireMonth.textContent = '00';
  if (v.expireYear) v.expireYear.textContent = '00';
  if (v.cvv) v.cvv.textContent = '000';
})