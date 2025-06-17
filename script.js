let current = 0;
let score = 0;
let selectedQuestions = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startTest() {
  const testType = document.getElementById("testSelector").value;
  let selected = [];

  switch (testType) {
    case "mix":
      selected = shuffle([
        ...questions.anatomie,
        ...questions.farmaco,
        ...questions.fiziologie,
        ...questions.patologie,
        ...questions.bacterio
      ]).slice(0, 80);
      break;
    case "anatomie":
      selected = shuffle(questions.anatomie).slice(0, 100);
      break;
    case "farmaco":
      selected = shuffle(questions.farmaco).slice(0, 100);
      break;
    case "fiziologie":
      selected = shuffle(questions.fiziologie).slice(0, 100);
      break;
    case "patologie":
      selected = shuffle(questions.patologie).slice(0, 100);
      break;
    case "bacterio":
      selected = shuffle(questions.bacterio).slice(0, 100);
      break;
  }

  selectedQuestions = selected;
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
  answersDiv.innerHTML = "";

  q.variante.forEach((opt, i) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="answer" value="${i}"> ${opt}`;
    answersDiv.appendChild(label);
  });
}

function nextQuestion() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return alert("Selectează un răspuns!");

  if (parseInt(selected.value) === selectedQuestions[current].corect) {
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
