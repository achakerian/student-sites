// Simple in-memory watchlist — works offline, no storage needed.
const watchlist = new Set();

const navBadge = document.getElementById("navBadge");
const navCount = document.getElementById("navCount");
const watchlistCount = document.getElementById("watchlistCount");
const watchlistList = document.getElementById("watchlistList");
const watchlistEmpty = document.getElementById("watchlistEmpty");

function renderWatchlist() {
  navCount.textContent = watchlist.size;
  navBadge.classList.toggle("is-active", watchlist.size > 0);

  // Clear current list items (keep the empty-state <li> around to reuse)
  watchlistList.querySelectorAll(".watchlist__item").forEach((li) => li.remove());

  if (watchlist.size === 0) {
    watchlistEmpty.style.display = "list-item";
    watchlistCount.textContent = "Nothing saved yet";
    return;
  }

  watchlistEmpty.style.display = "none";
  watchlistCount.textContent =
    watchlist.size === 1 ? "1 movie saved" : `${watchlist.size} movies saved`;

  watchlist.forEach((title) => {
    const li = document.createElement("li");
    li.className = "watchlist__item";
    li.textContent = title;
    watchlistList.appendChild(li);
  });
}

document.querySelectorAll(".card__btn").forEach((btn) => {
  const card = btn.closest(".card");
  const title = card.dataset.title;
  const label = btn.querySelector(".card__btn-label");

  btn.addEventListener("click", () => {
    const added = watchlist.has(title);

    if (added) {
      watchlist.delete(title);
      btn.classList.remove("is-added");
      label.textContent = "Add to watchlist";
    } else {
      watchlist.add(title);
      btn.classList.add("is-added");
      label.textContent = "Added ✓";
    }

    renderWatchlist();
  });
});

renderWatchlist();
