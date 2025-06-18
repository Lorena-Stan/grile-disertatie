// script.js

// Firestore compat instance
const db         = window.db;
const FieldValue = window.FieldValue;

// Debug
console.log("🚀 script.js loaded", { db });

// 1) Log pe pageload
(async () => {
  console.log("✉️ about to log page_load");
  try {
    const docRef = await db.collection("accessLogs").add({
      timestamp: FieldValue.serverTimestamp(),
      action: "page_load",
      page: location.pathname,
      userAgent: navigator.userAgent
    });
    console.log("✅ page_load logged, id:", docRef.id);
  } catch (e) {
    console.error("❌ page_load error:", e);
  }
})();

// VARIABILE APLICAȚIE
let allQuestions = [], queue = [], answered = [], score = 0;

// Theme switcher
document.getElementById("theme-select").addEventListener("change", e =>
  document.body.classList.toggle("dark", e.target.value === "dark")
);

// 2) Start test + log
document.getElementById("start").addEventListener("click", async () => {
  const sel = document.getElementById("selector").value;

  console.log("✉️ about to log start_test:", sel);
  try {
    const docRef = await db.collection("accessLogs").add({
      timestamp: FieldValue.serverTimestamp(),
      action: "start_test",
      testType: sel,
      userAgent: navigator.userAgent
    });
    console.log("✅ start_test logged, id:", docRef.id);
  } catch (e) {
    console.error("❌ start_test error:", e);
  }

  // Încarcă întrebările după log
  const res = await fetch("intrebari_toate_materii_rebuilt.json");
  allQuestions = await res.json();

  // … restul logicii de quiz …
});
