// script.js

document.addEventListener("DOMContentLoaded", () => {
  const auth        = window.auth;
  const db          = window.db;
  const TS          = window.FieldValue.serverTimestamp;

  // Elemente UI principale
  const emailIn     = document.getElementById("email");
  const passIn      = document.getElementById("password");
  const btnLogin    = document.getElementById("btn-login");
  const btnSignup   = document.getElementById("btn-signup");
  const btnLogout   = document.getElementById("btn-logout");
  const authErr     = document.getElementById("auth-error");
  const authUI      = document.getElementById("auth-container");
  const appUI       = document.getElementById("app-container");

  // Signup
  btnSignup.onclick = async () => {
    authErr.textContent = "";
    try {
      await auth.createUserWithEmailAndPassword(emailIn.value, passIn.value);
    } catch (e) {
      authErr.textContent = e.message;
    }
  };

  // Login
  btnLogin.onclick = async () => {
    authErr.textContent = "";
    try {
      await auth.signInWithEmailAndPassword(emailIn.value, passIn.value);
    } catch (e) {
      authErr.textContent = e.message;
    }
  };

  // Logout
  btnLogout.onclick = () => auth.signOut();

  // Monitor auth state
  auth.onAuthStateChanged(user => {
    if (user) {
      authUI.style.display = "none";
      appUI.style.display  = "block";
      startApp(user.email);
    } else {
      authUI.style.display = "block";
      appUI.style.display  = "none";
    }
  });
});

async function startApp(userEmail) {
  const db        = window.db;
  const TS        = window.FieldValue.serverTimestamp;

  // Elemente UI din aplicație (în startApp pentru scope local)
  const selector    = document.getElementById("selector");
  const themeSelect = document.getElementById("theme-select");
  const startButton = document.getElementById("start");
  const quizDiv     = document.getElementById("quiz");
  const resultDiv   = document.getElementById("result");

  // Log page_load
  db.collection("accessLogs").add({
    timestamp: TS(),
    action:    "page_load",
    user:      userEmail,
    page:      location.pathname
  }).catch(console.error);

  // Quiz vars
  let queue = [];
  let answered = [];
  let score = 0;
  let attemptsLeft = 0;

  // Theme switcher
  themeSelect.addEventListener("change", e => {
    document.body.classList.toggle("dark", e.target.value === "dark");
  });

  // Start test
  startButton.onclick = async () => {
    const sel = selector.value;

    // Load questions
    const res = await fetch("intrebari_toate_materii_rebuilt.json");
    const allQ = await res.json();

    // Determine pool și size
    let pool;
    let size;
    if (sel === "mix") {
      pool = allQ;
      size = 80;
    } else {
      pool = allQ.filter(q => q.materie === sel);
      size = sel === "Semiologie" ? 110 : 100;
    }

    // Build și trim queue
    queue = shuffle(pool).slice(0, size);
    attemptsLeft = queue.length;

    // Log start_test
    db.collection("accessLogs").add({
      timestamp: TS(),
      action:    "start_test",
      user:      userEmail,
      testType:  sel
    }).catch(console.error);

    // Reset UI
    answered = [];
    score = 0;
    startButton.style.display    = "none";
    selector.disabled            = true;
    themeSelect.disabled         = true;
    resultDiv.innerHTML          = "";
    quizDiv.innerHTML            = "";

    // Show first question
    showNextQuestion();
  };

  // Afișează următoarea întrebare
  function showNextQuestion() {
    if (attemptsLeft <= 0) {
      return showResult();
    }

    const q = queue[0];
    quizDiv.innerHTML = `
      <div class="question">
        <h3>${answered.length + 1}. ${q.intrebare}</h3>
        ${q.variante.map((opt,i) =>
          `<label><input type="radio" name="opt" value="${i}"> ${opt}</label>`
        ).join('')}
      </div>
      <div class="buttons">
        <button id="skip">Sari peste</button>
        <button id="verify">Verifică</button>
        <button id="finish">Încheie testul</button>
      </div>
      <div id="feedback"></div>
    `;

    document.getElementById("skip").onclick = () => {
      attemptsLeft--;
      queue.push(queue.shift());
      showNextQuestion();
    };

    document.getElementById("finish").onclick = showResult;

    document.getElementById("verify").onclick = () => {
      const selOpt = document.querySelector("input[name=opt]:checked");
      if (!selOpt) {
        return alert("Selectează o opțiune sau sari peste!");
      }
      const ans = parseInt(selOpt.value, 10);
      const correct = ans === q.corect;
      if (correct) score++;
      answered.push({ q, answer: ans, correct });

      // Disable options și butoane
      quizDiv.querySelectorAll("input[name=opt]").forEach(i => i.disabled = true);
      document.getElementById("verify").disabled = true;
      document.getElementById("skip").disabled = true;

      // Feedback
      const fb = document.getElementById("feedback");
      fb.innerHTML = correct
        ? `<p><strong style="color:green">✔ Corect!</strong></p>`
        : `<p><strong style="color:red">✘ Greșit!</strong></p><p>Varianta corectă: <em>${q.variante[q.corect]}</em></p>`;

      const cont = document.createElement("button");
      cont.textContent = "Continuă";
      cont.style.marginTop = "8px";
      cont.onclick = () => {
        attemptsLeft--;
        queue.shift();
        showNextQuestion();
      };
      fb.appendChild(cont);
    };
  }

  // Afișează rezultatele
  function showResult() {
    quizDiv.innerHTML = "";
    resultDiv.innerHTML = `<h2>Ai răspuns corect la ${score} din ${answered.length} întrebări.</h2>`;
    answered.forEach(({ q, answer, correct }, idx) => {
      const block = document.createElement("div");
      block.classList.add("question");
      block.style.background = correct ? "#e6ffec" : "#ffecec";
      block.style.padding = "10px";
      block.style.marginBottom = "8px";
      block.innerHTML = `
        <strong>${idx + 1}. ${q.intrebare}</strong><br/>
        <div>Răspunsul tău: ${answer != null ? q.variante[answer] : "<em>neselectat</em>"}</div>
        ${
          correct
            ? `<div style="color:green">✔ Corect</div>`
            : `<div style="color:red">✘ Greșit</div><div>Varianta corectă: <em>${q.variante[q.corect]}</em></div>`
        }
      `;
      resultDiv.appendChild(block);
    });
  }

  // util shuffle
  function shuffle(a) {
    return a.sort(() => Math.random() - 0.5);
  }
}
