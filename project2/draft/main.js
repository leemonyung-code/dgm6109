"use strict";

document.getElementById('submit').addEventListener('click', function() {
  var out = document.getElementById('output');
  if (out) out.innerHTML = '';
  if (validateData()) {
    evaluateAnswers();
  }
});

function validateData() {
  let species = document.getElementById("species").value;
  if (species === "") {
    output("Please choose a species.");
    return false;
  } else {
    output("The draft looks good so far!");
    return true;
  }
}
