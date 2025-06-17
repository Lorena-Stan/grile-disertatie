questionBlock.innerHTML = `
  <strong>${i + 1}. ${q.intrebare}</strong><br/>
  <div>Răspunsul tău: ${
    userAns === null ? "<em>neselectat</em>" : q.variante[userAns]
  }</div>
  ${isCorrect 
    ? "<div><strong>✔ Corect</strong></div>" 
    : `<div><strong>✘ Greșit</strong></div>
       <div>Varianta corectă: ${q.variante[q.corect]}</div>`}
`;
