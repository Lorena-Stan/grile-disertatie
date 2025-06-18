// script.js

// --- FIREBASE (expus în index.html) ---
const db              = window.db;
const collection      = window.collection;
const addDoc          = window.addDoc;
const serverTimestamp = window.serverTimestamp;

// Debug inițial
console.log("🚀 script.js loaded");
console.log("FIRESTORE READY (în script):", {
  db: !!db,
  collection: typeof collection,
  addDoc: typeof addDoc,
  serverTimestamp: typeof serverTimestamp
});

// 🖵 LOG PAGINA ÎNCĂRCATĂ
(async () => {
  console.log("✉️ about to log page_load");
  try {
    const ref = await addDoc(
      collection(db, "accessLogs"),
      {
        timestamp: serverTimestamp(),
        action: "page_load",
        page: location.pathname,
        userAgent: navigator.userAgent
      }
    );
    console.log("✅ page_load logged, doc ID:", ref.id);
  } catch (err) {
    console.error("❌ Firebase page_load error:", err);
  }
})();

// --- APLICAȚIE ---
let allQuestions = [], queue = [], answered = [], score = 0;

// Theme switcher
document.getElementById("theme-select").addEventListener("change", e => {
  document.body.classList.toggle("dark", e.target.value === "dark");
});

// START TEST
document.getElementById("start").addEventListener("click", async () => {
  const sel = document.getElementById("selector").value;
  console.log("✉️ about to log start_test:", sel);
  try {
    const ref = await addDoc(
      collection(db, "accessLogs"),
      {
        timestamp: serverTimestamp(),
        action: "start_test",
        testType: sel,
        userAgent: navigator.userAgent
      }
    );
    console.log("✅ start_test logged, doc ID:", ref.id);
  } catch (err) {
    console.error("❌ Firebase start_test error:", err);
  }
  // … restul codului tău de quiz …
});
