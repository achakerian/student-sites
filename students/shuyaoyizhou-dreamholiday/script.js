// "Choose your Singapore experience" — Explore / Eat / Shop buttons
// smoothly scroll to the matching section and briefly highlight it.

document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".choose-btn");

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = btn.getAttribute("data-target");
      var target = document.getElementById(targetId);
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Re-trigger the highlight animation even on repeat clicks
      target.classList.remove("highlight");
      // Force reflow so the animation can restart
      void target.offsetWidth;
      target.classList.add("highlight");

      target.addEventListener(
        "animationend",
        function () {
          target.classList.remove("highlight");
        },
        { once: true }
      );
    });
  });
});
