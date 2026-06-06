const yearEl = document.getElementById("currentyear");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const lastModifiedEl = document.getElementById("lastModified");
if (lastModifiedEl) {
  lastModifiedEl.textContent = "Last Modification: " + document.lastModified;
}

const menuToggle = document.getElementById("menu-toggle");
const primaryNav = document.getElementById("primary-nav");
const openIcon = "☰";
const closeIcon = "✕";

function toggleMenu() {
  const isOpen = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  menuToggle.innerHTML = isOpen ? closeIcon : openIcon;
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", toggleMenu);
}
