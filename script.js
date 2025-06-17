let allQuestions = [];
let selectedQuestions = [];
let currentIndex = 0;
let score = 0;
let userAnswers = [];

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
  userAnswers = [];
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
    <button id="skip">Sari peste</button>
    <button id="next">Următoarea întrebare</button>
  `;

  document.getElementById("submit").style.display = "none";

  document.getElementById("next").addEventListener("click", () => {
    const selected = document.querySelector("input[name='q']:checked");
    const answer = selected ? parseInt(selected.value) : null;
    userAnswers.push(answer);

    if (answer === selectedQuestions[currentIndex].corect) {
      score++;
    }

    nextStep();
  });

  document.getElementById("skip").addEventListener("click", () => {
    userAnswers.push(null);
    nextStep();
  });
}

function nextStep() {
  currentIndex++;
  if (currentIndex < selectedQuestions.length) {
    showCurrentQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const resultDiv = document.getElementById("result");
  document.getElementById("quiz").innerHTML = "";
  resultDiv.innerHTML = `<h2>Ai răspuns corect la ${score} din ${selectedQuestions.length} întrebări.</h2>`;

  selectedQuestions.forEach((q, i) => {
    const userAns = userAnswers[i];
    const isCorrect = userAns === q.corect;

    const questionBlock = document.createElement("div");
    questionBlock.classList.add("question");
    questionBlock.style.border = "1px solid #ccc";
    questionBlock.style.padding = "10px";
    questionBlock.style.marginBottom = "10px";
    questionBlock.style.background = isCorrect ? "#e6ffec" : "#ffecec";

    questionBlock.innerHTML = `
      <strong>${i + 1}. ${q.intrebare}</strong><br/>
      <div>Răspunsul tău: ${userAns === null ? "<em>neselectat</em>" : q.variante[userAns]}</div>
      ${isCorrect 
        ? "<div><strong>✔ Corect</strong></div>" 
        : "<div><strong>✘ Greșit</strong></div><div>Varianta corectă: " + q.variante[q.corect] + "</div>"}
    `;

    resultDiv.appendChild(questionBlock);
  });
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}