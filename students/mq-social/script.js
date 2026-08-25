// ---------- Category filtering ----------
(function () {
  const pillRow = document.getElementById('pillRow');
  const grid = document.getElementById('eventGrid');
  const emptyState = document.getElementById('emptyState');

  if (!pillRow || !grid) return;

  function applyFilter(category) {
    const cards = grid.querySelectorAll('.flyer');
    let visibleCount = 0;

    cards.forEach(function (card) {
      const matches = category === 'all' || card.dataset.category === category;
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  }

  pillRow.addEventListener('click', function (event) {
    const button = event.target.closest('.pill');
    if (!button) return;

    pillRow.querySelectorAll('.pill').forEach(function (p) {
      p.classList.remove('is-active');
      p.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('is-active');
    button.setAttribute('aria-pressed', 'true');

    applyFilter(button.dataset.filter);
  });
})();

// ---------- Pin-your-own form ----------
(function () {
  const form = document.getElementById('pinForm');
  const grid = document.getElementById('eventGrid');
  if (!form || !grid) return;

  const paperClasses = ['flyer--mint', 'flyer--sky', 'flyer--lavender', 'flyer--peach', 'flyer--butter', 'flyer--blush'];
  const categoryLabels = {
    sports: 'SPORTS',
    arts: 'ARTS & MUSIC',
    games: 'GAMES',
    food: 'FOOD',
    outdoors: 'OUTDOORS',
    volunteer: 'VOLUNTEERING'
  };

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = form.eventTitle.value.trim();
    const club = form.clubName.value.trim();
    const host = form.hostFirstName.value.trim();
    const category = form.eventCategory.value;
    const desc = form.eventDesc.value.trim();

    if (!title || !club || !host || !category || !desc) return;

    const paperClass = paperClasses[Math.floor(Math.random() * paperClasses.length)];
    const rotate = (Math.random() * 3 - 1.5).toFixed(2) + 'deg';

    const card = document.createElement('article');
    card.className = 'flyer ' + paperClass + ' flyer--new';
    card.dataset.category = category;
    card.style.setProperty('--rotate', rotate);

    card.innerHTML =
      '<span class="pin" aria-hidden="true"></span>' +
      '<p class="tape" aria-hidden="true"></p>' +
      '<p class="flyer-tag mono">' + escapeHtml(categoryLabels[category] || category.toUpperCase()) + '</p>' +
      '<h3>' + escapeHtml(title) + '</h3>' +
      '<p class="flyer-club">' + escapeHtml(club) + '</p>' +
      '<p class="flyer-desc">' + escapeHtml(desc) + '</p>' +
      '<p class="flyer-host mono">Hosted by ' + escapeHtml(host) + ' &middot; preview only</p>';

    grid.prepend(card);
    form.reset();

    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();
