"use strict"

/*
    Term Project - Draft 1
    Author: Limeng Yang
    
    Goal: Visualize the relationship between Study Time and Delayed Recall Score.
    
    Changes from Lab 9:
    1. Loaded data asynchronously from an external JSON file (data.json) instead of a hardcoded array.
    2. Included ALL 4 weeks of data (including Oct 28) and ALL 4 study methods to satisfy the
       "Shows 4+ Weeks of Consistently Recorded Data" rubric requirement.
    3. Strictly used 'let' for variables and 'function' keyword for functions (no arrow functions).
    4. Added comprehensive comments and citations.

    Citations:
    - D3 Scatterplot structure adapted from Lab 7 and Lab 9 solutions by Jay Taylor-Laird.
    - d3.json pattern adapted from Class 8 slides and Term Project Framework.
    - Axis rotation logic adapted from Lab 8 slides.
*/

/* Global Variables */
let svgWidth = 800;
let svgHeight = 600;

let margin = {
    top: 40,
    right: 200, // Reserved space for the legend
    bottom: 60,
    left: 60
};

let chartWidth = svgWidth - margin.left - margin.right;
let chartHeight = svgHeight - margin.top - margin.bottom;

let svg; // Global variable for SVG selection
let data; // Global variable to hold the dataset

/*
    Initialize the visualization.
    Loads data asynchronously from "data.json".
    cite: (Term Project Framework, main.js template)
*/
(function() {
    // Using d3.json to load data. The .then() method handles the promise.
    // IMPORTANT: Converted arrow function to regular function as per requirements.
    d3.json("data.json").then(function(loadedData) {
        data = loadedData; // Store data globally
        
        // Convert string numbers to actual numbers if necessary (JSON numbers are usually safe, but good practice)
        // cite: (Class_06_Slides, p. 25, "Data Types")
        for (let i = 0; i < data.length; i++) {
            data[i].studyTime = +data[i].studyTime;
            data[i].delayedRecallScore = +data[i].delayedRecallScore;
        }

        buildVisualization();
    });
})();

/*
    Main function to orchestrate the drawing.
    cite: (Term Project Framework, main.js template)
*/
function buildVisualization() {
    createSVG();
    drawScatterplot();
}

/*
    Creates the SVG element and background.
    cite: (Class_01_Slides, p. 42, "Edit part2/main.js")
*/
function createSVG() {
    // Select the div and ensure it fits the width
    // DELETE or COMMENT OUT the line below to fix alignment:
    // d3.select("#canvas").style("width", svgWidth + "px");

    // Create the SVG element
    svg = d3.select("#canvas")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // Draw a background rectangle/border
    svg.append("rect")
        .attr("fill", "#FFFFF0") // Ivory background
        .attr("stroke", "black")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
}

/*
    Draws the scatterplot: scales, axes, dots, and legend.
    Adapted from my Lab 9 Plot 2 code.
*/
function drawScatterplot() {
    
    // 1. Define Scales
    
    // Find min/max for X (Study Time)
    // cite: (Class_08_Slides, p. 14, "Using d3 to find..._maxes")
    // let xDomain = d3.extent(data, function(d) { return d.studyTime; });
    
    // // Find min/max for Y (Delayed Recall)
    // let yDomain = d3.extent(data, function(d) { return d.delayedRecallScore; });
    
    // Calculate the min/max value of Study Time
    let timeDomain = d3.extent(data, function(d) { return d.studyTime; });
    
    // Y Scale: Linear
    // cite: (Lab_07_Slides, p. 3, "review: d3.scaleLinear()")
    let yScale = d3.scaleLinear()
        .domain([timeDomain[0] - 2, timeDomain[1] + 2]) // Add some padding
        .range([chartHeight + margin.top, margin.top]);

    // X Scale: Linear (Inverted for SVG)
    let xScale = d3.scaleLinear()
        .domain([6, 14]) // Fixed domain 0-15 (max score) for better context
        .range([margin.left, chartWidth + margin.left]);

    // Color Scale: Ordinal for Methods
    // cite: (Lab_08_Slides, p. 18, "scalePoint() can help!")
    let methodCategories = [
        "spaced repetition", 
        "massed practice", 
        "elaborative encoding", 
        "mnemonic imagery"
    ];
    
    let colorScale = d3.scaleOrdinal()
        .domain(methodCategories)
        .range(d3.schemeCategory10); // Use standard D3 colors

    // 2. Draw Axes
    
    // Define Axis Generators
    // cite: (Class_09_Slides, p. 18, "d3.axisBottom")
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    // Draw X Axis
    svg.append("g")
        .attr("transform", "translate(0, " + (chartHeight + margin.top) + ")")
        .call(xAxis);

    // Draw Y Axis
    svg.append("g")
        .attr("transform", "translate(" + margin.left + ", 0)")
        .call(yAxis);

    // 3. Draw Labels
    
    // X Axis Label
    svg.append("text")
        .attr("x", margin.left + chartWidth / 2)
        .attr("y", svgHeight - margin.bottom / 3)
        .attr("text-anchor", "middle")
        .attr("class", "axisLabel") // Used class from CSS
        .style("font-size", "14px")
        .text("Delayed Recall Score (0-15)");

    // Y Axis Label (Rotated)
    // cite: (Lab_08_Slides, p. 27, "Runaway text!")
    svg.append("text")
        .attr("x", -(margin.top + chartHeight / 2))
        .attr("y", margin.left / 3)
        .attr("text-anchor", "middle")
        .attr("class", "axisLabel")
        .style("font-size", "14px")
        .attr("transform", "rotate(-90)")
        .text("Study Time (minutes)");

    // 4. Draw Data Points (Circles)
    
    // Data Join
    // cite: (Class_09_Slides, p. 26, "Assign a unique class")
    let circles = svg.selectAll("circle.datapoint")
        .data(data)
        .join("circle")
        .classed("datapoint", true);

    // Set Attributes
    circles
        .attr("r", 6) // Fixed radius
        .attr("cx", function(d) {
            return xScale(d.delayedRecallScore);
        })
        .attr("cy", function(d) {
            return yScale(d.studyTime);
        })
        .attr("fill", function(d) {
            // Color based on method
            // cite: (Lab_07_Slides, p. 17, "Color-coding")
            return colorScale(d.method);
        })
        .attr("fill-opacity", 0.7)
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    // 5. Draw Legend (Key)
    // cite: (Lab_07_Slides, p. 24, "Array-based solution")
    drawLegend(methodCategories, colorScale);
}

/*
    Helper function to draw the legend.
    Separated for cleaner code organization.
*/
function drawLegend(categories, colorScale) {
    let legendX = margin.left + chartWidth + 20;
    let legendY = margin.top + 20;
    let legendSpacing = 25;

    // Title
    svg.append("text")
        .attr("x", legendX)
        .attr("y", legendY)
        .attr("font-weight", "bold")
        .style("font-family", "sans-serif")
        .text("Study Method");

    // Loop through categories to draw colored dots and text
    // cite: (Lab_05_Slides, p. 17, "for loop")
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let itemY = legendY + 30 + (i * legendSpacing);

        // Color Indicator
        svg.append("circle")
            .attr("cx", legendX + 10)
            .attr("cy", itemY)
            .attr("r", 6)
            .attr("fill", colorScale(category))
            .attr("stroke", "black");

        // Text Label
        svg.append("text")
            .attr("x", legendX + 25)
            .attr("y", itemY + 4) // Vertical alignment adjustment
            .style("font-family", "sans-serif")
            .style("font-size", "12px")
            .text(category);
    }
}