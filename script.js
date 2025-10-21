const card = document.getElementById("card");
const wish = document.getElementById("wish");
const tapText = document.getElementById("tapText");
const replayBtn = document.getElementById("replayBtn");

card.addEventListener("click", () => {
    // เผยข้อความอวยพร
    if (wish.style.display !== "block") {
        wish.style.display = "block";
        tapText.style.display = "none";
        replayBtn.style.display = "inline-block";
    }
});

// เมื่อกดปุ่มเล่นอีกครั้ง
replayBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // ป้องกัน event ซ้ำ
    wish.style.display = "none";
    tapText.style.display = "block";
    replayBtn.style.display = "none";
});
