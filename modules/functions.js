import * as v from "./variables.js"

/**
 * Se l'input è vuoto resetta lo style dell'input
 * @param {string} value - il contenuto dell'input
 * @param {HTMLInputElement} input - l'input a cui resettare lo style
 */
export function emptyInput(value, input) {
  if (!value) {
    resetInput(v.errorDate, input);
    return;
  }
}

/**
 * Mostra un messaggio di errore per un input con il relativo stile
 * @param {HTMLInputElement} input - input da marcare
 * @param {HTMLElement} messageSpan - elemento dove inserire il testo d'errore
 * @param {string} message - testo del messaggio
 * @param {Boolean} [isBlur=true] - se impostata a false toglie il focus all'input
 */
export function errorMessage(input, messageSpan, message, isBlur = true) {
  input.style.marginBottom = "0.4rem"
  messageSpan.textContent = message
  messageSpan.style.marginBottom = "1.075rem"
  if (isBlur) input.blur()
  input.style.borderColor = "red"
}

/**
 * Richiama le 2 funzioni per gestire l'errore dell'input
 * @param {HTMLInputElement} input - input da marcare
 * @param {string} message - testo del messaggio
 * @param {Boolean} [isBlur=true] - se impostata a false toglie il focus all'input
 */
export function showError(input, message, isBlur = true) {
  errorMessage(input, v.errorDate, message, isBlur);
  modifyInputStyle("0.4rem");
}

/**
 * Modifica lo stile del margine inferiore relativo agli input della scadenza e del CVV
 * @param {string} value - valore del margine inferiore
 */
export function modifyInputStyle(value) {
  v.inputs.forEach(input => {
    input.style.marginBottom = value;
  });
}

/**
 * Resetta lo stile del campo di input che non era valido
 * @param {HTMLElement} messageSpan - elemento da resettare
 * @param {HTMLInputElement} input - input da resettare
 */
export function resetInput(messageSpan, input) {
  messageSpan.textContent = ""
  messageSpan.style.marginBottom = 0
  input.style.borderColor = v.colorInput
}

/**
 * Richiama le 2 funzioni per resettare i campi di input della scadenza e del CVV
 * @param {HTMLInputElement} input - input da resettare
 */
export function resetError(input) {
  resetInput(v.errorDate, input);
  modifyInputStyle("1.075rem")
}

/**
 * Mostra/nasconde il form o il messaggio di conferma
 * @param {string} formDisplay - stile da applicare al dispay del form
 * @param {string} divDisplay - stile da applicare al dispay del div che contiene il messaggio di errore
 */
export function confirm(formDisplay, divDisplay) {
  v.form.style.display = formDisplay;
  v.section.classList.toggle("completed");
  v.div.style.display = divDisplay;
}