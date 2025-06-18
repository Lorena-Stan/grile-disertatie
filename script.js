// script.js

document.addEventListener("DOMContentLoaded", () => {
  const auth  = window.auth;
  const db    = window.db;
  const TS    = window.FieldValue.serverTimestamp;

  // Elemente UI
  const emailIn   = document.getElementById("email");
  const passIn    = document.getElementById("password");
  const btnLogin  = document.getElementById("btn-login");
  const btnSignup = document.getElementById("btn-signup");
  const btnLogout = document.getElementById("btn-logout");
  const authErr   = document.getElementById("auth-error");
  const authUI    = document.getElementById("auth-container");
  const appUI     = document.getElementById("app-container");

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

  // Auth state change
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


function startApp(userEmail) {
  const db  = window.db;
  const TS  = window.FieldValue.serverTimestamp;

  // Log page_load
  db.collection("accessLogs").add({
    timestamp: TS(),
    action:    "page_load",
    user:      userEmail,
    page:      location.pathname
  }).catch(console.error);

  // Quiz vars
  let allQ = [], queue = [], answered = [], score = 0;
  let attemptsLeft = 0;   // ← contorul nostru

  // Theme switcher
  document.getElementById("theme-select")
    .addEventListener("change", e =>
      document.body.classList.toggle("dark", e.target.value === "dark")
    );

  // Start test
  document.getElementById("start").onclick = async () => {
    const sel = document.getElementById("selector").value;

    // Log start_test
    db.collection("accessLogs").add({
      timestamp: TS(),
      action:    "start_test",
      user:      userEmail,
      testType:  sel
    }).catch(console.error);

    // Load questions
    const res = await fetch("intrebari_toate_materii_rebuilt.json");
    allQ = await res.json();

    // Build queue
    if (sel === "mix") {
      const cats = ["Anatomie patologica","Bacteriologie","Farmacologie","Fiziologie","Patologie","Anatomie","Histologie","Semiologie"];
      let mix = [];
      cats.forEach(cat => {
        const pool = allQ.filter(q => q.materie === cat);
        mix = mix.concat(shuffle(pool).slice(0,15));
      });
      if (mix.length < 80) {
        const rest = allQ.filter(q=> !mix.includes(q));
        mix = mix.concat(shuffle(rest).slice(0,80-mix.length));
      }
      queue = shuffle(mix);
    } else {
      const filt = allQ.filter(q=> q.materie === sel);
      const cnt  = sel === "Semiologie" ? 110 : 100;
      queue = shuffle(filt).slice(0, cnt);
    }

    // Set attemptsLeft la dimensiunea initiala a cozii
    attemptsLeft = queue.length;

    // Reset UI
    answered = []; score = 0;
    document.getElementById("start").style.display      = "none";
    document.getElementById("selector").disabled        = true;
    document.getElementById("theme-select").disabled    = true;
    document.getElementById("result").innerHTML         = "";

    // Afiseaza prima intrebare
    showNextQuestion();
  };

  // Afișează următoarea întrebare, ținând cont de attemptsLeft
  function showNextQuestion() {
    if (attemptsLeft <= 0) {
      return showResult();
    }

    const quiz = document.getElementById("quiz");
    quiz.innerHTML = "";

    const q = queue[0];
    quiz.innerHTML = `
      <div class="question">
        <h3>${answered.length+1}. ${q.intrebare}</h3>
        ${q.variante.map((opt,i)=>
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
      attemptsLeft--;
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
      answered.push({q,answer:ans,correct});

      // dezactivează opțiunile
      quiz.querySelectorAll("input[name=opt]").forEach(i=>i.disabled=true);
      document.getElementById("verify").disabled = true;
      document.getElementById("skip").disabled   = true;

      // feedback
      const fb = document.getElementById("feedback");
      fb.innerHTML = correct
        ? `<p><strong style="color:green">✔ Corect!</strong></p>`
        : `<p><strong style="color:red">✘ Greșit!</strong></p>
           <p>Varianta corectă: <em>${q.variante[q.corect]}</em></p>`;

      // buton “Continuă”
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
    document.getElementById("quiz").innerHTML = "";
    const result = document.getElementById("result");
    result.innerHTML = `<h2>Ai răspuns corect la ${score} din ${answered.length} întrebări.</h2>`;
    answered.forEach(({q,answer,correct},idx) => {
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

  // util shuffle
  function shuffle(a) {
    return a.sort(()=>Math.random()-0.5);
  }
}
