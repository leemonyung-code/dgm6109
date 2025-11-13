"use strict"

/* 
Lab 9 (Plot 1) - Final Version with Lecture Citations
Source: This file is an adaptation of my Lab 8 solution.
This plot visualizes 4 data variables to test the hypothesis:
"As my self-rated confidence increases, my delayed recall score increases."
1. X-Axis: confidence (Self-Rated Confidence, 0-10)
2. Y-Axis: delayedRecallScore (Delayed Recall Score, 0-15)
3. Size:   studyTime (Study Time, in minutes)
4. Color:  method (Study Method, categorical)
 */

let svgWidth = 800;
let svgHeight = 600; 

let margin = {
    top: 30,
    right: 200,  // Reserve space on the right for the two keys
    bottom: 50,
    left: 50
}; 

let chartWidth = svgWidth - margin.left - margin.right;
let chartHeight = svgHeight - margin.top - margin.bottom;

/* D3 Setup: Select the <body> and append the <svg> canvas
use d3.select() to grab an existing element by its CSS selector ("#canvas").
cite: (Class_01_Slides_Fall2025, p. 42, "Edit part2/main.js")
use .append() to create new elements inside the selection.
cite: (Class_01_Slides_Fall2025, p. 42, "Edit part2/main.js")
use .attr() to set attributes like width and height.
cite: (Class_01_Slides_Fall2025, p. 42, "Edit part2/main.js")
 */
d3.select("#container")
    .style("width", String(svgWidth) + "px");

/* Create drawing canvas */
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw canvas background */
svg.append("rect")
    .attr("fill", "#F9F9F9") 
    .attr("stroke", "black") 
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* 
My personal data collected from Oct 1 to Oct 27.
This is an "Array of Objects" data structure.
cite: (Class_06_Slides, p. 23-29, "An Object framework...")
 */
let dataset = [
  // X: confidence, Y: delayedRecallScore, Size: studyTime, Color: method
  { studyTime: 26, delayedRecallScore: 10, method: "spaced repetition", confidence: 7 },
  { studyTime: 18, delayedRecallScore: 8,  method: "massed practice", confidence: 7.5 },
  { studyTime: 32, delayedRecallScore: 10, method: "elaborative encoding", confidence: 8 },
  { studyTime: 27, delayedRecallScore: 11, method: "mnemonic imagery", confidence: 8 },
  { studyTime: 24, delayedRecallScore: 9,  method: "spaced repetition", confidence: 7 },
  { studyTime: 22, delayedRecallScore: 7,  method: "massed practice", confidence: 7 },
  { studyTime: 30, delayedRecallScore: 10, method: "elaborative encoding", confidence: 7.5 },
  { studyTime: 28, delayedRecallScore: 11, method: "mnemonic imagery", confidence: 8 },
  { studyTime: 25, delayedRecallScore: 10, method: "spaced repetition", confidence: 7 },
  { studyTime: 19, delayedRecallScore: 9,  method: "massed practice", confidence: 8 },
  { studyTime: 33, delayedRecallScore: 11, method: "elaborative encoding", confidence: 8 },
  { studyTime: 27, delayedRecallScore: 10, method: "mnemonic imagery", confidence: 8 },
  { studyTime: 23, delayedRecallScore: 9,  method: "spaced repetition", confidence: 7.5 },
  { studyTime: 21, delayedRecallScore: 8,  method: "massed practice", confidence: 7.5 },
  { studyTime: 29, delayedRecallScore: 10, method: "elaborative encoding", confidence: 8.5 },
  { studyTime: 30, delayedRecallScore: 12, method: "mnemonic imagery", confidence: 7.2 },
  { studyTime: 26, delayedRecallScore: 10, method: "spaced repetition", confidence: 7.5 },
  { studyTime: 19, delayedRecallScore: 8,  method: "massed practice", confidence: 7 },
  { studyTime: 31, delayedRecallScore: 9,  method: "elaborative encoding", confidence: 7.5 },
  { studyTime: 29, delayedRecallScore: 11, method: "mnemonic imagery", confidence: 8 },
  { studyTime: 24, delayedRecallScore: 9,  method: "spaced repetition", confidence: 7 },
  { studyTime: 20, delayedRecallScore: 7,  method: "massed practice", confidence: 7 },
  { studyTime: 32, delayedRecallScore: 10, method: "elaborative encoding", confidence: 7.5 },
  { studyTime: 28, delayedRecallScore: 12, method: "mnemonic imagery", confidence: 8 },
  { studyTime: 24, delayedRecallScore: 10, method: "spaced repetition", confidence: 7 },
  { studyTime: 20, delayedRecallScore: 8,  method: "massed practice", confidence: 7.5 },
  { studyTime: 31, delayedRecallScore: 10, method: "elaborative encoding", confidence: 7.5 }
];

/* Find the [min, max] domains for our scales.
use d3.extent() to automatically find the min and max values from a dataset.
This is an alternative to using d3.min() and d3.max() separately.
cite: (Class_08_Slides, p. 14, "Using d3 to find..._maxes")
 */
let xDomain = d3.extent(dataset, function(d) { return d.confidence; }); // [7, 8.5]
let yDomain = d3.extent(dataset, function(d) { return d.delayedRecallScore; });  // [7, 12]
let rDomain = d3.extent(dataset, function(d) { return d.studyTime; });       // [18, 33]

/* Define all our SCALES
Scales map a data domain (e.g., [7, 8.5]) to a pixel range (e.g., [50, 750]).
cite: (Lab_07_Slides, p. 3, "review: d3.scaleLinear()")
 */

// X Scale (Linear) for Confidence 
// d3.scaleLinear is used for quantitative data.
let xScale = d3.scaleLinear()
    // .domain() takes the data input range
    .domain([xDomain[0] - 0.5, xDomain[1] + 0.5]) 
    // .range() takes the pixel output range
    .range([margin.left, chartWidth + margin.left]); // Map to chart area

// Y Scale (Linear) for Delayed Recall
let yScale = d3.scaleLinear()
    .domain([yDomain[0] - 1, yDomain[1] + 1]) 
    .range([chartHeight + margin.top, margin.top]); // Inverted: 0 is at the top in SVG

// R Scale (Radius/Size) for Study Time
// Using scaleSqrt() means the *area* of the circle scales with the value,
// which is perceptually correct.
// cite: (Class_08_Slides, p. 18, "d3.scaleSqrt()")
let rScale = d3.scaleSqrt() 
    .domain(rDomain) // Data domain: [18, 33]
    .range([5, 20]); // Pixel range: circles will be 5px to 20px radius

// Color Scale (Ordinal) for Study Method
// d3.scaleOrdinal is used for categorical/discrete data.
// cite: (Lab_08_Slides, p. 18, "scalePoint() can help!")
let methodCategories = [
    "spaced repetition", 
    "massed practice", 
    "elaborative encoding", 
    "mnemonic imagery"
];
// Using a built-in D3 color palette
let colorPalette = d3.schemeCategory10; 
let colorScale = d3.scaleOrdinal()
    .domain(methodCategories)
    .range(colorPalette);

/* Lab 9 Requirement: Use Array.sort()
cite: (Lab_HW_09, p. 1, "Use both Array.filter() and Array.sort()...")
Sort the data by 'studyTime' in DESCENDING order (biggest to smallest).
This ensures that when drawing the circles, the largest ones are
drawn first (in the back) and the smallest ones are drawn last (on top).
This prevents small circles from being hidden.
cite: (Class_08_Slides, p. 25, "stating our problem")
use the "mathematical solution" for sorting numbers (b - a for descending).
cite: (Class_08_Slides, p. 34, "mathematical solution")
 */
dataset.sort(function(a, b) {
    // b.studyTime - a.studyTime sorts from largest to smallest.
    return b.studyTime - a.studyTime; 
});


/* Draw the Circles (Data Join)
This is the D3 "data join" pattern.
.selectAll("circle") selects circles that don't exist yet.
.data(dataset) binds our data to the selection.
.join("circle") creates a new "circle" element for each data point.
It's recommended to use a class for each join.
cite: (Class_09_Slides, p. 26, "Assign a unique class")
 */
let circles = svg.selectAll("circle.datapoint") // Use a class
    .data(dataset)
    .join("circle")
    .classed("datapoint", true); // Apply the class

// Set all the attributes for the circles
// use an "accessor function" (a callback) to set attributes dynamically
// based on the data (value) bound to each circle.
// cite: (Class_09_Slides, p. 2, "evaluation functions (callbacks)")
circles
    .attr("r", function(value) {
        // The accessor function returns a value for the attribute.
        // cite: (Lab_07_Slides, p. 8, "Solution: scale the radii")
        return rScale(value.studyTime); // Use the radius scale
    })
    .attr("cx", function (value) {
        return xScale(value.confidence); // X position
    })
    .attr("cy", function (value) {
        return yScale(value.delayedRecallScore); // Y position
    })
    .attr("fill", function(value) {
        // Use conditional logic (via the scale) to set color.
        // cite: (Lab_07_Slides, p. 17, "Color-coding one of our diet...")
        return colorScale(value.method);
    })
    .attr("fill-opacity", 0.7) // Make circles transparent to see overlaps
    .attr("stroke", "black")
    .attr("stroke-width", 0.5);

/* Draw Axes using d3.axis
This is an advanced topic mentioned in class.
cite: (Class_09_Slides, p. 18, "This version jumps ahead...")
 */
// 1. Define the axes generators
let xAxis = d3.axisBottom(xScale) // Tell D3 the axis is on the bottom
    .ticks(5); // Request 5 ticks (D3 will adjust)

let yAxis = d3.axisLeft(yScale); // Tell D3 the axis is on the left

// 2. Call the X axis (append it to the SVG)
svg.append("g") // "g" is a group element to hold the axis
    // use .attr("transform", "translate(...)") to move the whole group
    // cite: (Class_08_Slides, p. 12, "The D3 Margin Convention")
    .attr("transform", "translate(0, " + (chartHeight + margin.top) + ")") // Position at bottom
    .call(xAxis); // .call() executes the axis generator

// 3. Call the Y axis
svg.append("g")
    .attr("transform", "translate(" + margin.left + ", 0)") // Position at left
    .call(yAxis);


/* Draw Axis Labels
These are separate <text> elements from the axis numbers.
cite: (Lab_07_Slides, p. 9-11, "designing our for() loop")
 */
// X-Axis Label
let xAxisLabel = svg.append("text")
    .attr("x", margin.left + chartWidth / 2) // Center in chart area
    .attr("y", svgHeight - margin.bottom / 2 + 10) // Position in bottom margin
    .attr("text-anchor", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .text("Self-Rated Confidence (0-10)");

// Y-Axis Label
let yAxisLabel = svg.append("text")
    .attr("x", -(margin.top + chartHeight / 2)) // Center in chart area (rotated)
    .attr("y", margin.left / 2 - 10) // Position in left margin
    .attr("text-anchor", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .text("Delayed Recall Score (0-15)")
    // Use a transform to rotate the Y-axis label
    // cite: (Lab_08_Slides, p. 27, "Runaway text!")
    .attr("transform", "rotate(-90)");


/* Draw the Keys/Legends
This section manually draws the keys for color and size.
cite: (Lab_07_Slides, p. 20, "What's missing now?")
 */
let legendX = margin.left + chartWidth + 30; // X position for both legends
let legendY_Color = margin.top + 10;
let legendY_Size = margin.top + 170;
let legendSpacing = 25; // Vertical spacing for items

/* 1. COLOR KEY (Method) */
// This is an Array of strings.
// cite: (Class_06_Slides, p. 11, "The Array object")
let legendDisplayNames = [
    "Spaced Repetition",
    "Massed Practice",
    "Elaborative Encoding",
    "Mnemonic Imagery"
];

// Title for the color key
svg.append("text")
    .attr("x", legendX)
    .attr("y", legendY_Color + 5)
    .attr("text-anchor", "start")
    .style("font-weight", "bold") 
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .text("Study Method");

// Use a loop to create all legend items
// cite: (Lab_05_Slides, p. 17, "for loop: a compact while")
// Use the .length property of our array.
// cite: (Class_06_Slides, p. 18, "array.length")
for (let i = 0; i < methodCategories.length; i++) {
    let category = methodCategories[i];
    let categoryText = legendDisplayNames[i];
    let itemY = legendY_Color + legendSpacing * (i + 1);

    svg.append("circle")
        .attr("cx", legendX - 10) 
        .attr("cy", itemY) 
        .attr("r", 6)
        .attr("fill", colorScale(category)) // Use the same color scale
        .attr("fill-opacity", 0.7)
        .attr("stroke", "black")
        .attr("stroke-width", 0.5); 

    svg.append("text")
        .attr("x", legendX + 5) 
        .attr("y", itemY) 
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "middle") 
        .style("font-family", "sans-serif")
        .style("font-size", "12px")
        .text(categoryText); 
}

// Box around the color key
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("x", legendX - 25)
    .attr("y", legendY_Color - 15)
    .attr("width", 170)
    .attr("height", methodCategories.length * legendSpacing + 30);

/* 2. SIZE KEY (Study Time) */
// Accessing array elements by their index [0] and [1]
// cite: (Class_06_Slides, p. 12, "accessing Array elements")
let sizeKeyValues = [
    rDomain[0], // Min
    (rDomain[0] + rDomain[1]) / 2, // Mid
    rDomain[1] // Max
]; 
let sizeKeyLabels = [
    "Min Time (" + sizeKeyValues[0].toFixed(0) + "m)",
    "Avg Time (" + sizeKeyValues[1].toFixed(0) + "m)",
    "Max Time (" + sizeKeyValues[2].toFixed(0) + "m)"
];

// Title for the size key
svg.append("text")
    .attr("x", legendX)
    .attr("y", legendY_Size + 5)
    .attr("text-anchor", "start")
    .style("font-weight", "bold")
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .text("Study Time");

let maxRadius = rScale(rDomain[1]);
let sizeKeyCurrentY = legendY_Size + 30; 
let sizeKeyPadding = 10;

// Loop to create the 3 circles and labels
for (let i = 0; i < sizeKeyValues.length; i++) {
    let radius = rScale(sizeKeyValues[i]);
    let itemY = sizeKeyCurrentY + radius;
    sizeKeyCurrentY = itemY + radius + sizeKeyPadding; // Update Y for next loop
    
    // Append the size circle
    svg.append("circle")
        // Position relative to other key elements
        // cite: (Class_08_Slides, p. 38-41, "Relative positioning")
        .attr("cx", legendX + maxRadius) 
        .attr("cy", itemY)
        .attr("r", rScale(sizeKeyValues[i])) // Use the rScale
        .attr("fill", "none") 
        .attr("stroke", "black"); 

    // Append the text label
    svg.append("text")
        .attr("x", legendX + (maxRadius * 2) + 10) 
        .attr("y", itemY)
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "12px")
        .text(sizeKeyLabels[i]);
}

// Box around the size key
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("x", legendX - 10)
    .attr("y", legendY_Size - 15)
    .attr("width", 180)
    .attr("height", (sizeKeyCurrentY - sizeKeyPadding + 5) - (legendY_Size - 15));