import * as v from "./modules/variables.js"

/**
 * Mostra/nasconde il form o il messaggio di conferma
 * @param {string} formDisplay - stile da applicare al dispay del form
 * @param {string} divDisplay - stile da applicare al dispay del div che contiene il messaggio di errore
 */
function confirm(formDisplay, divDisplay) {
  v.form.style.display = formDisplay;
  v.section.classList.toggle("completed");
  v.div.style.display = divDisplay;
}

/**
 * Mostra un messaggio di errore per un input con il relativo stile
 * @param {HTMLInputElement} input - input da marcare
 * @param {HTMLElement} messageSpan - elemento dove inserire il testo d'errore
 * @param {string} message - testo del messaggio
 * @param {Boolean} [isBlur=true] - se impostata a false toglie il focus all'input
 */
function errorMessage(input, messageSpan, message, isBlur = true) {
  input.style.marginBottom = "0.4rem"
  messageSpan.textContent = message
  messageSpan.style.marginBottom = "1.075rem"
  if (isBlur) input.blur()
  input.style.borderColor = "red"
}

/**
 * Resetta lo stile del campo di input che non era valido
 * @param {HTMLElement} messageSpan - elemento da resettare
 * @param {HTMLInputElement} input - input da resettare
 */
function resetInput(messageSpan, input) {
  messageSpan.textContent = ""
  input.style.borderColor = v.colorInput
}

// Inserimento dati sull'immagine della crta
v.inputName.addEventListener("keyup", (e) => {
  // Verifico che vengano inserite solo lettere
  if (!/^[A-Za-z\s]+$/.test(e.target.value) && e.key != "Backspace" && e.key != "Tab") {
    errorMessage(v.inputName, v.errorCardholderName, "Inserisci solo lettere")
  } else {
    resetInput(v.errorCardholderName, v.inputName)
    v.errorCardholderName.style.marginBottom = 0
    v.name.textContent = e.target.value.toUpperCase()
  }
})

v.nrCardInput.addEventListener("keyup", (e) => {
  let value = e.target.value;
  // Verifico che vengano inseriti solo numeri
  if (!/^\d+$/.test(value) && e.key != "Backspace" && e.key != "Tab") {
    errorMessage(v.nrCardInput, v.errorNrCard, "Inserisci solo numeri")
  } else {
    resetInput(v.errorNrCard, v.nrCardInput)
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
      errorMessage(v.mounth, v.errorDate, "Il mese dev'essere minore o uguale a 12")
      v.inputs.forEach(input => {
        input.style.marginBottom = "0.4rem";
      });
    } else {
      v.errorDate.textContent = ""
      v.inputs.forEach(input => {
        input.style.marginBottom = "1.075rem";
      });
    }
  } else {
    v.expireMonth.textContent = "00"
  }
})

v.year.setAttribute("min", v.currentYear)

v.year.addEventListener("keyup", (e) => {
  let inserededYears = Number(e.target.value)

  if (e.key != "Tab") {
    if (v.currentYear > inserededYears) {
      errorMessage(v.year , v.errorDate, "Non puoi inserire un'anno minore di quello attuale", false)
    } else {
      resetInput(v.errorDate, v.year)
      v.expireYear.textContent = inserededYears
    }
  }
})

v.cvvInput.addEventListener("keyup", (e) => {
  if (e.key != "Tab") {
    v.cvv.textContent = e.target.value
  }
})

// Conferma dei dati della carta
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