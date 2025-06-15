window.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("invalid", addErrorMessage);
    input.addEventListener("blur", () => {
      input.checkValidity();
    });
    input.addEventListener("focus", removeErrorMessage);
  });

  function addErrorMessage(e) {
    let name = e.target.getAttribute("name");
    if (document.querySelector(`.error-icon[data-id="${name}"]`)) return;

    // error icon
    const errorIcon = document.createElement("span");
    errorIcon.setAttribute("data-id", name);
    errorIcon.classList.add("error-icon");
    errorIcon.innerHTML = "<img src='images/icon-error.svg' alt=''>";

    // error message.
    const errorMessage = document.createElement("span");
    errorMessage.setAttribute("data-id", name);
    errorMessage.classList.add("error-message");

    const placeholder = e.target.getAttribute("placeholder");
    errorMessage.innerText = !e.target.value
      ? `${placeholder} cannot be empty.`
      : `Looks like this is not a valid ${placeholder.toLowerCase()}.`;

    // Append error icon and message after input element
    e.target.after(errorMessage);
    e.target.after(errorIcon);

    // Add error class to input to change border color
    e.target.classList.add("error");
  }

  function removeErrorMessage(e) {
    // Get error icon and message elements corresponding to target.
    const name = e.target.name;
    document
      .querySelectorAll(`[data-id="${name}"]`)
      .forEach((el) => el.remove());

    e.target.classList.remove("error");
  }
});
