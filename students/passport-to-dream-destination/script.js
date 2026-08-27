// Save-event interaction: tapping "Save event" stamps the card and
// updates the running counter above the departures board.

document.addEventListener("DOMContentLoaded", function () {
  var counterEl = document.getElementById("savedCounter");
  var saveButtons = document.querySelectorAll(".save-btn");
  var savedCount = 0;

  function updateCounter() {
    if (savedCount === 0) {
      counterEl.textContent = "0 trips saved so far — go stamp one!";
    } else if (savedCount === 1) {
      counterEl.textContent = "1 trip saved so far. Nice.";
    } else {
      counterEl.textContent = savedCount + " trips saved so far. Bon voyage!";
    }
  }

  saveButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var ticket = button.closest(".ticket");
      var isSaved = ticket.getAttribute("data-saved") === "true";

      if (isSaved) {
        ticket.setAttribute("data-saved", "false");
        button.setAttribute("data-saved", "false");
        button.textContent = "Save event";
        savedCount = Math.max(0, savedCount - 1);
      } else {
        ticket.setAttribute("data-saved", "true");
        button.setAttribute("data-saved", "true");
        button.textContent = "Saved \u2713";
        savedCount += 1;
      }

      updateCounter();
    });
  });
});
