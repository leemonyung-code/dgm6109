"use strict";

document.getElementById('submit').addEventListener('click', function() {
  var out = document.getElementById('output');
  if (out) out.innerHTML = '';
  if (validateData()) {
    evaluateAnswers();
  }
});

function validateData() {
  let species = document.getElementById('species').value.trim();
  let petName = document.getElementById('petName').value.trim();
  let ownerLastName = document.getElementById('ownerLastName').value.trim();
  let zip = document.getElementById('zip').value.trim();

  if (!(species === 'Cat' || species === 'Dog' || species === 'Ferret')) {
    output('Sorry, that species is not yet in our database.');
    return false;
  }

  if (petName.length < 3 || petName.length > 10 || /\s/.test(petName)) {
    output('Pet name must be 3-10 characters and contain no spaces.');
    return false;
  }

  if (ownerLastName.length < 2 || ownerLastName.length > 20 || /\s/.test(ownerLastName)) {
    output('Owner last name must be 2-20 characters and contain no spaces.');
    return false;
  }

  const zip9 = /^[0-9]{9}$/;
  const zip54 = /^[0-9]{5}-[0-9]{4}$/;
  if (!(zip9.test(zip) || zip54.test(zip))) {
    output('ZIP must be either 9 digits (e.g., 123456789) or 5-4 with dash (e.g., 12345-6789).');
    return false;
  }

  if (species === 'Ferret') {
    let zipDigits = zip.replace('-', '');
    let zipPrefix = parseInt(zipDigits.substring(0,5), 10);
    if (zipPrefix >= 90001 && zipPrefix <= 96162) {
      output('Sorry, California state law prohibits ferret ownership.');
      return false;
    }
    if (zipPrefix >= 96701 && zipPrefix <= 96898) {
      output('Sorry, due to wildlife conservation efforts, ferrets are currently prohibited in Hawaii.');
      return false;
    }
  }

  output('All form data is valid.');
  return true;
}

function evaluateAnswers() {
  let species = document.getElementById('species').value.trim();
  let petName = document.getElementById('petName').value.trim();
  let ownerLastName = document.getElementById('ownerLastName').value.trim();
  let zip = document.getElementById('zip').value.trim();

  let zipDigits = zip.replace('-', '');
  let last4 = zipDigits.slice(-4);

  let petPart = petName.substring(0,3).toUpperCase();
  if (petPart.length < 3) petPart = petPart.padEnd(3, 'X');

  let ownerPart = ownerLastName.substring(0,2).toUpperCase();
  if (ownerPart.length < 2) ownerPart = ownerPart.padEnd(2, 'X');

  let regNumber = last4 + petPart + ownerPart;

  output('Thank you for registering your ' + species + ' named ' + petName + ' ' + ownerLastName + '.');
  output('Their registration number is ' + regNumber + '.');
  return true;
}
