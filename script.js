// script.js

let allQuestions = [];
let queue = [];
let answered = []; // { q, answer, correct }
let score = 0;

document.getElementById("start").addEventListener("click", async () => {
  const sel = document.getElementById("selector").value;
  const res = await fetch("intrebari_toate_materii_rebuilt.json");  // ajustează numele dacă e cazul
  allQuestions = await res.json();

  if (sel === "mix") {
    const cats = [
      "Anatomie patologica","Bacteriologie","Farmacologie",
      "Fiziologie","Patologie","Anatomie",
      "Histologie","Semiologie"
    ];
    let mix = [];
    cats.forEach(cat => {
      const pool = allQuestions.filter(q => q.materie === cat);
      mix = mix.concat(shuffle(pool).slice(0, 15));
    });
    if (mix.length < 80) {
      const rest = allQuestions.filter(q => !mix.includes(q));
      mix = mix.concat(shuffle(rest).slice(0, 80 - mix.length));
    }
    queue = shuffle(mix);
  } else {
    const filtered = allQuestions.filter(q => q.materie === sel);
    const count = sel === "Semiologie" ? 110 : 100;
    queue = shuffle(filtered).slice(0, count);
  }

  answered = [];
  score = 0;
  document.getElementById("start").style.display = "none";
  document.getElementById("selector").disabled = true;
  document.getElementById("result").innerHTML = "";
  showNextQuestion();
});

function showNextQuestion() {
  const quiz = document.getElementById("quiz");
  if (queue.length === 0) {
    return showResult();
  }

  const q = queue[0];
  quiz.innerHTML = `
    <div class="question">
      <h3>${answered.length + 1}. ${q.intrebare}</h3>
      ${q.variante.map((opt,i)=>
        `<label><input type="radio" name="opt" value="${i}"> ${opt}</label>`
      ).join("")}
    </div>
    <div class="buttons">
      <button id="skip">Sari peste</button>
      <button id="next">Următoarea</button>
      <button id="finish">Încheie testul</button>
    </div>
  `;

  document.getElementById("next").onclick = () => {
    const selOpt = document.querySelector("input[name=opt]:checked");
    if (!selOpt) return alert("Selectează o opțiune sau sari peste!");
    recordAnswer(parseInt(selOpt.value, 10));
    queue.shift();
    showNextQuestion();
  };

  document.getElementById("skip").onclick = () => {
    queue.push(queue.shift());
    showNextQuestion();
  };

  document.getElementById("finish").onclick = () => {
    showResult();
  };
}

function recordAnswer(ans)
