let allQuestions = [];
let selectedQuestions = [];

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

  showQuiz();
});

function showQuiz() {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";
  selectedQuestions.forEach((q, idx) => {
    const qDiv = document.createElement("div");
    qDiv.classList.add("question");
    qDiv.innerHTML = `<h3>${idx + 1}. ${q.intrebare}</h3>` +
      q.variante.map((opt, i) => `
        <label>
          <input type="radio" name="q${idx}" value="${i}"> ${opt}
        </label>
      `).join("");
    quizDiv.appendChild(qDiv);
  });

  document.getElementById("submit").style.display = "block";
  document.getElementById("result").innerHTML = "";
}

document.getElementById("submit").addEventListener("click", () => {
  let score = 0;
  selectedQuestions.forEach((q, idx) => {
    const selected = document.querySelector(`input[name="q${idx}"]:checked`);
    if (selected && parseInt(selected.value) === q.corect) {
      score++;
    }
  });
  document.getElementById("result").innerHTML = `<h2>Ai răspuns corect la ${score} din ${selectedQuestions.length} întrebări.</h2>`;
});

// Funcție pentru amestecare
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
