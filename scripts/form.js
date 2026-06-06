const products = [
  { id: "fc-1888", name: "Flux Capacitor" },
  { id: "fc-2050", name: "Power Laces" },
  { id: "fs-1987", name: "Time Circuits" },
  { id: "ac-2000", name: "Hoverboard" },
  { id: "jj-1969", name: "HAL 9000" }
];

const select = document.getElementById("productName");

products.forEach(product => {
  const option = document.createElement("option");
  option.value = product.id;
  option.textContent = product.name;
  select.appendChild(option);
});
