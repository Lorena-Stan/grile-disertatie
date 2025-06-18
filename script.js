// script.js

document.addEventListener("DOMContentLoaded", () => {
  const db         = window.db;
  const FieldValue = window.FieldValue;

  console.log("🚀 script.js loaded — Firestore ready:", !!db);

  // 1) log page_load
  (async () => {
    console.log("✉️ Logging page_load …");
    try {
      const ref = await db.collection("accessLogs").add({
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

  // 2) theme switcher
  document.getElementById("theme-select").addEventListener("change", e => {
    document.body.classList.toggle("dark", e.target.value === "dark");
  });

  // 3) start test
  document.getElementById("start").addEventListener("click", async () => {
    const sel = document.getElementById("selector").value;
    console.log("✉️ Logging start_test:", sel);

    try {
      const ref = await db.collection("accessLogs").add({
        timestamp: FieldValue.serverTimestamp(),
        action: "start_test",
        testType: sel,
        userAgent: navigator.userAgent
      });
      console.log("✅ start_test logged, id:", ref.id);
    } catch (e) {
      console.error("❌ start_test error:", e);
    }

    // … aici pornește logica testului …
    // fetch(...), shuffle(...), showNextQuestion() etc.
  });
});
