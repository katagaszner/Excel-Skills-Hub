function createCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function updateButtons() {
  var fontBtn = document.getElementById("font-toggle");
  var contrastBtn = document.getElementById("contrast-toggle");

  if (fontBtn) {
    fontBtn.textContent = document.body.classList.contains("large-font")
      ? "Normál betűk"
      : "Nagyobb betűk";
  }

  if (contrastBtn) {
    contrastBtn.textContent = document.body.classList.contains("highcontrast")
      ? "Normál kontraszt"
      : "Kontraszt";
  }
}

window.onload = function () {
  var fontBtn = document.getElementById("font-toggle");
  var contrastBtn = document.getElementById("contrast-toggle");

  // visszatöltés
  if (readCookie("largeFont") === "yes") document.body.classList.add("large-font");
  if (readCookie("highContrast") === "yes") document.body.classList.add("highcontrast");

  updateButtons();

  if (fontBtn) {
    fontBtn.onclick = function () {
      document.body.classList.toggle("large-font");
      createCookie("largeFont", document.body.classList.contains("large-font") ? "yes" : "no", 365);
      updateButtons();
    };
  }

  if (contrastBtn) {
    contrastBtn.onclick = function () {
      document.body.classList.toggle("highcontrast");
      createCookie("highContrast", document.body.classList.contains("highcontrast") ? "yes" : "no", 365);
      updateButtons();
    };
  }
};
