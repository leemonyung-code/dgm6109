"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Get interactive elements from HTML
    const xInput = document.getElementById("xInput");
    const yInput = document.getElementById("yInput");
    const modeSelect = document.getElementById("modeSelect");
    const drawBtn = document.getElementById("drawBtn");
    
    // 2. Select the SVG canvas in D3
    const canvas = d3.select("#canvasSvg");

    // 3. Define a function to perform the drawing.
    function drawImage() {
        // Clear the previous drawing
        canvas.selectAll("*").remove();

        // Get the value from the input
        let dogX = parseFloat(xInput.value);
        let dogY = parseFloat(yInput.value);
        let choice = modeSelect.value;
        
        // 4. Call the dog() function defined in dog.js
        // We pass the obtained canvas, coordinates, and pattern as parameters
        // Here, showOrigin is temporarily set to false because this page lacks options to control it
        dog(canvas, dogX, dogY, false, choice);
    }

    // 5. Let the “Draw!” button call the drawImage function when clicked.
    drawBtn.addEventListener("click", drawImage);

    // 6. After the page finishes loading, immediately draw the initial puppy once.
    drawImage();
});