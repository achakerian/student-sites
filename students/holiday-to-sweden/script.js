// Highlights the current leg in the top nav as you scroll.
(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll(".leg[id]"));
  var links = Array.prototype.slice.call(document.querySelectorAll(".topbar__nav a"));

  if (!sections.length || !links.length || !("IntersectionObserver" in window)) return;

  var linkById = {};
  links.forEach(function (link) {
    var id = link.getAttribute("href").replace("#", "");
    linkById[id] = link;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var link = linkById[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach(function (section) { observer.observe(section); });
})();
