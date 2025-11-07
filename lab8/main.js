"use strict"

/* Updated for lab8: Configuration variables  */
let svgWidth = 800; // Use the 800x600 space, max is 900x675
let svgHeight = 600; 

// Use an object for margins for better control
let margin = {
    top: 30,     // Increased top margin
    right: 200,  // Reserve 170px on the right for the two keys
    bottom: 50,  // Increased bottom margin for X-axis label
    left: 50     // Increased left margin for Y-axis label
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

/* Draw canvas border */
svg.append("rect")
    .attr("fill", "lightyellow")
    .attr("stroke", "black") 
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Updated for lab8: Comment out the margin border  */
// The Lab #8 instructions ask us to comment this out
/*
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", margin.left) // Use margin object
    .attr("y", margin.top)  // Use margin object
    .attr("width", chartWidth)
    .attr("height", chartHeight);
*/

/* Updated for lab8: Update dataset to 4 variables  */
// We need to add the 'confidence' property from our original data.
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
];  // All data points now include all 4 properties

/* Updated for lab8: Use d3.extent (bonus)  */
// cite: https://observablehq.com/@d3/d3-extent, and AI (Google Gemini 2.5 Pro)
// Use d3.extent() to find [min, max] for our scales
let xDomain = d3.extent(dataset, function(d) { return d.confidence; }); // [7, 8.5]
let yDomain = d3.extent(dataset, function(d) { return d.delayedRecallScore; });  // [7, 12]
let rDomain = d3.extent(dataset, function(d) { return d.studyTime; });       // [18, 33]

/* Updated for lab8: X and Y Scales  */
// X Scale (Linear) for Confidence 
let xScale = d3.scaleLinear()
    // Add 0.5 padding to the domain [6.5, 9.0]
    .domain([xDomain[0] - 0.5, xDomain[1] + 0.5]) 
    .range([margin.left, chartWidth + margin.left]); // Use new margins

// Y Scale (Linear) for Delayed Recall (No change, but use new margin vars)
let yScale = d3.scaleLinear()
    // Add 1.0 padding to the domain [6, 13]
    .domain([yDomain[0] - 1, yDomain[1] + 1]) 
    .range([chartHeight + margin.top, margin.top]); // Use new margins (inverted)

/* New for lab8: radius (size) scale  */
// We will scale the circle radius based on the 'studyTime'
let rScale = d3.scaleSqrt() // Use scaleSqrt() as recommended （cite: last course）
    .domain(rDomain) // Data domain: [18, 33]
    .range([3, 35]); // Pixel range: circles will be 3px to 15px

/* (No Change) color scale  */
// This scale maps 'method' to a color
let methodCategories = [
    "spaced repetition", 
    "massed practice", 
    "elaborative encoding", 
    "mnemonic imagery"
];
let colorPalette = d3.schemeCategory10; 
let colorScale = d3.scaleOrdinal()
    .domain(methodCategories)
    .range(colorPalette);

/* New for lab8: sort data  */
// Use Array.sort() to draw largest circles first (in the back)
// This ensures small circles are not hidden by large ones.
dataset.sort(function(a, b) {
    // b.studyTime - a.studyTime sorts in DESCENDING order (biggest to smallest)
    return b.studyTime - a.studyTime; 
});

/* Updated for lab8: Draw Circles  */
let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles
    // Use rScale for the radius attribute 
    .attr("r", function(value) {
        return rScale(value.studyTime); // Use the new radius scale
    })
    // Use xScale for the new 'confidence' property 
    .attr("cx", function (value) {
        return xScale(value.confidence); 
    })
    // cy is the same property, but uses the updated yScale
    .attr("cy", function (value) {
        return yScale(value.delayedRecallScore);
    })
    // fill is the same
    .attr("fill", function(value) {
        return colorScale(value.method);
    })
    /* New: Add opacity/stroke for legibility  */
    .attr("fill-opacity", 0.7) // Make circles transparent
    .attr("stroke", "black")   // Add a thin black outline
    .attr("stroke-width", 0.5);

/* New for lab8: draw axis line (Using d3.axis) */
// Start: fix for potential deduction ***
// 1. Define the axes
let xAxis = d3.axisBottom(xScale)
    .ticks(5); // Request 5 ticks, D3 will adjust.

let yAxis = d3.axisLeft(yScale);

// 2. Call the X axis
svg.append("g") // "g" is a group element
    .attr("transform", "translate(0, " + (chartHeight + margin.top) + ")") // Position at bottom
    .call(xAxis);

// 3. Call the Y axis
svg.append("g")
    .attr("transform", "translate(" + margin.left + ", 0)") // Position at left
    .call(yAxis);


/* Removed: Manual Axis Lines (d3.axis handles this)
// Draw the X axis line (bottom)
svg.append("line")
    .attr("x1", margin.left)
    .attr("y1", margin.top + chartHeight)
    .attr("x2", margin.left + chartWidth)
    .attr("y2", margin.top + chartHeight)
    .attr("stroke", "black");

// Draw the Y axis line (left)
svg.append("line")
    .attr("x1", margin.left)
    .attr("y1", margin.top)
    .attr("x2", margin.left)
    .attr("y2", margin.top + chartHeight)
    .attr("stroke", "black");
*/

/* Updated for lab8: Axis Labels (New data & positions)  */
let xAxisLabel = svg.append("text")
    .attr("x", margin.left + chartWidth / 2) // Center in chart area
    .attr("y", svgHeight - margin.bottom / 2 + 10) // Position in bottom margin
    .attr("text-anchor", "middle")
    .style("font-family", "sans-serif") // Added for consistency
    .style("font-size", "12px")         // Added for consistency
    .text("Self-Rated Confidence (0-10)"); // New X-axis label

let yAxisLabel = svg.append("text")
    .attr("x", -(margin.top + chartHeight / 2)) // Center in chart area
    .attr("y", margin.left / 2 - 10) // Position in left margin
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .style("font-family", "sans-serif") // Added for consistency
    .style("font-size", "12px")         // Added for consistency
    .text("Delayed Recall Score (0-15)") // Updated Y-axis label
    .attr("transform", "rotate(-90)");

/* Removed: Manual Value Labels (d3.axis handles this)
// (Bottom-Left Label)
let originLabel = svg.append("text")
    .attr("x", margin.left) 
    .attr("y", margin.top + chartHeight + 15) // Position below X-axis line
    .attr("text-anchor", "start") 
    .attr("alignment-baseline", "baseline") 
    .text("(" + xScale.domain()[0] + ", " + yScale.domain()[0] + ")"); // Use .domain()
    
// (Bottom-Right Label for X-Axis Max)
let xMaxLabel = svg.append("text")
    .attr("x", margin.left + chartWidth) // Position at right end of chart line
    .attr("y", margin.top + chartHeight + 15) // Position below X-axis line
    .attr("text-anchor", "end") 
    .text(xScale.domain()[1]); // Get max value from scale's domain

// (Top-Left Label for Y-Axis Max)
let yMaxLabel = svg.append("text")
    .attr("x", margin.left - 5) 
    .attr("y", margin.top) 
    .attr("text-anchor", "end") 
    .attr("alignment-baseline", "middle") 
    .text(yScale.domain()[1]); // Get max value from scale's domain
*/

/* Updated for lab8: TWO KEYS (Color + Size)  */
// Define positioning variables for the legends
let legendX = margin.left + chartWidth + 20; // X position for both legends
let legendY_Color = margin.top + 10;         // Y position for the first legend
let legendY_Size = margin.top + 170;         // Y position for the second legend
let legendSpacing = 25;                    // Vertical spacing for items

/* 1. COLOR KEY (from phase3a, with a box)  */
let legendDisplayNames = [
    "Spaced Repetition",
    "Massed Practice",
    "Elaborative Encoding",
    "Mnemonic Imagery"
];

// Add a title for the color key
svg.append("text")
    .attr("x", legendX)
    .attr("y", legendY_Color + 5)
    .attr("text-anchor", "start")
    .style("font-weight", "bold") 
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .text("Study Method");

// Use a loop to create all legend items (bonus)
for (let i = 0; i < methodCategories.length; i++) {
    let category = methodCategories[i];
    let categoryText = legendDisplayNames[i];
    let itemY = legendY_Color + legendSpacing * (i + 1);

    svg.append("circle")
        .attr("cx", legendX -10) 
        .attr("cy", itemY) 
        .attr("r", 5) 
        .attr("fill", colorScale(category)); 

    svg.append("text")
        .attr("x", legendX ) 
        .attr("y", itemY) 
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "middle") 
        .style("font-family", "sans-serif")
        .style("font-size", "12px")
        .text(categoryText); 
}

// Add a box around the color key
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("x", legendX - 25)
    .attr("y", legendY_Color - 15)
    .attr("width", 170) // Manual width to fit text
    .attr("height", methodCategories.length * legendSpacing + 30); // Dynamic height

/* 2. New size key (for studyTime)  */
// Define the data values we want to show in the key: Min, Mid, Max
let sizeKeyValues = [rDomain[0], (rDomain[0] + rDomain[1]) / 2, rDomain[1]]; 
let sizeKeyLabels = [
    "Min Time (" + sizeKeyValues[0].toFixed(0) + ")",
    "Avg Time (" + sizeKeyValues[1].toFixed(0) + ")",
    "Max Time (" + sizeKeyValues[2].toFixed(0) + ")"
];

// Add a title for the size key
svg.append("text")
    .attr("x", legendX + 20)
    .attr("y", legendY_Size + 5)
    .attr("text-anchor", "start")
    .style("font-weight", "bold")
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .text("Study Time(min)");

// 1. Obtain the maximum circle radius for alignment
let maxRadius = rScale(rDomain[1]);

// 2. Dynamic tracker for Y-axis position
//     Start 30px below the title
let sizeKeyCurrentY = legendY_Size + 30; 

// 3. Vertical spacing between circles
let sizeKeyPadding = 10;

// Use a loop to create the 3 circles and labels (bonus)
for (let i = 0; i < sizeKeyValues.length; i++) {
    let radius = rScale(sizeKeyValues[i]);
    let itemY = sizeKeyCurrentY + radius; // Position the circle's center here
    sizeKeyCurrentY = itemY + radius + sizeKeyPadding; // Update Y to prepare for the next circle
    
    // Append the size circle
    svg.append("circle")
        .attr("cx", legendX + maxRadius) // Indent circle (make room for largest)
        .attr("cy", itemY)
        .attr("r", rScale(sizeKeyValues[i])) // Use rScale to get correct radius
        .attr("fill", "none") 
        .attr("stroke", "black"); 

    // Append the text label
    svg.append("text")
        .attr("x", legendX + maxRadius + maxRadius + 10) // Position text to the right of the largest circle
        .attr("y", itemY)
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "12px")
        .text(sizeKeyLabels[i]);
}

// Add a box around the size key
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("x", legendX - 10)
    .attr("y", legendY_Size - 15)
    .attr("width", 180) // Manual width
    .attr("height", (sizeKeyCurrentY - sizeKeyPadding + 15) - (legendY_Size - 10)) // Dynamic height