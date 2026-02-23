document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const setupScreen = document.getElementById('setup-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');
    
    const tablesGrid = document.getElementById('tables-grid');
    const maxMultiplierInput = document.getElementById('max-multiplier');
    const startBtn = document.getElementById('start-btn');
    
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const questionEl = document.getElementById('question');
    const answerInput = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-btn');
    const feedbackEl = document.getElementById('feedback');
    
    const scorePercentageEl = document.getElementById('score-percentage');
    const incorrectReview = document.getElementById('incorrect-review');
    const incorrectList = document.getElementById('incorrect-list');
    const retryBtn = document.getElementById('retry-btn');
    
    // Game State
    let selectedTables = [];
    let questions = [];
    let currentQuestionIndex = 0;
    let correctCount = 0;
    let incorrectAnswers = [];
    let isTransitioning = false;

    // Initialize Setup Screen
    function initSetup() {
        tablesGrid.innerHTML = '';
        selectedTables = [];
        
        for (let i = 1; i <= 12; i++) {
            const btn = document.createElement('div');
            btn.classList.add('table-btn');
            btn.textContent = i;
            btn.addEventListener('click', () => toggleTable(i, btn));
            tablesGrid.appendChild(btn);
        }
    }

    function toggleTable(num, btn) {
        const index = selectedTables.indexOf(num);
        if (index > -1) {
            selectedTables.splice(index, 1);
            btn.classList.remove('selected');
        } else {
            selectedTables.push(num);
            btn.classList.add('selected');
        }
    }

    function generateQuestions() {
        questions = [];
        const maxMultiplier = parseInt(maxMultiplierInput.value) || 12;
        
        selectedTables.forEach(table => {
            for (let i = 1; i <= maxMultiplier; i++) {
                questions.push({
                    a: table,
                    b: i,
                    answer: table * i
                });
            }
        });
        
        // Shuffle questions
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
    }

    function startGame() {
        if (selectedTables.length === 0) {
            alert('Please select at least one times table!');
            return;
        }
        
        generateQuestions();
        currentQuestionIndex = 0;
        correctCount = 0;
        incorrectAnswers = [];
        
        setupScreen.classList.remove('active');
        resultScreen.classList.remove('active');
        gameScreen.classList.add('active');
        
        showQuestion();
    }

    function showQuestion() {
        isTransitioning = false;
        feedbackEl.classList.add('hidden');
        feedbackEl.classList.remove('correct', 'incorrect');
        answerInput.value = '';
        answerInput.focus();
        
        const q = questions[currentQuestionIndex];
        questionEl.textContent = `${q.a} × ${q.b} = ?`;
        
        updateProgress();
    }

    function updateProgress() {
        const total = questions.length;
        const current = currentQuestionIndex + 1;
        progressText.textContent = `${current} / ${total}`;
        const percent = ((current - 1) / total) * 100;
        progressBar.style.width = `${percent}%`;
    }

    function checkAnswer() {
        if (isTransitioning) return;
        
        const userAnswer = parseInt(answerInput.value);
        if (isNaN(userAnswer)) return;
        
        isTransitioning = true;
        const q = questions[currentQuestionIndex];
        
        if (userAnswer === q.answer) {
            // Correct
            correctCount++;
            feedbackEl.textContent = 'Awesome! 🎉';
            feedbackEl.classList.add('correct');
        } else {
            // Incorrect
            incorrectAnswers.push({
                question: `${q.a} × ${q.b}`,
                correctAnswer: q.answer,
                userAnswer: userAnswer
            });
            feedbackEl.textContent = `Oops! It's ${q.answer}`;
            feedbackEl.classList.add('incorrect');
        }
        
        feedbackEl.classList.remove('hidden');
        
        // Next question delay
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                endGame();
            }
        }, 1500);
    }

    function endGame() {
        gameScreen.classList.remove('active');
        resultScreen.classList.add('active');
        
        const total = questions.length;
        const percent = Math.round((correctCount / total) * 100);
        scorePercentageEl.textContent = `${percent}%`;
        
        if (incorrectAnswers.length > 0) {
            incorrectReview.classList.remove('hidden');
            incorrectList.innerHTML = '';
            
            incorrectAnswers.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `${item.question} = <span class="correct-ans">${item.correctAnswer}</span> <span class="wrong-ans">${item.userAnswer}</span>`;
                incorrectList.appendChild(li);
            });
        } else {
            incorrectReview.classList.add('hidden');
        }
    }

    // Event Listeners
    startBtn.addEventListener('click', startGame);
    
    submitBtn.addEventListener('click', checkAnswer);
    
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    
    retryBtn.addEventListener('click', () => {
        resultScreen.classList.remove('active');
        setupScreen.classList.add('active');
        initSetup(); // Reset selections
    });

    // Init App
    initSetup();
});
