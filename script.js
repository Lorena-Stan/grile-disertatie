
let currentIndex = 0;
let score = 0;
let currentQuestions = [];

function startTest() {
    const value = document.getElementById("testSelect").value;
    switch(value) {
        case "anatomie":
            currentQuestions = questions_anatomie.slice(0, 100);
            break;
        case "farmacologie":
            currentQuestions = questions_farmacologie.slice(0, 100);
            break;
        case "fiziologie":
            currentQuestions = questions_fiziologie.slice(0, 100);
            break;
        case "patologie":
            currentQuestions = questions_patologie.slice(0, 100);
            break;
        case "bacteriologie":
            currentQuestions = questions_bacteriologie.slice(0, 100);
            break;
        case "random":
        default:
            const all = [...questions_anatomie, ...questions_farmacologie, ...questions_fiziologie, ...questions_patologie, ...questions_bacteriologie];
            currentQuestions = all.sort(() => 0.5 - Math.random()).slice(0, 80);
    }
    currentIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const q = currentQuestions[currentIndex];
    if (!q) return;
    const quiz = document.getElementById("quiz");
    quiz.innerHTML = `<h2>${q.intrebare}</h2>` +
                     q.variante.map((v, i) => `<label><input type="radio" name="a" value="${i}">${v}</label><br>`).join('') +
                     `<button onclick="next()">Următoarea întrebare</button>`;
}

function next() {
    const selected = document.querySelector('input[name="a"]:checked');
    if (selected && parseInt(selected.value) === currentQuestions[currentIndex].corect) {
        score++;
    }
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
        showQuestion();
    } else {
        document.getElementById("quiz").innerHTML = `<h2>Ai terminat testul. Scor: ${score}/${currentQuestions.length}</h2>`;
    }
}
