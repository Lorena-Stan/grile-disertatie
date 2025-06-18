// script.js

// --- FIRESTORE (expus în index.html) ---
const firestoreDB = window.db;
const FieldValue  = window.FieldValue;

// Debug inițial
console.log("🚀 script.js loaded", { firestoreDB });

// --- LOG PAGINA ÎNCĂRCATĂ ---
(async () => {
  console.log("✉️ about to log page_load");
  try {
    const ref = await firestoreDB
      .collection("accessLogs")
      .add({
        timestamp: FieldValue.serverTimestamp(),
        action: "page_load",
        page: location.pathname,
        userAgent: navigator.userAgent
      });
    console.log("✅ page_load logged, id:", ref.id);
  } catch (e) {
    console.error("❌ page_load error:", e);
  }
})();

// --- VARIABILE APLICAȚIE ---
let allQuestions = [], queue = [], answered = [], score = 0;

// --- THEME SWITCHER ---
document.getElementById("theme-select").addEventListener("change", e => {
  document.body.classList.toggle("dark", e.target.value === "dark");
});

// --- START TEST + LOG START_TEST ---
document.getElementById("start").addEventListener("click", async () => {
  const sel = document.getElementById("selector").value;
  console.log("✉️ about to log start_test:", sel);
  try {
    const ref = await firestoreDB
      .collection("accessLogs")
      .add({
        timestamp: FieldValue.serverTimestamp(),
        action: "start_test",
        testType: sel,
        userAgent: navigator.userAgent
      });
    console.log("✅ start_test logged, id:", ref.id);
  } catch (e) {
    console.error("❌ start_test error:", e);
  }

  // ─── Restul logicii de încărcare și afișare a întrebărilor ───

  const res = await fetch("intrebari_toate_materii_rebuilt.json");
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
  score    = 0;
  document.getElementById("start").style.display      = "none";
  document.getElementById("selector").disabled         = true;
  document.getElementById("theme-select").disabled     = true;
  document.getElementById("result").innerHTML          = "";
  showNextQuestion();
});

// ─── Funcțiile showNextQuestion, showResult și shuffle rămân neschimbate ───
