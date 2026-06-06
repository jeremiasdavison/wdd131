const temperature = 5;
const windSpeed = 15;

function calculateWindChill(t, v) {
  return (13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16)).toFixed(1) + " °C";
}

const output = document.getElementById("windchill");

if (temperature <= 10 && windSpeed > 4.8) {
  output.textContent = calculateWindChill(temperature, windSpeed);
} else {
  output.textContent = "N/A";
}

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;
