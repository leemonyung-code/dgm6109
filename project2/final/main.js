"use strict"

// 1. Declare all required global variables at the beginning.
let petSpecies, petName, ownerLastName, zipCode;

// --- from the template ---
document.getElementById("submit").addEventListener("click", processFormValues);
document.getElementById("reset").addEventListener("click", function () {
    clear();
    document.getElementById("submit").toggleAttribute("hidden");
    document.getElementById("reset").toggleAttribute("hidden");
});
// -----------------------------------------


/* * This function is for reading all input values from HTML.
 */
function processFormValues() {
    // Read all input values from the modified HTML and store them in global variables
    petSpecies = document.getElementById("petSpecies").value;
    petName = document.getElementById("petName").value;
    ownerLastName = document.getElementById("ownerLastName").value;
    zipCode = document.getElementById("zipCode").value;

    processData(); // After reading, call the processing function.
}

/* * This function is for controlling the process.
 */
function processData() {
    let evaluationCompleted = false;

    // First, call validateData() to check the validity of a single input
    if (validateData()) {
        // If all are valid, then call evaluateAnswers() to check the business logic
        evaluationCompleted = evaluateAnswers();
    }

    if (evaluationCompleted) {
        document.getElementById("submit").toggleAttribute("hidden");
        document.getElementById("reset").toggleAttribute("hidden");
    }
}

/* * Validate whether the format of a single input is correct
 * This corresponds to the first half of my flowchart
 */
function validateData() {
    // Check whether the species is selected
    if (petSpecies === "") {
        output("Please choose a species for your pet.");
        return false; // Returns false means that validation has failed
    }

    // Check pet's name format
    if (petName.length < 3 || petName.length > 10 || petName.includes(' ')) {
        output("Pet's name must be 3 to 10 characters and contain no spaces.");
        return false;
    }

    // Check owner's name format
    if (ownerLastName.length < 2 || ownerLastName.length > 20 || ownerLastName.includes(' ')) {
        output("Owner's last name must be 2-20 characters and contain no spaces.");
        return false;
    }

    // Check ZIP format
    const isNineDigitZip = (zipCode.length === 9 && !isNaN(zipCode));
    const isFiveDashFourZip = (zipCode.length === 10 && zipCode.charAt(5) === '-');
    if (!isNineDigitZip && !isFiveDashFourZip) {
        output("ZIP must be either 9 digits (e.g., 123456789) or 5-4 with a dash (e.g., 12345-6789).");
        return false;
    }

    // If all checks pass, return true
    return true;
}

/* * Evaluate whether the [combined data] meets project requirements (special rules)
 * This corresponds to the latter part of my flowchart (the special cases involving ferret and dog)
 */
function evaluateAnswers() {
    // For convenience, first standardize all ZIP codes containing ‘-’ to 9-digit numeric values
    let fullZip = zipCode.replace('-', '');

    // Check registration restrictions for ferrets
    if (petSpecies === 'Ferret') {
        const zipPrefix = parseInt(fullZip.substring(0, 5));
        if (zipPrefix >= 90001 && zipPrefix <= 96162) {
            output("Sorry, California state law prohibits ferret ownership.");
            return false; // Returns false means evaluation failure.
        }
        if (zipPrefix >= 96701 && zipPrefix <= 96898) {
            output("Sorry, due to wildlife conservation efforts, ferrets are currently prohibited in Hawaii.");
            return false;
        }
    }

    // Check the registration restrictions for dogs
    if (petSpecies === 'Dog') {
        if (fullZip === '953368271') {
            output("Sorry, due to local ordinances, dogs are not permitted at this location.");
            return false;
        }
    }

    // Path to Successful Registration
    // If none of the above special conditions are triggered, it indicates that the data is fully compliant and a registration code can be generated

    // Generate Registration Code
    const lastFourZip = fullZip.substring(5);
    const firstThreePet = petName.substring(0, 3);
    const firstTwoOwner = ownerLastName.substring(0, 2);
    const registrationCode = lastFourZip + firstThreePet + firstTwoOwner;

    // Display the final successful result
    output(`Thank you for registering your ${petSpecies} named ${petName} ${ownerLastName}. Their registration code is ${registrationCode}.`);
    
    // Returns true to indicate that the evaluation was completed successfully
    return true;
}