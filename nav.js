// Close the nav dropdown when clicking anywhere outside it.
document.addEventListener('click', (event) => {
  document.querySelectorAll('details.nav-menu[open]').forEach((menu) => {
    if (!menu.contains(event.target)) menu.removeAttribute('open');
  });
});
