function setActiveStyleSheet(title) {
  var i, a;
  for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
    if (
      a.getAttribute("rel") &&
      a.getAttribute("rel").indexOf("style") != -1 &&
      a.getAttribute("title")
    ) {
      a.disabled = true;
      if (a.getAttribute("title") == title) {
        a.disabled = false;
      }
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
    if (
      a.getAttribute("rel") &&
      a.getAttribute("rel").indexOf("style") != -1 &&
      a.getAttribute("title") &&
      !a.disabled
    ) {
      return a.getAttribute("title");
    }
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
    if (
      a.getAttribute("rel") &&
      a.getAttribute("rel").indexOf("style") != -1 &&
      a.getAttribute("rel").indexOf("alt") == -1 &&
      a.getAttribute("title")
    ) {
      return a.getAttribute("title");
    }
  }
  return null;
}

function createCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

window.onload = function (e) {
  // induló stílus beállítása
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);

  var fontBtn = document.getElementById("font-toggle");
  var contrastBtn = document.getElementById("contrast-toggle");

  // --- Betűméret váltó gomb ---
  if (fontBtn) {
    // induló felirat
    fontBtn.textContent = title === "large" ? "Normál betűk" : "Nagyobb betűk";

    fontBtn.onclick = function () {
      var current = getActiveStyleSheet();
      var nextTitle;

      // ha highcontrast-ból vált, menjünk nagybetűsre (vagy akár normalra, ízlés kérdése)
      if (current === "large") {
        nextTitle = "normal";
      } else {
        nextTitle = "large";
      }

      setActiveStyleSheet(nextTitle);
      createCookie("style", nextTitle, 365);
      fontBtn.textContent =
        nextTitle === "large" ? "Normál betűk" : "Nagyobb betűk";
    };
  }

  // --- Kontraszt gomb ---
  if (contrastBtn) {
    // induló felirat
    contrastBtn.textContent =
      title === "highcontrast" ? "Normál kontraszt" : "Kontraszt";

    contrastBtn.onclick = function () {
      var current = getActiveStyleSheet();
      var nextTitle;

      if (current === "highcontrast") {
        // vissza normálra, ha újra rákattint
        nextTitle = "normal";
      } else {
        nextTitle = "highcontrast";
      }

      setActiveStyleSheet(nextTitle);
      createCookie("style", nextTitle, 365);

      // feliratok frissítése
      if (fontBtn) {
        fontBtn.textContent =
          nextTitle === "large" ? "Normál betűk" : "Nagyobb betűk";
      }
      contrastBtn.textContent =
        nextTitle === "highcontrast" ? "Normál kontraszt" : "Kontraszt";
    };
  }
};

window.onunload = function (e) {
  var title = getActiveStyleSheet();
  if (title) {
    createCookie("style", title, 365);
  }
};

// Biztonsági beállítás: ha onload előtt futna valamiért
var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
if (title) {
  setActiveStyleSheet(title);
}
