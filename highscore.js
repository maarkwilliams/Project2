document.addEventListener("DOMContentLoaded", function() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const highscoreList = document.getElementById("highscore-list");

 // Add each highscore to the list  
    highScores.forEach(score => {
        const li = document.createElement("li");
        li.textContent = `${score.username}: ${score.score}`;
        highscoreList.appendChild(li);
    });
});