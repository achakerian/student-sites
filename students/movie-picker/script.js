const genres = ["Comedy", "Adventure", "Animation", "Mystery", "Science Fiction"];

document.getElementById("pickButton").addEventListener("click", function () {
  const choice = genres[Math.floor(Math.random() * genres.length)];
  document.getElementById("result").textContent = "Try a " + choice + " movie!";
});
