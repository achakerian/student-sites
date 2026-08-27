/* app.js
   Reads the answers from the form, scores every option in data.js against them,
   and shows the best matches. The refresh button re-picks from the same pool so
   you get different (but still suitable) suggestions.
*/

// ---------- grab the bits of the page we need ----------
const form        = document.getElementById("trip-form");
const results     = document.getElementById("results");
const summaryEl   = document.getElementById("summary");
const stayGrid    = document.getElementById("stay-results");
const funGrid     = document.getElementById("fun-results");
const placeGrid   = document.getElementById("place-results");
const refreshBtn  = document.getElementById("refresh");
const restartBtn  = document.getElementById("restart");

const stayBudget  = document.getElementById("stay-budget");
const funBudget   = document.getElementById("fun-budget");
const nightsInput = document.getElementById("nights");
const reasonInput = document.getElementById("reason");

// Remember the last answers so "show me different options" can reuse them.
let answers = null;

// ---------- keep the slider labels in step with the sliders ----------
function linkSlider(slider, outputId, format) {
  const out = document.getElementById(outputId);
  const update = () => { out.textContent = format(Number(slider.value)); };
  slider.addEventListener("input", update);
  update();
}

linkSlider(stayBudget, "stay-budget-out", v => "$" + v + " a night");
linkSlider(funBudget,  "fun-budget-out",  v => v === 0 ? "Free activities only" : "$" + v + " a day");
linkSlider(nightsInput, "nights-out",     v => v === 1 ? "1 night" : v + " nights");

// ---------- read the form ----------
function readAnswers() {
  const checked = document.querySelectorAll("#interests input:checked");
  const interests = Array.from(checked).map(box => box.value);
  // The visible wording of each ticked chip, for the summary line.
  const interestLabels = Array.from(checked).map(box => box.parentElement.textContent.trim());

  return {
    stay: Number(stayBudget.value),
    fun: Number(funBudget.value),
    nights: Number(nightsInput.value),
    interests: interests,
    interestLabels: interestLabels,
    reason: reasonInput.value
  };
}

// ---------- scoring ----------
// An option scores a point for every interest it matches, plus a bonus if it
// suits the reason for the trip. A little randomness keeps refreshes varied.
function baseScore(item, answers) {
  let points = 0;

  answers.interests.forEach(interest => {
    if (item.tags.includes(interest)) points += 3;
  });

  if (item.tags.includes(answers.reason)) points += 2;

  // Nudge free things up when the activity budget is tight.
  if (answers.fun < 40 && item.tags.includes("free")) points += 2;

  // Short trips favour options close to the beach strip.
  if (answers.nights <= 2 && item.area && item.area.indexOf("Springbrook") === -1) points += 0.5;

  return points;
}

// The most points anything could possibly score with these answers.
function bestPossibleScore(answers) {
  let best = answers.interests.length * 3;   // every interest matched
  best += 2;                                 // matched the reason for the trip
  if (answers.fun < 40) best += 2;           // free, on a tight budget
  if (answers.nights <= 2) best += 0.5;      // handy to the beach strip
  return best;
}

// Turn the points into a percentage we can show on the card.
// This is a real number worked out from the answers — it is not a review score.
function matchPercent(item, answers) {
  const best = bestPossibleScore(answers);
  const share = best > 0 ? baseScore(item, answers) / best : 0;
  return Math.round(45 + share * 54);        // always lands between 45% and 99%
}

// Ranking adds a little randomness so the refresh button gives new suggestions.
function score(item, answers) {
  return baseScore(item, answers) + Math.random() * 2.5;
}

// Sort a list by score and take the top few.
function pick(list, answers, howMany) {
  return list
    .slice()                                       // copy so we don't reorder the data
    .map(item => ({ item: item, points: score(item, answers) }))
    .sort((a, b) => b.points - a.points)
    .slice(0, howMany)
    .map(entry => entry.item);
}

// ---------- filtering by budget ----------
function affordableStays(answers) {
  const inBudget = ACCOMMODATION.filter(a => a.nightly <= answers.stay);
  // If nothing fits, show the two cheapest so the page is never empty.
  if (inBudget.length > 0) return inBudget;
  return ACCOMMODATION.slice().sort((a, b) => a.nightly - b.nightly).slice(0, 2);
}

function affordableActivities(answers) {
  const inBudget = ACTIVITIES.filter(a => a.cost <= answers.fun);
  if (inBudget.length > 0) return inBudget;
  return ACTIVITIES.filter(a => a.cost === 0);
}

// ---------- building the cards ----------
function priceLabel(item) {
  if (item.nightly !== undefined) return "about $" + item.nightly + " a night";
  if (item.cost === 0) return "Free";
  if (item.cost !== undefined) return "about $" + item.cost + " a person";
  return "";
}

function makeCard(item, answers) {
  const card = document.createElement("article");
  card.className = "result-card";

  const price = priceLabel(item);

  // Build the links. Every option has a search link; most also have an official site.
  let links = "";
  if (item.site) {
    links += '<a class="link primary-link" href="' + item.site +
             '" target="_blank" rel="noopener">Official site</a>';
  }
  links += '<a class="link" href="' + item.search +
           '" target="_blank" rel="noopener">Find it &amp; compare prices</a>';

  const match = matchPercent(item, answers);

  card.innerHTML =
    '<h4>' + item.name + '</h4>' +
    '<p class="meta">' +
      '<span class="area">' + item.area + (item.type ? " · " + item.type : "") + '</span>' +
      (price ? '<span class="price">' + price + '</span>' : '') +
      '<span class="match" title="How well this fits the answers you gave">' +
        match + '% match</span>' +
    '</p>' +
    '<p class="blurb">' + item.blurb + '</p>' +
    '<div class="links">' + links + '</div>';

  return card;
}

function fillGrid(grid, items, answers) {
  grid.innerHTML = "";
  items.forEach(item => grid.appendChild(makeCard(item, answers)));
}

// ---------- the summary line ----------
function buildSummary(answers) {
  const nights = answers.nights === 1 ? "1 night" : answers.nights + " nights";
  const interests = answers.interestLabels.length
    ? answers.interestLabels.join(", ").toLowerCase()
    : "a bit of everything";
  return nights + " on the Gold Coast · up to $" + answers.stay +
         " a night · about $" + answers.fun + " a day for activities · into " + interests + ".";
}

// ---------- show the results ----------
function showResults() {
  const stayCount  = 3;
  // Suggest roughly one and a half activities per night, between 3 and 8.
  const funCount   = Math.min(8, Math.max(3, Math.round(answers.nights * 1.5)));
  const placeCount = Math.min(4, Math.max(2, answers.nights));

  fillGrid(stayGrid,  pick(affordableStays(answers), answers, stayCount), answers);
  fillGrid(funGrid,   pick(affordableActivities(answers), answers, funCount), answers);
  fillGrid(placeGrid, pick(PLACES, answers, placeCount), answers);

  summaryEl.textContent = buildSummary(answers);
  results.hidden = false;
}

// ---------- events ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();
  answers = readAnswers();
  showResults();
  results.scrollIntoView({ behavior: "smooth" });
});

refreshBtn.addEventListener("click", function () {
  if (!answers) return;
  showResults();                 // the randomness in score() reshuffles the picks
  results.scrollIntoView({ behavior: "smooth" });
});

restartBtn.addEventListener("click", function () {
  results.hidden = true;
  document.getElementById("quiz").scrollIntoView({ behavior: "smooth" });
});
