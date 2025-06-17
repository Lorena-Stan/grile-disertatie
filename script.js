function showResult() {
  const resultDiv = document.getElementById("result");
  document.getElementById("quiz").innerHTML = "";
  resultDiv.innerHTML = `<h2>Ai răspuns corect la ${score} din ${selectedQuestions.length} întrebări.</h2>`;

  selectedQuestions.forEach((q, i) => {
    const userAns = userAnswers[i];
    const isCorrect = userAns === q.corect;

    // DEFINIREA LIPSĂ:
    const questionBlock = document.createElement("div");
    questionBlock.classList.add("question");
    questionBlock.style.border = "1px solid #ccc";
    questionBlock.style.padding = "10px";
    questionBlock.style.marginBottom = "10px";
    questionBlock.style.background = isCorrect ? "#e6ffec" : "#ffecec";

    // CONȚINUTUL
    questionBlock.innerHTML = `
      <strong>${i + 1}. ${q.intrebare}</strong><br/>
      <div>Răspunsul tău: ${
        userAns === null ? "<em>neselectat</em>" : q.variante[userAns]
      }</div>
      ${
        isCorrect 
          ? "<div><strong>✔ Corect</strong></div>" 
          : `<div><strong>✘ Greșit</strong></div>
             <div>Varianta corectă: ${q.variante[q.corect]}</div>`
      }
    `;

    resultDiv.appendChild(questionBlock);
  });
}
