document.addEventListener("DOMContentLoaded", function () {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const highscoreList = document.getElementById("highscore-list");

// Add each high score to the list
    highScores.forEach(function (score) {
        const li = document.createElement("li");
        li.textContent = score.username + ": " + score.score;
        highscoreList.appendChild(li);
    });
});
