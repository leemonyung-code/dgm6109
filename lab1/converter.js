// lab1.js - Week 1 temperature converter
// Dali, Yunnan's November average (long-term climatological average ~11.5°C).
// Source: https://www.chinaeducationaltours.com/guide/dali-weather-november.htm#:~:text=The%20temperatures%20in%20November%20are,rainy%20days%20in%20this%20month
let fahrenheit = 52.7; // Dali, Yunnan - November average (approx. 11.5°C → 52.7°F)
let celsius = (fahrenheit - 32) * 5 / 9;
let kelvin = (fahrenheit + 459.67) * 5 / 9;

console.log("Temperature (fahrenheit): " + fahrenheit);
console.log("Temperature (celsius): " + celsius);
console.log("Temperature (kelvin): " + kelvin);
