// Get the final score from localStorage
const finalScore = localStorage.getItem("finalScore");

// Display the final score message
document.addEventListener("DOMContentLoaded", function () {
    if (finalScore) {
        const finalMessage = document.getElementById("final-message");
        finalMessage.textContent = `Your score: ${finalScore}`;
    }
});

// Save the score along with the username
document.getElementById("save-score-btn").addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    const score = finalScore;

    if (username && score) {
// Save the high score in localStorage
        saveHighScore(username, score);

        window.location.href = "/highscore.html";
    } else {
        window.alert("Please enter a username.");
    }
});

// Save the high score
function saveHighScore(username, score) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({score, username});

// Sort by score in descending order
    highScores.sort((a, b) => b.score - a.score);

// Keep the top 5 scores
    if (highScores.length > 5) {
        highScores.pop();
    }

// Save the high scores back to localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}