let questions = [];
let currentQuestionIndex = 0;
let totalQuestions = 10;
let score = 0;
// Function to randomise the order of questions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// Function to get the questions from JSON file and shuffle
async function fetchQuestions() {
    try {
        const response = await fetch("questions.json");
        const data = await response.json();
        questions = data;
        shuffleArray(questions);
        loadRandomQuestion();
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}
// Function to load a random question
function loadRandomQuestion() {
    if (questions.length === 0 || currentQuestionIndex >= totalQuestions) {
        window.location.href = "/end.html";
        return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    // Update the topic and question text on the page
    document.getElementById("topic").textContent = currentQuestion.topic;
    document.getElementById("question").textContent = currentQuestion.question;
    // Get the answer buttons and update their text
    const buttons = document.querySelectorAll(".button");
    buttons.forEach((button, index) => {
        button.textContent = currentQuestion.options[index];
        button.style.backgroundColor = "";
        button.style.pointerEvents = "auto";
        // Add click event listeners for each option
        button.onclick = () => checkAnswer(button, currentQuestion.answer);
    });
    // Update the score
    document.getElementById("current-score").textContent = `Score: ${score}`;
}
// Function to check the user's answer
function checkAnswer(selectedButton, correctAnswer) {
    const buttons = document.querySelectorAll(".button");
    // Disable the buttons after an answer is selected
    buttons.forEach(button => {
        button.style.pointerEvents = "none";
    });
    // Check if the answer is correct
    if (selectedButton.textContent === correctAnswer) {
        selectedButton.style.backgroundColor = "green";
        score++;
    } else {
        selectedButton.style.backgroundColor = "red";
        // Find and highlight the correct answer
        buttons.forEach(button => {
            if (button.textContent === correctAnswer) {
                button.style.backgroundColor = "green";
            }
        });
    }
    currentQuestionIndex++;
    // Add loading time for next question
    setTimeout(loadRandomQuestion, 1000);
}
// Start the quiz by fetching questions
document.addEventListener("DOMContentLoaded", fetchQuestions);