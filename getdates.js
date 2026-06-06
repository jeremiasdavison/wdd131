// 1. Current copyright year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// 2. Last modified date of the document
document.getElementById("lastModified").innerHTML = "Last Modification: " + document.lastModified;
