const form = document.getElementById("form");
const formLabels = Array.from(form.getElementsByTagName("label"));
const formInputs = Array.from(form.getElementsByTagName("input"));
const errorMessages = Array.from(form.getElementsByClassName("error"));

form.addEventListener("submit", event => {
  let valid = true;
  for (let i = 0; i < formInputs.length; i++) {
    if (!formInputs[i].validity.valid) {
      valid = false;
    }
  }
  if (valid) {
    // form is submitted
  } else {
    event.preventDefault();
  }
});

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function() {
    if (formInputs[i].validity.valid) {
      // remove existing error message
      errorMessages[i].innerHTML = "";
      // reset style of error message
      errorMessages[i].className = "error";
    } else {
      // there's still an error in the input
      showError(i);
    }
  });
}

function showError(i) {
  let labelText = formLabels[i].innerText.split(":")[0].toLowerCase();
  if (formInputs[i].validity.valueMissing) {
    // If the field is empty
    errorMessages[i].textContent = `Please enter ${labelText}`;
  } else if (
    formInputs[i].validity.typeMismatch ||
    formInputs[i].validity.patternMismatch
  ) {
    // If the format is incorrect
    errorMessages[
      i
    ].textContent = `Entered value needs to be in the form of: ${labelText}`;
  } else if (formInputs[i].validity.tooShort) {
    // If the data is too short
    errorMessages[
      i
    ].textContent = `${labelText} should be at least ${formInputs[i].minLength} characters; you entered ${formInputs[i].value.length}.`;
  }

  // Set the styling appropriately
  errorMessages[i].className = "error active";
}
