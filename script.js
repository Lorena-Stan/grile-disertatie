let allQuestions = {};
let selectedQuestions = [];
let current = 0;
let score = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startTest() {
  const testType = document.getElementById("testSelect").value;
  let combined = [];
  if (testType === "mix") {
    combined = [
      ...allQuestions.anatomie,
      ...allQuestions.farmacologie,
      ...allQuestions.fiziologie,
      ...allQuestions.patologie,
      ...allQuestions.bacteriologie
    ];
    selectedQuestions = shuffle(combined).slice(0, 80);
  } else {
    selectedQuestions = shuffle(allQuestions[testType]).slice(0, 100);
  }
  current = 0;
  score = 0;
  document.getElementById("quiz").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  const q = selectedQuestions[current];
  document.getElementById("question").textContent = (current + 1) + ". " + q.intrebare;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = '';
  ['A', 'B', 'C'].forEach((opt, i) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="answer" value="${i}"> ${q["varianta_" + opt]}`;
    answersDiv.appendChild(label);
    answersDiv.appendChild(document.createElement("br"));
  });
}

function nextQuestion() {
  const selected = document.querySelector("input[name='answer']:checked");
  if (!selected) return alert("Selectează un răspuns!");
  if (parseInt(selected.value) === allQuestions[selectedQuestions[current].materie][current].corect) {
    score++;
  }
  current++;
  if (current < selectedQuestions.length) {
    showQuestion();
  } else {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("result").innerHTML = `<h2>Scor final: ${score} din ${selectedQuestions.length}</h2>`;
  }
}