// ============================================================
// MuscleLife — exercise data
// Each exercise: name, stat (sets/reps or duration), equipment,
// difficulty (1-3, how tough for a true beginner), tip.
// ============================================================
const GROUPS = {
  chest: {
    label: "Chest",
    abbr: "CH",
    color: "#e5484d",
    exercises: [
      { name: "Incline Push-Up", stat: "3 × 8–12", equipment: "Bodyweight", difficulty: 1,
        tip: "Hands on a bench or step, body straight. Easier than a floor push-up — lower the incline as you get stronger." },
      { name: "Knee Push-Up", stat: "3 × 10–15", equipment: "Bodyweight", difficulty: 1,
        tip: "Knees down, hips in line with shoulders. Builds the pushing pattern before a full push-up." },
      { name: "Dumbbell Chest Press", stat: "3 × 10", equipment: "Dumbbells", difficulty: 2,
        tip: "Lie on a bench or the floor. Press up slowly and control the weight on the way down." },
      { name: "Standing Chest Squeeze", stat: "3 × 15", equipment: "Resistance band", difficulty: 1,
        tip: "Hold a band at chest height and press your hands together in front of you." },
    ],
  },
  shoulder: {
    label: "Shoulder",
    abbr: "SH",
    color: "#f2994a",
    exercises: [
      { name: "Seated Dumbbell Press", stat: "3 × 10", equipment: "Dumbbells", difficulty: 2,
        tip: "Sit tall, press the weights overhead without arching your lower back." },
      { name: "Lateral Raise", stat: "3 × 12", equipment: "Light dumbbells", difficulty: 1,
        tip: "Raise arms out to shoulder height, thumbs slightly down. Light weight is enough here." },
      { name: "Wall Slides", stat: "3 × 10", equipment: "Bodyweight", difficulty: 1,
        tip: "Back against a wall, slide arms up and down. Great warm-up for shoulder mobility." },
      { name: "Front Raise", stat: "3 × 10", equipment: "Light dumbbells", difficulty: 1,
        tip: "Raise one weight to shoulder height at a time, keeping your core braced." },
    ],
  },
  back: {
    label: "Back",
    abbr: "BA",
    color: "#2f80ed",
    exercises: [
      { name: "Table Row", stat: "3 × 8", equipment: "Sturdy table/bar", difficulty: 2,
        tip: "Lie under a sturdy table or low bar, pull your chest up toward it. A gentler start than a pull-up." },
      { name: "Superman Hold", stat: "3 × 20s", equipment: "Bodyweight", difficulty: 1,
        tip: "Lie face down, lift arms and legs a few inches, squeeze your back. Move slowly, don't yank." },
      { name: "Dumbbell Bent-Over Row", stat: "3 × 10", equipment: "Light dumbbells", difficulty: 2,
        tip: "Hinge at the hips, flat back, pull the weights toward your ribs." },
      { name: "Lat Pulldown", stat: "3 × 10", equipment: "Machine, light", difficulty: 2,
        tip: "Pull the bar to your upper chest, control it back up — don't let it snap." },
    ],
  },
  arms: {
    label: "Arms",
    abbr: "AR",
    color: "#f2c94c",
    exercises: [
      { name: "Bicep Curl", stat: "3 × 12", equipment: "Dumbbells", difficulty: 1,
        tip: "Elbows stay pinned to your sides — only the forearm moves." },
      { name: "Bench Dip", stat: "3 × 8", equipment: "Bench, bent knees", difficulty: 2,
        tip: "Hands on the bench edge, knees bent for less resistance. Lower until elbows hit ~90°." },
      { name: "Hammer Curl", stat: "3 × 10", equipment: "Dumbbells", difficulty: 1,
        tip: "Palms face each other the whole way — this hits the forearm as well as the bicep." },
      { name: "Overhead Tricep Extension", stat: "3 × 10", equipment: "Light dumbbell", difficulty: 2,
        tip: "One weight held with both hands behind your head, elbows pointed forward and still." },
    ],
  },
  legs: {
    label: "Legs",
    abbr: "LG",
    color: "#27ae60",
    exercises: [
      { name: "Bodyweight Squat", stat: "3 × 15", equipment: "Bodyweight", difficulty: 1,
        tip: "Feet shoulder-width, sit back like you're reaching for a chair. Chest stays up." },
      { name: "Glute Bridge", stat: "3 × 15", equipment: "Bodyweight", difficulty: 1,
        tip: "Lie on your back, feet flat, squeeze your glutes to lift your hips." },
      { name: "Walking Lunge", stat: "3 × 10 /leg", equipment: "Bodyweight", difficulty: 2,
        tip: "Step forward into a lunge, keep your front knee over your ankle, not past your toes." },
      { name: "Calf Raise", stat: "3 × 20", equipment: "Bodyweight", difficulty: 1,
        tip: "Rise onto your toes slowly. Hold a wall or rail for balance if you need to." },
    ],
  },
  core: {
    label: "Core",
    abbr: "CO",
    color: "#9b51e0",
    exercises: [
      { name: "Plank", stat: "3 × 20–30s", equipment: "Bodyweight", difficulty: 1,
        tip: "Straight line from head to heels. Squeeze your abs, don't let your hips sag." },
      { name: "Dead Bug", stat: "3 × 10 /side", equipment: "Bodyweight", difficulty: 1,
        tip: "On your back, lower opposite arm and leg toward the floor while your lower back stays flat." },
      { name: "Bird Dog", stat: "3 × 10 /side", equipment: "Bodyweight", difficulty: 1,
        tip: "On hands and knees, extend opposite arm and leg. Move slowly, keep your hips level." },
      { name: "Bicycle Crunch", stat: "3 × 15 /side", equipment: "Bodyweight", difficulty: 2,
        tip: "Elbow toward the opposite knee, keep the motion slow and controlled." },
    ],
  },
  cardio: {
    label: "Cardio",
    abbr: "CD",
    color: "#17c3b2",
    exercises: [
      { name: "Brisk Walk", stat: "10 min", equipment: "None", difficulty: 1,
        tip: "A simple, low-impact way to raise your heart rate. Great starting point for any fitness level." },
      { name: "Jumping Jacks", stat: "3 × 30s", equipment: "Bodyweight", difficulty: 1,
        tip: "Keep a steady rhythm. Slow down instead of stopping if you get out of breath." },
      { name: "Step-Ups", stat: "3 × 10 /leg", equipment: "Step or low bench", difficulty: 2,
        tip: "Step fully onto the platform before pushing up — don't just tap it with your toe." },
      { name: "Stationary Bike", stat: "10 min", equipment: "Exercise bike", difficulty: 1,
        tip: "Easy, steady pace. A gentle way to warm up or cool down too." },
    ],
  },
};

const GROUP_ORDER = ["chest", "shoulder", "back", "arms", "legs", "core", "cardio"];

// ------------------------------------------------------------
// State
// ------------------------------------------------------------
let activeGroup = "chest";

// ------------------------------------------------------------
// Build the plate tab bar once
// ------------------------------------------------------------
function buildPlates() {
  const list = document.getElementById("plateList");
  list.innerHTML = "";

  GROUP_ORDER.forEach((key) => {
    const group = GROUPS[key];

    const li = document.createElement("li");
    li.className = "plate-item" + (key === activeGroup ? " active" : "");
    li.dataset.group = key;

    li.innerHTML = `
      <button class="plate" type="button" style="--c:${group.color}"
              aria-pressed="${key === activeGroup}">
        <span class="plate-abbr">${group.abbr}</span>
      </button>
      <span class="plate-name">${group.label}</span>
    `;

    li.querySelector("button").addEventListener("click", () => selectGroup(key));
    list.appendChild(li);
  });
}

// ------------------------------------------------------------
// Switch the active muscle group
// ------------------------------------------------------------
function selectGroup(key) {
  activeGroup = key;

  document.querySelectorAll(".plate-item").forEach((li) => {
    const isActive = li.dataset.group === key;
    li.classList.toggle("active", isActive);
    li.querySelector("button").setAttribute("aria-pressed", isActive);
  });

  const group = GROUPS[key];
  document.getElementById("groupTitle").textContent = group.label;
  document.documentElement.style.setProperty("--accent", group.color);

  const searchInput = document.getElementById("searchInput");
  searchInput.value = "";
  searchInput.placeholder = `Search ${group.label} exercises…`;

  renderCards();
}

// ------------------------------------------------------------
// Render exercise cards for the active group, filtered by search
// ------------------------------------------------------------
function renderCards() {
  const grid = document.getElementById("cardGrid");
  const emptyState = document.getElementById("emptyState");
  const query = document.getElementById("searchInput").value.trim().toLowerCase();

  const group = GROUPS[activeGroup];
  const matches = group.exercises.filter((ex) =>
    ex.name.toLowerCase().includes(query) || ex.equipment.toLowerCase().includes(query)
  );

  grid.innerHTML = "";

  if (matches.length === 0) {
    emptyState.hidden = false;
    document.getElementById("emptyQuery").textContent = query;
    return;
  }
  emptyState.hidden = true;

  matches.forEach((ex) => {
    const card = document.createElement("article");
    card.className = "card";

    const dots = [1, 2, 3]
      .map((n) => `<span class="${n <= ex.difficulty ? "filled" : ""}"></span>`)
      .join("");

    card.innerHTML = `
      <p class="card-name">${ex.name}</p>
      <div class="card-meta">
        <span class="stat">${ex.stat}</span>
        <span class="chip">${ex.equipment}</span>
        <span class="difficulty" title="Beginner difficulty">${dots}</span>
      </div>
      <p class="card-tip"><strong>Tip:</strong> ${ex.tip}</p>
    `;
    grid.appendChild(card);
  });
}

// ------------------------------------------------------------
// Init
// ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  buildPlates();
  document.documentElement.style.setProperty("--accent", GROUPS[activeGroup].color);
  document.getElementById("searchInput").placeholder = `Search ${GROUPS[activeGroup].label} exercises…`;
  renderCards();

  document.getElementById("searchInput").addEventListener("input", renderCards);
  document.getElementById("clearSearch").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    renderCards();
    document.getElementById("searchInput").focus();
  });
});
