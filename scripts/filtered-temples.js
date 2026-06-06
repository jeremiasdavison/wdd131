const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-utah-temple-exterior-374571-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-438521.jpg",
  },
  {
    templeName: "Buenos Aires Argentina",
    location: "Buenos Aires, Argentina",
    dedicated: "1986, January, 17",
    area: 11675,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/buenos-aires-argentina/400x250/buenos-aires-argentina-temple-lds-296633-wallpaper.jpg",
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sao-paulo-brazil/400x250/sao-paulo-brazil-temple-lds-547652-wallpaper.jpg",
  },
];

const gallery = document.querySelector(".gallery");
const navLinks = document.querySelectorAll("nav a");
const heading = document.querySelector("main h1");

function dedicatedYear(dedicated) {
  return parseInt(dedicated.split(",")[0]);
}

function createCard(temple) {
  const figure = document.createElement("figure");
  figure.innerHTML = `
    <figcaption>
      <h2>${temple.templeName}</h2>
      <p><span>Location:</span> ${temple.location}</p>
      <p><span>Dedicated:</span> ${temple.dedicated}</p>
      <p><span>Size:</span> ${temple.area.toLocaleString()} sq ft</p>
    </figcaption>
    <img
      src="${temple.imageUrl}"
      alt="${temple.templeName} Temple"
      loading="lazy"
      width="400"
      height="250"
    >
  `;
  return figure;
}

function renderCards(list) {
  gallery.innerHTML = "";
  list.forEach((t) => gallery.appendChild(createCard(t)));
}

function filterTemples(filter) {
  heading.textContent = filter;
  switch (filter) {
    case "Old":
      renderCards(temples.filter((t) => dedicatedYear(t.dedicated) < 1900));
      break;
    case "New":
      renderCards(temples.filter((t) => dedicatedYear(t.dedicated) > 2000));
      break;
    case "Large":
      renderCards(temples.filter((t) => t.area > 90000));
      break;
    case "Small":
      renderCards(temples.filter((t) => t.area < 10000));
      break;
    default:
      renderCards(temples);
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    filterTemples(link.textContent.trim());
  });
});

const menuToggle = document.getElementById("menu-toggle");
const primaryNav = document.getElementById("primary-nav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuToggle.innerHTML = isOpen ? "✕" : "&#9776;";
  });
}

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;

filterTemples("Home");
