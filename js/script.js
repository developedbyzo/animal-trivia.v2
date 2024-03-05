const apiUrl = "https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple";
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    async function fetchQuestions() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            questions = data.results;
            displayQuestion();
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        const questionElement = document.querySelector('.question');
        const optionsElement = document.querySelector('.options');

        questionElement.innerHTML = currentQuestion.question;
        optionsElement.innerHTML = '';

        const allOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        const shuffledOptions = shuffleArray(allOptions);

        shuffledOptions.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => checkAnswer(option === currentQuestion.correct_answer));
            optionsElement.appendChild(optionElement);
        });
    }

    function checkAnswer(isCorrect) {
        if (isCorrect) {
            score += 10;
            alert('Correct!');
        } else {
            if(score > 0) {
                score -= 10;
            }
            alert('Incorrect!');
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showScore();
        }
    }

    function showScore() {
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = `Your score: ${score}`;
        if (score === 100) {
            scoreElement.textContent += ' - Congratulations! You answered all questions correctly!';
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    document.getElementById('next-btn').addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showScore();
        }
    });

    fetchQuestions();