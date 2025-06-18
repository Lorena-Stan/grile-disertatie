// script.js

document.addEventListener("DOMContentLoaded", () => {
  const auth       = window.auth;
  const db         = window.db;
  const FieldValue = window.FieldValue;

  const emailIn    = document.getElementById("email");
  const passIn     = document.getElementById("password");
  const btnLogin   = document.getElementById("btn-login");
  const btnSignup  = document.getElementById("btn-signup");
  const btnLogout  = document.getElementById("btn-logout");
  const authErr    = document.getElementById("auth-error");
  const authUI     = document.getElementById("auth-container");
  const appUI      = document.getElementById("app-container");

  // SIGN UP
  btnSignup.addEventListener("click", async () => {
    authErr.textContent = "";
    try {
      await auth.createUserWithEmailAndPassword(
        emailIn.value,
        passIn.value
      );
    } catch (e) {
      authErr.textContent = e.message;
    }
  });

  // LOGIN
  btnLogin.addEventListener("click", async () => {
    authErr.textContent = "";
    try {
      await auth.signInWithEmailAndPassword(
        emailIn.value,
        passIn.value
      );
    } catch (e) {
      authErr.textContent = e.message;
    }
  });

  // LOGOUT
  btnLogout.addEventListener("click", () => {
    auth.signOut();
  });

  // AUTH STATE
  auth.onAuthStateChanged(user => {
    if (user) {
      authUI.style.display = "none";
      appUI.style.display  = "block";
      startApp(user);
    } else {
      authUI.style.display = "block";
      appUI.style.display  = "none";
    }
  });
});

// După autentificare, inițializează quiz + tracking
function startApp(user) {
  const db         = window.db;
  const FieldValue = window.FieldValue;

  // LOG page_load
  db.collection("accessLogs").add({
    timestamp: FieldValue.serverTimestamp(),
    action: "page_load",
    user: user.email,
    page: location.pathname
  }).catch(console.error);

  // Variabile quiz
  let allQuestions = [], queue = [], answered = [], score = 0;

  // Theme switcher
  document.getElementById("theme-select")
    .addEventListener("change", e =>
      document.body.classList.toggle("dark", e.target.value === "dark")
    );

  // START TEST
  document.getElementById("start").onclick = async () => {
    const sel = document.getElementById("selector").value;

    // LOG start_test
    db.collection("accessLogs").add({
      timestamp: FieldValue.serverTimestamp(),
      action: "start_test",
      user: user.email,
      testType: sel
    }).catch(console.error);

    // Încarcă și afișează întrebările
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
    document.getElementById("start").style.display       = "none";
    document.getElementById("selector").disabled          = true;
    document.getElementById("theme-select").disabled      = true;
    document.getElementById("result").innerHTML           = "";
    showNextQuestion();
  };

  // Show next question, verify, skip, finalize…
  function showNextQuestion() {
    const quiz = document.getElementById("quiz");
    quiz.innerHTML = "";
    if (queue.length === 0) return showResult();

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

      quiz.querySelectorAll("input[name=opt]").forEach(i => i.disabled = true);
      document.getElementById("verify").disabled = true;
      document.getElementById("skip").disabled   = true;

      const fb = document.getElementById("feedback");
      fb.innerHTML = correct
        ? `<p><strong style="color:green">✔ Corect!</strong></p>`
        : `<p><strong style="color:red">✘ Greșit!</strong></p>
           <p>Varianta corectă: <em>${q.variante[q.corect]}</em></p>`;

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

  function showResult() {
    document.getElementById("quiz").innerHTML = "";
    const result = document.getElementById("result");
    result.innerHTML = `<h2>Ai răspuns corect la ${score} din ${answered.length} întrebări.</h2>`;
    answered.forEach(({ q, answer, correct }, idx) => {
      const block = document.createElement("div");
      block.classList.add("question");
      block.style.background = correct ? "#e6ffec" : "#ffecec";
      block.style.padding = "10px";
      block.style.marginBottom = "8px";
      block.innerHTML = `
        <strong>${idx+1}. ${q.intrebare}</strong><br/>
        <div>Răspunsul tău: ${answer!=null ? q.variante[answer] : "<em>neselectat</em>"}</div>
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

  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
}
