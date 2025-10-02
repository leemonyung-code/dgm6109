"use strict";

document.getElementById("submit").addEventListener("click", function() {

  // Read the input
  let raw = document.getElementById("inputF").value;

  //In case someone inputs symbols or characters
  if (raw.trim() === "") {
    output("Please enter a value for Fahrenheit.", false);
    return;
  }

  //Original bug code: let fahrenheit = document.getElementById("inputF").value
  let fahrenheit = parseFloat(raw);
  if (isNaN(fahrenheit)) {
    output("Invalid input — please enter a numeric value (e.g., 52.7).", false);
    return;
  }
  let celsius = (fahrenheit - 32) * 5 / 9;
  let kelvin = celsius + 273.15;

  // Output original
  output("Original (Fahrenheit): " + fahrenheit.toFixed(2), false);

  // Output conversion
  let choice = document.getElementById("conversionChoice").value;
  if (choice === "c") {
    output("Converted (Celsius): " + celsius.toFixed(2), false);
  } else {
    output("Converted (Kelvin): " + kelvin.toFixed(2), false);
  }
})