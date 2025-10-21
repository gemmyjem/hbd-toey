const card = document.getElementById("card");
const wish = document.getElementById("wish");
const tapText = document.getElementById("tapText");
const replayBtn = document.getElementById("replayBtn");

card.addEventListener("click", () => {
    if (wish.style.display !== "block") {
        wish.style.display = "block";
        tapText.style.display = "none";
        replayBtn.style.display = "inline-block";
    }
});

replayBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    wish.style.display = "none";
    tapText.style.display = "block";
    replayBtn.style.display = "none";
});
