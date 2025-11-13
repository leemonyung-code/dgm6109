"use strict"

/* Lab 9 (Plot 1)
Source: This file is an adaptation of my Lab 8 solution.
This plot visualizes 4 data variables to test the hypothesis:
"As my self-rated confidence increases, my delayed recall score increases."
1. X-Axis: confidence (Self-Rated Confidence, 0-10)
2. Y-Axis: delayedRecallScore (Delayed Recall Score, 0-15)
3. Size:   studyTime (Study Time, in minutes)
4. Color:  method (Study Method, categorical) */

/* Configuration variables: drawing */
let svgWidth = 800; // Use the 800x600 space
let svgHeight = 600; 

// Use an object for margins for better control
let margin = {
    top: 30,
    right: 200,  // Reserve space on the right for the two keys
    bottom: 50,
    left: 50
}; 

// Calculate the width and height of the chart area (inside the margins)
let chartWidth = svgWidth - margin.left - margin.right;
let chartHeight = svgHeight - margin.top - margin.bottom;

/* Make the div with the ID “container” in HTML as wide as the canvas. */
d3.select("#container")
    .style("width", String(svgWidth) + "px");

/* Create drawing canvas */
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw canvas background (changed from border) */
svg.append("rect")
    .attr("fill", "#F9F9F9") // A light grey background
    .attr("stroke", "black") 
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Data from Oct 1 to Oct 27. */
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
   Cite: Adapted from Lab 8
This uses d3.extent() to automatically find the min and max values. */
let xDomain = d3.extent(dataset, function(d) { return d.confidence; }); // [7, 8.5]
let yDomain = d3.extent(dataset, function(d) { return d.delayedRecallScore; });  // [7, 12]
let rDomain = d3.extent(dataset, function(d) { return d.studyTime; });       // [18, 33]

/* Define all our SCALES */

// X Scale (Linear) for Confidence 
let xScale = d3.scaleLinear()
    // Add 0.5 padding to the domain [6.5, 9.0]
    .domain([xDomain[0] - 0.5, xDomain[1] + 0.5]) 
    .range([margin.left, chartWidth + margin.left]); // Map to chart area

// Y Scale (Linear) for Delayed Recall
let yScale = d3.scaleLinear()
    // Add 1.0 padding to the domain [6, 13]
    .domain([yDomain[0] - 1, yDomain[1] + 1]) 
    .range([chartHeight + margin.top, margin.top]); // Inverted: 0 is at the top

// R Scale (Radius/Size) for Study Time
// Using scaleSqrt() means the *area* of the circle scales with the value.
let rScale = d3.scaleSqrt() 
    .domain(rDomain) // Data domain: [18, 33]
    .range([5, 20]); // Pixel range: circles will be 5px to 20px radius

// Color Scale (Ordinal) for Study Method
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
Sort the data by 'studyTime' in DESCENDING order (biggest to smallest).
This ensures that when we draw the circles, the largest ones are
drawn first (in the back) and the smallest ones are drawn last (on top).
This prevents small circles from being hidden. */
dataset.sort(function(a, b) {
    // b.studyTime - a.studyTime sorts from largest to smallest.
    return b.studyTime - a.studyTime; 
});

/* Draw the Circles (Data Join) */
let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

// Set all the attributes for the circles
circles
    // Use rScale for the radius attribute 
    .attr("r", function(value) {
        return rScale(value.studyTime); // Use the radius scale
    })
    // Use xScale for the 'confidence' property 
    .attr("cx", function (value) {
        return xScale(value.confidence); // X position
    })
    // Use yScale for the 'delayedRecallScore' property
    .attr("cy", function (value) {
        return yScale(value.delayedRecallScore); // Y position
    })
    // Use colorScale for the 'method' property
    .attr("fill", function(value) {
        return colorScale(value.method);
    })
    // Add opacity/stroke for legibility 
    .attr("fill-opacity", 0.7) // Make circles transparent
    .attr("stroke", "black")   // Add a thin black outline
    .attr("stroke-width", 0.5);

/* Draw Axes using d3.axis Cite: Adapted from Lab 8 */
// 1. Define the axes generators
let xAxis = d3.axisBottom(xScale)
    .ticks(5); // Request 5 ticks (D3 will adjust)

let yAxis = d3.axisLeft(yScale);

// 2. Call the X axis (append it to the SVG)
svg.append("g") // "g" is a group element
    .attr("transform", "translate(0, " + (chartHeight + margin.top) + ")") // Position at bottom
    .call(xAxis);

// 3. Call the Y axis
svg.append("g")
    .attr("transform", "translate(" + margin.left + ", 0)") // Position at left
    .call(yAxis);

/* Draw Axis Labels */
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
    .attr("alignment-baseline", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .text("Delayed Recall Score (0-15)")
    .attr("transform", "rotate(-90)");

/* Draw the Keys/Legends
Cite: Adapted from Lab 8
It needs two keys: one for Color (Method) and one for Size (Study Time). */
let legendX = margin.left + chartWidth + 30; // X position for both legends
let legendY_Color = margin.top + 10;         // Y position for the first legend
let legendY_Size = margin.top + 170;         // Y position for the second legend
let legendSpacing = 25;                    // Vertical spacing for items

/* 1. COLOR KEY (Method) */
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
for (let i = 0; i < methodCategories.length; i++) {
    let category = methodCategories[i];
    let categoryText = legendDisplayNames[i];
    let itemY = legendY_Color + legendSpacing * (i + 1);

    svg.append("circle")
        .attr("cx", legendX - 10) 
        .attr("cy", itemY) 
        .attr("r", 6) // Made slightly larger
        .attr("fill", colorScale(category))
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
        .attr("cx", legendX + maxRadius) // Center all circles horizontally
        .attr("cy", itemY)
        .attr("r", rScale(sizeKeyValues[i]))
        .attr("fill", "none") 
        .attr("stroke", "black"); 

    // Append the text label
    svg.append("text")
        .attr("x", legendX + (maxRadius * 2) + 10) // Text to the right
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
    // Calculate height dynamically
    .attr("height", (sizeKeyCurrentY - sizeKeyPadding + 5) - (legendY_Size - 15));