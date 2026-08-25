const movies = {
  "orbits-last-light": "Orbit's Last Light",
  "sunday-corner-store": "Sunday at the Corner Store",
  "map-between-us": "The Map Between Us",
  "quiet-frequency": "Quiet Frequency",
  "second-serve": "Second Serve"
};

const savedMovies = new Set();
const saveButtons = document.querySelectorAll(".save-button");
const watchlistItems = document.querySelector("#watchlist-items");
const emptyMessage = document.querySelector("#empty-message");
const watchlistCount = document.querySelector("#watchlist-count");
const clearButton = document.querySelector("#clear-watchlist");

function renderWatchlist() {
  watchlistItems.replaceChildren();

  savedMovies.forEach((movieId) => {
    const item = document.createElement("li");
    const title = document.createElement("span");
    const removeButton = document.createElement("button");

    title.textContent = movies[movieId];
    removeButton.type = "button";
    removeButton.className = "remove-button";
    removeButton.textContent = "Remove";
    removeButton.setAttribute("aria-label", `Remove ${movies[movieId]} from watchlist`);
    removeButton.addEventListener("click", () => toggleMovie(movieId));

    item.append(title, removeButton);
    watchlistItems.append(item);
  });

  const count = savedMovies.size;
  watchlistCount.textContent = count;
  watchlistCount.setAttribute("aria-label", `${count} saved ${count === 1 ? "movie" : "movies"}`);
  emptyMessage.hidden = count > 0;
  clearButton.hidden = count === 0;
}

function updateButtons(movieId, isSaved) {
  document.querySelectorAll(`[data-movie="${movieId}"]`).forEach((button) => {
    button.classList.toggle("is-saved", isSaved);
    button.setAttribute("aria-pressed", String(isSaved));
    button.textContent = button.classList.contains("primary-button")
      ? (isSaved ? "Added to watchlist" : "Add to watchlist")
      : (isSaved ? "Added to watchlist" : "+ Add to watchlist");
  });
}

function toggleMovie(movieId) {
  const isSaved = savedMovies.has(movieId);

  if (isSaved) {
    savedMovies.delete(movieId);
  } else {
    savedMovies.add(movieId);
  }

  updateButtons(movieId, !isSaved);
  renderWatchlist();
}

saveButtons.forEach((button) => {
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => toggleMovie(button.dataset.movie));
});

clearButton.addEventListener("click", () => {
  savedMovies.forEach((movieId) => updateButtons(movieId, false));
  savedMovies.clear();
  renderWatchlist();
});

renderWatchlist();
