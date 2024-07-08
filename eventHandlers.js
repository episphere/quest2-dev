import { rbAndCbClick, textBoxInput, handleXOR, parseSSN, parsePhoneNumber, textboxinput, radioAndCheckboxUpdate } from "./questionnaire.js";
import { stopSubmit } from "./replace2.js";

// Add event listeners to the div element (delegate events to the parent div)
export function addEventListeners(divElement) {
    divElement.addEventListener('click', handleClickEvent);
    divElement.addEventListener('change', handleChangeEvent);
    divElement.addEventListener('keydown', handleKeydownEvent);
    divElement.addEventListener('keyup', handleKeyupEvent);
    divElement.addEventListener('input', handleInputEvent);
    divElement.addEventListener('blur', handleBlurEvent);
    divElement.addEventListener('submit', handleSubmitEvent);
}

function handleClickEvent(event) {
    const target = event.target;
    
    if (target.matches('input[type="radio"], input[type="checkbox"]')) {
      rbAndCbClick(event);
      
      // Handle radio button and checkbox clicks for label inputs
      const label = target.closest('label');
      if (label) {
        const inputElement = label.querySelector('input:not([type="radio"]):not([type="checkbox"]), textarea');
        if (inputElement) {
          console.log('click');
          if (!target.checked) {
            inputElement.dataset.lastValue = inputElement.value;
            inputElement.value = '';
          } else if ('lastValue' in inputElement.dataset) {
            inputElement.value = inputElement.dataset.lastValue;
          }
          textboxinput(inputElement);
        }
      }
    }
}
  
  function handleChangeEvent(event) {
    const target = event.target;
    
    // Firefox does not alway GRAB focus when the arrows are clicked.
    // If a changeEvent fires, grab focus.
    if (target.matches('input[type="number"]') && target !== document.activeElement) {
      target.focus();
    }

    if (target.matches('input[type="radio"], input[type="checkbox"]')) {
      rbAndCbClick(event);
    }
  }
  
  function handleKeydownEvent(event) {
    const target = event.target;
    
    // Prevent form submission on enter key
    if (target.matches('input') && event.keyCode === 13) {
      event.preventDefault();
    }
    
    // for each element with an xor, handle the xor on keydown
    if (target.matches('[xor]')) {
      handleXOR(target);
    }
  }
  
  function handleKeyupEvent(event) {
    const target = event.target;
    
    if (target.matches('.SSN')) {
      parseSSN(event);
    }
    
    if (target.matches('input[type="tel"]')) {
      parsePhoneNumber(event);
    }

    if (target.matches('label input:not([type="radio"]):not([type="checkbox"]), label textarea')) {
      handleInputEvent(event);
    }
  }
  
  function handleBlurEvent(event) {
    const target = event.target;
    
    if (target.matches('input[type="text"], input[type="number"], input[type="email"], input[type="tel"], input[type="date"], input[type="month"], input[type="time"], textarea, select')) {
      textBoxInput(event);
      target.setAttribute("style", "size: 20 !important");
    }
  }

  function handleInputEvent(event) {
    const target = event.target;
    
    if (target.matches('input[type="text"], textarea')) {
      const label = target.closest('label');
      if (label) {
        const radioCB = document.getElementById(label.htmlFor) || label.querySelector('input[type="radio"], input[type="checkbox"]');
        if (radioCB && (radioCB.type === 'radio' || radioCB.type === 'checkbox')) {
          const nchar = target.value.length;
          if (nchar > 0) radioCB.checked = true;
          radioAndCheckboxUpdate(radioCB);
          target.dataset.lastValue = target.value;
          textboxinput(target);  // Ensure the text input is saved
        }
      }
    }
  }

  function handleSubmitEvent(event) {
    const target = event.target;

    if (target.matches('.question') || target.closest('.question')) {
        stopSubmit(event);
    }
  }
