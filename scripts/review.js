let count = Number(localStorage.getItem("reviewCount") || 0);
count += 1;
localStorage.setItem("reviewCount", count);
document.getElementById("reviewCount").textContent = count;
