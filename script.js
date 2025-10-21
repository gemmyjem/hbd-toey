document.getElementById("card").addEventListener("click", () => {
    const wish = document.getElementById("wish");
    if (wish.style.display !== "block") {
        wish.style.display = "block";
    }
});
