let allQuestions = [];
let selectedQuestions = [];
let currentIndex = 0;
let score = 0;

document.getElementById("start").addEventListener("click", async () => {
  const select = document.getElementById("selector").value;
  const response = await fetch("intrebari_grila_complet_corectat.json");
  allQuestions = await response.json();

  if (select === "mix") {
    const filtered = allQuestions.filter(q =>
      ["Anatomie patologica", "Farmacologie", "Fiziologie", "Patologie", "Bacteriologie"].includes(q.materie)
    );
    selectedQuestions = shuffle(filtered).slice(0, 80);
  } else {
    const filtered = allQuestions.filter(q => q.materie === select);
    selectedQuestions = shuffle(filtered).slice(0, 100);
  }

  currentIndex = 0;
  score = 0;
  document.getElementById("result").innerHTML = "";
  showCurrentQuestion();
});

function showCurrentQuestion() {
  const q = selectedQuestions[currentIndex];
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = `
    <div class="question">
      <h3>${currentIndex + 1}. ${q.intrebare}</h3>
      ${q.variante.map((opt, i) => `
        <label>
          <input type="radio" name="q" value="${i}"> ${opt}
        </label>
      `).join("")}
    </div>
    <button id="next">Următoarea întrebare</button>
  `;

  document.getElementById("submit").style.display = "none";

  document.getElementById("next").addEventListener("click", () => {
    const selected = document.querySelector(`input[name="q"]:checked`);
    if (!selected) {
      alert("Te rog selectează un răspuns.");
      return;
    }

    if (parseInt(selected.value) === q.corect) {
      score++;
    }

    currentIndex++;
    if (currentIndex < selectedQuestions.length) {
      showCurrentQuestion();
    } else {
      showResult();
    }
  });
}

function showResult() {
  document.getElementById("quiz").innerHTML = "";
  document.getElementById("result").innerHTML = `
    <h2>Ai răspuns corect la ${score} din ${selectedQuestions.length} întrebări.</h2>
  `;
}

// Funcție pentru amestecare
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
