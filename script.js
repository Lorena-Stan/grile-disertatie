// script.js

// --- FIREBASE (exportat din <script type="module"> din index.html) ---
const db              = window.db;
const collection      = window.collection;
const addDoc          = window.addDoc;
const serverTimestamp = window.serverTimestamp;

// 🖵 LOG PAGINA ÎNCĂRCATĂ
(async () => {
  try {
    await addDoc(collection(db, "accessLogs"), {
      timestamp: serverTimestamp(),
      action: "page_load",
      page: window.location.pathname,
      userAgent: navigator.userAgent
    });
  } catch (err) {
    console.error("Firebase page_load log error:", err);
  }
})();

// --- VARIABILE APLICATIE ---
let allQuestions = [];
let queue        = [];
let answered     = [];
let score        = 0;

// --- THEME SWITCHER ---
document.getElementById("theme-select").addEventListener("change", e => {
  document.body.classList.toggle("dark", e.target.value === "dark");
});

// --- START TEST ---
document.getElementById("start").addEventListener("click", async () => {
  const sel = document.getElementById("selector").value;

  // 🔥 TRACKING: log START TEST
  try {
    await addDoc(collection(db, "accessLogs"), {
      timestamp: serverTimestamp(),
      action: "start_test",
      testType: sel,
      userAgent: navigator.userAgent
    });
  } catch (err) {
    console.error("Firebase start_test log error:", err);
  }

  // 📥 Încărcare întrebări
  const res = await fetch("intrebari_toate_materii_rebuilt.json");
  allQuestions = await res.json();

  // 🧩 Set mix / categorie
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

  // 🔄 Reset stare
  answered = [];
  score    = 0;
  document.getElementById("start").style.display     = "none";
  document.getElementById("selector").disabled        = true;
  document.getElementById("theme-select").disabled    = true;
  document.getElementById("result").innerHTML         = "";
  showNextQuestion();
});

// --- AFIȘARE ÎNTREBARE URMĂTOARE ---
function showNextQuestion() {
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = "";

  if (queue.length === 0) {
    return showResult();
  }

  const q = queue[0];
  quiz.innerHTML = `
    <div class="question">
      <h3>${answered.length + 1}. ${q.intrebare}</h3>
      ${q.variante.map((opt,i) =>
        `<label><input type="radio" name="opt" value="${i}"> ${opt}</label>`
      ).join("")}
    </div>
    <div class="buttons">
      <button id="skip">Sari peste</button>
      <button id="verify">Verifică</button>
      <button id="finish">Încheie testul</button>
    </div>
    <div id="feedback"></div>
  `;

  document.getElementById("skip").onclick = () => {
    queue.push(queue.shift());
    showNextQuestion();
  };

  document.getElementById("finish").onclick = () => showResult();

  document.getElementById("verify").onclick = () => {
    const selOpt = document.querySelector("input[name=opt]:checked");
    if (!selOpt) return alert("Selectează o opțiune sau sari peste!");
    const ans     = parseInt(selOpt.value, 10);
    const correct = ans === q.corect;
    if (correct) score++;
    answered.push({ q, answer: ans, correct });

    // dezactivează opțiunile și butoanele
    quiz.querySelectorAll("input[name=opt]").forEach(i => i.disabled = true);
    document.getElementById("verify").disabled = true;
    document.getElementById("skip").disabled   = true;

    // feedback
    const fb = document.getElementById("feedback");
    fb.innerHTML = correct
      ? `<p><strong style="color:green">✔ Corect!</strong></p>`
      : `<p><strong style="color:red">✘ Greșit!</strong></p>
         <p>Varianta corectă: <em>${q.variante[q.corect]}</em></p>`;

    // buton continuă
    const cont = document.createElement("button");
    cont.textContent = "Continuă";
    cont.style.marginTop = "8px";
    cont.onclick = () => {
      queue.shift();
      showNextQuestion();
    };
    fb.appendChild(cont);
  };
}

// --- REZULTATE FINALE ---
function showResult() {
  document.getElementById("quiz").innerHTML = "";
  const result = document.getElementById("result");
  result.innerHTML = `<h2>Ai răspuns corect la ${score} din ${answered.length} întrebări.</h2>`;

  answered.forEach(({ q, answer, correct }, idx) => {
    const block = document.createElement("div");
    block.classList.add("question");
    block.style.background = correct 
      ? "var(--correct-bg)" 
      : "var(--wrong-bg)";
    block.style.padding = "10px";
    block.style.marginBottom = "8px";
    block.innerHTML = `
      <strong>${idx + 1}. ${q.intrebare}</strong><br/>
      <div>Răspunsul tău: ${
        answer != null ? q.variante[answer] : "<em>neselectat</em>"
      }</div>
      ${
        correct 
          ? `<div style="color:green">✔ Corect</div>`
          : `<div style="color:red">✘ Greșit</div>
             <div>Varianta corectă: <em>${q.variante[q.corect]}</em></div>`
      }
    `;
    result.appendChild(block);
  });
}

// --- UTILITAR AMESTECARE ---
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
