"use strict"

/*
Lab 9 (Plot 2)
Source: This file is an adaptation of my Lab 7 solution.
It has been modified to:
1. Use the full dataset (like Lab 8) to include the 'method' property.
2. Use Array.filter() to isolate "spaced repetition" and "massed practice" methods. 
3. Use Color to represent the 'method' as a 3rd data property. 
4. Use d3.axis (like Lab 8) for cleaner axes.
This plot visualizes 3 data variables to test the hypothesis:
"As study time increases, delayed recall increases."
1. X-Axis: studyTime (Study Time, in minutes)
2. Y-Axis: delayedRecallScore (Delayed Recall Score, 0-15)
3. Color:  method (Study Method, categorical)
Configuration variables: drawing */

let svgWidth = 800;
let svgHeight = 600; 

let margin = {
    top: 30,
    right: 200,  // Reserve 200px on the right for the key
    bottom: 50,
    left: 50
}; 

let chartWidth = svgWidth - margin.left - margin.right;
let chartHeight = svgHeight - margin.top - margin.bottom;

/* Make the div with the ID “container” in HTML as wide as the canvas. */
// d3.select() grabs an existing element.
// cite: (Class_01_Slides_Fall2025, p. 42, "Edit part2/main.js")
d3.select("#container")
    .style("width", String(svgWidth) + "px");

/* Create drawing canvas */
let svg = d3.select("#canvas")
    .append("svg") // .append() creates a new element
    .attr("width", svgWidth) // .attr() sets an attribute
    .attr("height", svgHeight);
// cite: (Class_01_Slides_Fall2025, p. 42, "Edit part2/main.js")

/* Draw canvas background */
svg.append("rect")
    .attr("fill", "#FFFFF0") // A light ivory background
    .attr("stroke", "black") 
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/*Data: This is the full dataset, required for filtering.
This is an "Array of Objects" data structure.
cite: (Class_06_Slides, p. 23-29, "An Object framework...")
 */
let fullDataset = [
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


/*Lab 9 Requirement: Use Array.filter()
cite: (Lab_HW_09, p. 1, "Use both Array.filter() and Array.sort()...")
This function creates a new array 'dataset' that ONLY includes
data points where the 'method' is one of the two that I want to compare.
Array.filter() takes a "callback" or "evaluation function".
cite: (Class_09_Slides, p. 2, "evaluation functions (callbacks)")
The anonymous function(d) is executed for every item in fullDataset.
cite: (Class_09_Slides, p. 3, "Array.filter()")
The "||" (OR) operator returns true if EITHER condition is true.
cite: (Class_04_Slides (1), p. 5, "Boolean 'or': ||")
 */
let dataset = fullDataset.filter(function(d) {
    return d.method === "spaced repetition" || d.method === "massed practice";
});


/*Find the [min, max] domains for our scales
Run d3.extent() on our NEW 'dataset' (the filtered one).
cite: (Class_08_Slides, p. 14, "Using d3 to find..._maxes")
 */
let xDomain = d3.extent(dataset, function(d) { return d.studyTime; });
let yDomain = d3.extent(dataset, function(d) { return d.delayedRecallScore; });

/*Define all our SCALES
cite: (Lab_07_Slides, p. 3, "review: d3.scaleLinear()")
 */

// X Scale (Linear) for Study Time
let xScale = d3.scaleLinear()
    .domain([xDomain[0] - 2, xDomain[1] + 2]) // e.g., [16, 28]
    .range([margin.left, chartWidth + margin.left]); // Map to chart area

// Y Scale (Linear) for Delayed Recall
let yScale = d3.scaleLinear()
    .domain([yDomain[0] - 1, yDomain[1] + 1]) // e.g., [6, 11]
    .range([chartHeight + margin.top, margin.top]); // Inverted (0 is at top)

// NEW: Color Scale (Ordinal) for Study Method
// cite: (Lab_08_Slides, p. 18, "scalePoint() can help!")
let methodCategories = [
    "spaced repetition", 
    "massed practice"
];
// Get the first two colors from the d3.schemeCategory10 palette
// This is accessing elements from an array by their index.
// cite: (Class_06_Slides, p. 12, "accessing Array elements")
let colorPalette = [d3.schemeCategory10[0], d3.schemeCategory10[1]]; 
let colorScale = d3.scaleOrdinal()
    .domain(methodCategories)
    .range(colorPalette);


/*Draw the Circles (Data Join)
use our filtered 'dataset' here.
cite: (Class_09_Slides, p. 26, "Assign a unique class")
 */
let circles = svg.selectAll("circle.datapoint") // Use a class for this group of circles
    .data(dataset) // Use the filtered data
    .join("circle")
    .classed("datapoint", true); // Apply the class

// Set all the attributes for the circles
circles
    .attr("r", 8) // Use a fixed radius of 8
    .attr("cx", function (value) {
        // This is an "accessor function" (callback)
        // cite: (Class_09_Slides, p. 2, "evaluation functions (callbacks)")
        return xScale(value.studyTime); // X position
    })
    .attr("cy", function (value) {
        return yScale(value.delayedRecallScore); // Y position
    })
    // NEW: Use colorScale for the 'method' property
    .attr("fill", function(value) {
        // cite: (Lab_07_Slides, p. 17, "Color-coding one of our diet...")
        return colorScale(value.method);
    })
    // Add opacity/stroke for legibility 
    .attr("fill-opacity", 0.7)
    .attr("stroke", "black")
    .attr("stroke-width", 0.5);

/*Draw Axes using d3.axis
This is an advanced topic mentioned in class.
cite: (Class_09_Slides, p. 18, "This version jumps ahead...")
 */
// 1. Define the axes generators
let xAxis = d3.axisBottom(xScale);
let yAxis = d3.axisLeft(yScale);

// 2. Call the X axis
svg.append("g") // "g" is a group element to hold the axis
    .attr("transform", "translate(0, " + (chartHeight + margin.top) + ")") // Position at bottom
    .call(xAxis); // .call() executes the axis generator

// 3. Call the Y axis
svg.append("g")
    .attr("transform", "translate(" + margin.left + ", 0)") // Position at left
    .call(yAxis);


/*Draw Axis Labels
cite: (Lab_07_Slides, p. 9-11, "designing our for() loop")
 */
// X-Axis Label
let xAxisLabel = svg.append("text")
    .attr("x", margin.left + chartWidth / 2)
    .attr("y", svgHeight - margin.bottom / 2 + 10)
    .attr("text-anchor", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .text("Study Time (minutes)"); // Updated label

// Y-Axis Label
let yAxisLabel = svg.append("text")
    .attr("x", -(margin.top + chartHeight / 2))
    .attr("y", margin.left / 2 - 10)
    .attr("text-anchor", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .text("Delayed Recall Score (0-15)")
    // Use transform to rotate the Y-axis label
    // cite: (Lab_08_Slides, p. 27, "Runaway text!")
    .attr("transform", "rotate(-90)");


/*Draw the Key/Legend
cite: (Lab_07_Slides, p. 20, "What's missing now?")
It only needs a COLOR key for this plot.
 */
let legendX = margin.left + chartWidth + 30; // X position for legend
let legendY_Color = margin.top + 10;
let legendSpacing = 25;

// The display names for our two filtered categories
// This is an Array of strings.
// cite: (Class_06_Slides, p. 11, "The Array object")
let legendDisplayNames = [
    "Spaced Repetition",
    "Massed Practice"
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

// Use a loop to create the 2 legend items
// cite: (Lab_05_Slides, p. 17, "for loop: a compact while")
// iterate using the .length property of our array.
// cite: (Class_06_Slides, p. 18, "array.length")
// This loop builds the legend by iterating through an array.
// cite: (Lab_07_Slides, p. 24, "Array-based solution")
for (let i = 0; i < methodCategories.length; i++) {
    let category = methodCategories[i];
    let categoryText = legendDisplayNames[i];
    let itemY = legendY_Color + legendSpacing * (i + 1);

    svg.append("circle")
        .attr("cx", legendX - 10) 
        .attr("cy", itemY) 
        .attr("r", 6)
        .attr("fill", colorScale(category)) // Use the color scale
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
    .attr("height", methodCategories.length * legendSpacing + 30); // Dynamic height