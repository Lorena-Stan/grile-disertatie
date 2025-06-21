// script.js

document.addEventListener("DOMContentLoaded", () => {
  const auth       = window.auth;
  const db         = window.db;
  const TS         = window.FieldValue.serverTimestamp;
  const emailIn    = document.getElementById("email");
  const passIn     = document.getElementById("password");
  const btnLogin   = document.getElementById("btn-login");
  const btnSignup  = document.getElementById("btn-signup");
  const btnLogout  = document.getElementById("btn-logout");
  const authErr    = document.getElementById("auth-error");
  const authUI     = document.getElementById("auth-container");
  const appUI      = document.getElementById("app-container");

  // Sign-up
  btnSignup.onclick = async () => {
    authErr.textContent = "";
    try {
      await auth.createUserWithEmailAndPassword(
        emailIn.value.trim(),
        passIn.value
      );
    } catch (e) {
      authErr.textContent = e.message;
    }
  };

  // Login
  btnLogin.onclick = async () => {
    authErr.textContent = "";
    try {
      await auth.signInWithEmailAndPassword(
        emailIn.value.trim(),
        passIn.value
      );
    } catch (e) {
      authErr.textContent = e.message;
    }
  };

  // Logout
  btnLogout.onclick = () => auth.signOut();

  // Auth state listener
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
  const db           = window.db;
  const TS           = window.FieldValue.serverTimestamp;
  const allQuestions = await (await fetch("intrebari_toate_materii_rebuilt.json")).json();

  // Log page_load
  db.collection("accessLogs").add({
    timestamp: TS(),
    action:    "page_load",
    user:      userEmail,
    page:      location.pathname
  }).catch(console.error);

  // Theme switcher
  document.getElementById("theme-select")
    .addEventListener("change", e =>
      document.body.classList.toggle("dark", e.target.value === "dark")
    );

  // Print variants for any selection
  document.getElementById("print").onclick = () => {
    const sel = document.getElementById("selector").value;
    let toPrint = [];
    let header  = "";

    if (sel === "mix") {
      // 80 grile random din toate materiile
      const cats = [
        "Anatomie patologica","Bacteriologie","Farmacologie",
        "Fiziologie","Patologie","Anatomie",
        "Histologie","Semiologie"
      ];
      let pool = [];
      cats.forEach(cat => {
        const subset = allQuestions.filter(q => q.materie === cat);
        pool = pool.concat(shuffle(subset).slice(0, 15));
      });
      toPrint = shuffle(pool).slice(0, 80);
      header  = "80 grile random din toate materiile";
    } else {
      // 100 sau 110 din materia selectată
      const filtered = allQuestions.filter(q => q.materie === sel);
      const count = sel === "Semiologie" ? 110 : 100;
      toPrint = shuffle(filtered).slice(0, count);
      header  = `${count} grile ${sel}`;
    }

    // Open print window
    const pw = window.open("", "_blank");
    pw.document.write(`
      <html><head><title>Variantă grile — ${header}</title>
      <style>
        body { font-family: Arial, sans-serif; padding:20px; }
        h1 { text-align:center; }
        .question { margin-bottom:1em; }
        ol { margin:0 0 1em 20px; }
      </style>
      </head><body>
        <h1>${header}</h1>
    `);
    toPrint.forEach((q, i) => {
      pw.document.write(`
        <div class="question">
          <strong>${i+1}. ${q.intrebare}</strong>
          <ol type="a">
            ${q.variante.map(opt => `<li>${opt}</li>`).join("")}
          </ol>
        </div>
      `);
    });
    pw.document.write("</body></html>");
    pw.document.close();
    pw.focus();
    pw.print();
  };

  // Quiz variables
  let queue        = [], answered = [], score = 0, attemptsLeft = 0;

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

    // Build queue
    if (sel === "mix") {
      const cats = [
        "Anatomie patologica","Bacteriologie","Farmacologie",
        "Fiziologie","Patologie","Anatomie",
        "Histologie","Semiologie"
      ];
      let mix = [];
      cats.forEach(cat => {
        const subset = allQuestions.filter(q => q.materie === cat);
        mix = mix.concat(shuffle(subset).slice(0, 15));
      });
      queue = shuffle(mix);
    } else {
      const filtered = allQuestions.filter(q => q.materie === sel);
      const cnt = sel === "Semiologie" ? 110 : 100;
      queue = shuffle(filtered).slice(0, cnt);
    }

    // Stop at 100 answered questions max
    attemptsLeft = Math.min(queue.length, 100);
    queue = queue.slice(0, attemptsLeft);

    // Hide controls
    ["print","start"].forEach(id =>
      document.getElementById(id).style.display = "none"
    );
    document.getElementById("selector").disabled     = true;
    document.getElementById("theme-select").disabled = true;
    document.getElementById("result").innerHTML      = "";

    showNextQuestion();
  };

  // Show next question
  function showNextQuestion() {
    if (attemptsLeft <= 0) return showResult();

    const quiz = document.getElementById("quiz");
    quiz.innerHTML = "";
    const q = queue[0];

    quiz.innerHTML = `
      <div class="question">
        <h3>${answered.length+1}. ${q.intrebare}</h3>
        ${q.variante.map((opt,i)=>
          `<label style="display:block; margin:4px 0;">
             <input type="radio" name="opt" value="${i}"> ${opt}
           </label>`
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
      const ans     = parseInt(selOpt.value,10);
      const correct = ans === q.corect;
      if (correct) score++;
      answered.push({q,answer:ans,correct});

      quiz.querySelectorAll("input[name=opt]").forEach(i=>i.disabled=true);
      document.getElementById("verify").disabled = true;
      document.getElementById("skip").disabled   = true;

      const fb = document.getElementById("feedback");
      fb.innerHTML = correct
        ? `<p style="color:green"><strong>✔ Corect!</strong></p>`
        : `<p style="color:red"><strong>✘ Greșit!</strong></p>
           <p>Varianta corectă: <em>${q.variante[q.corect]}</em></p>`;

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

  // Show final results
  function showResult() {
    document.getElementById("quiz").innerHTML = "";
    const result = document.getElementById("result");
    result.innerHTML = `<h2>Ai răspuns corect la ${score} din ${answered.length} întrebări.</h2>`;
    answered.forEach(({q,answer,correct},idx)=>{
      const block = document.createElement("div");
      block.classList.add("question");
      block.style.background = correct? "#e6ffec":"#ffecec";
      block.style.padding = "10px";
      block.style.marginBottom = "8px";
      block.innerHTML = `
        <strong>${idx+1}. ${q.intrebare}</strong><br/>
        <div>Răspunsul tău: ${answer!=null? q.variante[answer] : "<em>neselectat</em>"}</div>
        ${correct
          ? `<div style="color:green">✔ Corect</div>`
          : `<div style="color:red">✘ Greșit</div>
             <div>Varianta corectă: <em>${q.variante[q.corect]}</em></div>`}
      `;
      result.appendChild(block);
    });
  }

  // Shuffle util
  function shuffle(a) {
    return a.sort(()=>Math.random()-0.5);
  }
}
