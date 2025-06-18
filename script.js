// script.js

let allQuestions = [];
let queue = [];
let answered = []; // { q, answer, correct }
let score = 0;

document.getElementById("start").addEventListener("click", async () => {
  const sel = document.getElementById("selector").value;
  // Înlocuiește cu numele fișierului tău JSON, dacă e diferit:
  const res = await fetch("intrebari_toate_materii_rebuilt.json");
  allQuestions = await res.json();

  if (sel === "mix") {
    // lista materiilor pentru mix
    const cats = [
      "Anatomie patologica",
      "Bacteriologie",
      "Farmacologie",
      "Fiziologie",
      "Patologie",
      "Anatomie",
      "Histologie",
      "Semiologie"
    ];
    let mix = [];
    // ia până la 15 întrebări din fiecare materie
    cats.forEach(cat => {
      const pool = allQuestions.filter(q => q.materie === cat);
      mix = mix.concat(shuffle(pool).slice(0, 15));
    });
    // dacă nu avem 80, completează din rest
    if (mix.length < 80) {
      const rest = allQuestions.filter(q => !mix.includes(q));
      mix = mix.concat(shuffle(rest).slice(0, 80 - mix.length));
    }
    queue = shuffle(mix);
  } else {
    // opțiuni pe materie
    const filtered = allQuestions.filter(q => q.materie === sel);
    const count = sel === "Semiologie" ? 110 : 100;
    queue = shuffle(filtered).slice(0, count);
  }

  // initializează testul
  answered = [];
  score = 0;
  document.getElementById("start").style.display = "none";
  document.getElementById("selector").disabled = true;
  document.getElementById("result").innerHTML = "";
  showNextQuestion();
}

);

function showNextQuestion() {
  if (queue.length === 0) {
    return showResult();
  }

  const quiz = document.getElementById("quiz");
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
    </div>
  `;

  document.getElementById("next").onclick = () => {
    const selOpt = document.querySelector("input[name=opt]:checked");
    if (!selOpt) return alert("Selectează o opțiune sau sari peste!");
    const ans = parseInt(selOpt.value, 10);
    const correct = ans === q.corect;
    if (correct) score++;
    answered.push({ q, answer: ans, correct });
    queue.shift();         // elimină această întrebare din coadă
    showNextQuestion();
  };

  document.getElementById("skip").onclick = () => {
    queue.push(queue.shift()); // mută întrebarea curentă la final
    showNextQuestion();
  };
}

function showResult() {
  const quiz = document.getElementById("quiz");
  const result = document.getElementById("result");
  quiz.innerHTML = "";

  result.innerHTML = `<h2>Ai răspuns corect la ${score} din ${answered.length} întrebări.</h2>`;

  answered.forEach(({ q, answer, correct }, idx) => {
    const block = document.createElement("div");
    block.classList.add("question");
    block.style.background = correct ? "#e6ffec" : "#ffecec";
    block.innerHTML = `
      <strong>${idx + 1}. ${q.intrebare}</strong><br/>
      <div>Răspunsul tău: ${
        answer != null ? q.variante[answer] : "<em>neselectat</em>"
      }</div>
      ${
        correct
          ? `<div>✔ Corect</div>`
          : `<div>✘ Greșit</div>
             <div>Varianta corectă: ${q.variante[q.corect]}</div>`
      }
    `;
    result.appendChild(block);
  });
}

// utilitar pentru amestecare
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
