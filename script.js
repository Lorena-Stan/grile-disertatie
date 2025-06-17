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
