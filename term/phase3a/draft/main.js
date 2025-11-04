"use strict"

/* Configuration variables: drawing */
let svgWidth = 600; 
let svgHeight = 400; 
let margin = 25; 

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
    .attr("fill", "none")
    .attr("stroke", "black") 
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw margin border. */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);

/* Data: Replace example with your simplified data */
/* According to Lab 7's instructions,
my original hypothesis could not be directly
plotted as a scatter plot using two numerical variables,
so I modified it to:
“As study time increases, delayed recall increases.”*/
let dataset = [
  // Add 'method' property to each object
  { studyTime: 26, delayedRecallScore: 10, method: "spaced repetition" },
  { studyTime: 18, delayedRecallScore: 8,  method: "massed practice" },
  { studyTime: 32, delayedRecallScore: 10, method: "elaborative encoding" },
  { studyTime: 27, delayedRecallScore: 11, method: "mnemonic imagery" },
  { studyTime: 24, delayedRecallScore: 9,  method: "spaced repetition" },
  { studyTime: 22, delayedRecallScore: 7,  method: "massed practice" },
  { studyTime: 30, delayedRecallScore: 10, method: "elaborative encoding" },
  { studyTime: 28, delayedRecallScore: 11, method: "mnemonic imagery" },
  { studyTime: 25, delayedRecallScore: 10, method: "spaced repetition" },
  { studyTime: 19, delayedRecallScore: 9,  method: "massed practice" },
  { studyTime: 33, delayedRecallScore: 11, method: "elaborative encoding" },
  { studyTime: 27, delayedRecallScore: 10, method: "mnemonic imagery" },
  { studyTime: 23, delayedRecallScore: 9,  method: "spaced repetition" },
  { studyTime: 21, delayedRecallScore: 8,  method: "massed practice" },
  { studyTime: 29, delayedRecallScore: 10, method: "elaborative encoding" },
  { studyTime: 30, delayedRecallScore: 12, method: "mnemonic imagery" },
  { studyTime: 26, delayedRecallScore: 10, method: "spaced repetition" },
  { studyTime: 19, delayedRecallScore: 8,  method: "massed practice" },
  { studyTime: 31, delayedRecallScore: 9,  method: "elaborative encoding" },
  { studyTime: 29, delayedRecallScore: 11, method: "mnemonic imagery" },
  { studyTime: 24, delayedRecallScore: 9,  method: "spaced repetition" },
  { studyTime: 20, delayedRecallScore: 7,  method: "massed practice" },
  { studyTime: 32, delayedRecallScore: 10, method: "elaborative encoding" },
  { studyTime: 28, delayedRecallScore: 12, method: "mnemonic imagery" },
  { studyTime: 24, delayedRecallScore: 10, method: "spaced repetition" },
  { studyTime: 20, delayedRecallScore: 8,  method: "massed practice" },
  { studyTime: 31, delayedRecallScore: 10, method: "elaborative encoding" }
];  // All data points now include the 'method' property

// Find the min value of studyTime
let minStudyTime = d3.min(dataset, function(d) { return d.studyTime; });
// Find the max value of studyTime
let maxStudyTime = d3.max(dataset, function(d) { return d.studyTime; });

// Find the min value of delayedRecallScore
let minRecall = d3.min(dataset, function(d) { return d.delayedRecallScore; });
// Find the max value of delayedRecallScore
let maxRecall = d3.max(dataset, function(d) { return d.delayedRecallScore; });

//For future use, store the domain in a variable.
let xDomain = [15, 40]; // Range for (studyTime) on X axis
let yDomain = [5, 15]; // Range for (studyTime) on Y

// Define the chart area width, reserving space on the right for the legend
// Reserve 150 pixels for the legend.
let chartWidth = svgWidth - 150;

let xScale = d3.scaleLinear()
    .domain(xDomain)
    // The range now stops at chartWidth, not svgWidth
    .range([margin, chartWidth - margin]);

let yScale = d3.scaleLinear()
    .domain(yDomain)
    .range([svgHeight - margin, margin]);

// Define the unique categories (domain) for the 'method' property
    let methodCategories = [
        "spaced repetition", 
        "massed practice", 
        "elaborative encoding", 
        "mnemonic imagery"
    ];

// Define a list of colors (range) to map to those categories
// d3.schemeCategory10 is a built-in D3 color palette
let colorPalette = d3.schemeCategory10; 

// Create the ordinal scale (Category -> Color)
let colorScale = d3.scaleOrdinal()
    .domain(methodCategories)
    .range(colorPalette);

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", 8) 
    .attr("cx", function (value) {
        return xScale(value.studyTime);
    })
    .attr("cy", function (value) {
        return yScale(value.delayedRecallScore);
    })
    .attr("fill", function(value) {
        // Use the colorScale to find the color for this data point's 'method'
        return colorScale(value.method);
    });

/**** label the axes ****/
let xAxisLabel = svg.append("text")
    .attr("x", chartWidth / 2) //
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("Study Time (minutes, Zoomed: 15-40)");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", margin / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("Delayed Recall Score (Zoomed: 5-15)")
    .attr("transform", "rotate(-90)");

/**** label key graph coordinates ****/
// (Bottom-Left Label)
let originLabel = svg.append("text")
    .attr("x", margin) // Keep it to the right side
    .attr("y", svgHeight - (margin / 2)) // Maintain the height of the X-axis labels
    .attr("text-anchor", "start") // Change to “start” to have the text begin writing to the right starting from x=margin.
    .attr("alignment-baseline", "baseline") // Ensure it is aligned with the baseline on the y-axis.
    .text("(" + xDomain[0] + ", " +  yDomain[0] + ")"); // Use my domain variable
    
// (Bottom-Right Label for X-Axis Max)
let xMaxLabel = svg.append("text")
    .attr("x", chartWidth - margin) // Fix: Position at chartWidth - margin (425px)
    .attr("y", svgHeight - (margin / 2)) 
    .attr("text-anchor", "end") 
    .text(xDomain[1]);

// (Top-Left Label for Y-Axis Max)
let yMaxLabel = svg.append("text")
    .attr("x", margin - 5) // 5 pixels to the left of the left margin (25)
    .attr("y", margin) // Move to top margin (25)
    .attr("text-anchor", "end") // “end” (right-aligned)
    .attr("alignment-baseline", "middle") // Center the Y axis
    .text(yDomain[1]); // Use the maximum value of the Y-axis domain (13)

// Define where the legend will start on the screen
let legendX = chartWidth - 40; // Start -40px into the empty space
let legendY = margin + 20;     // Start 20px down from the top margin
let legendSpacing = 25;      // Space between each legend item

// 1. Add the Legend Title [cite: 176]
svg.append("text")
    .attr("x", legendX)
    .attr("y", legendY)
    .attr("text-anchor", "start")
    .style("font-weight", "bold") // Make the title bold
    .text("Study Method");

// 2. Add Legend Item 1: "spaced repetition"
svg.append("circle")
    .attr("cx", legendX + 10) // Position the circle (10px indent)
    .attr("cy", legendY + legendSpacing * 1) // 1 * spacing down
    .attr("r", 5) // Use a small radius for the key
    .attr("fill", colorScale("spaced repetition")); // Get the correct color

svg.append("text")
    .attr("x", legendX + 20) // Position text 20px from circle
    .attr("y", legendY + legendSpacing * 1)
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "middle") // Vertically center text with circle
    .text("Spaced Repetition");

// 3. Add Legend Item 2: "massed practice"
svg.append("circle")
    .attr("cx", legendX + 10)
    .attr("cy", legendY + legendSpacing * 2) // 2 * spacing down
    .attr("r", 5)
    .attr("fill", colorScale("massed practice"));

svg.append("text")
    .attr("x", legendX + 20)
    .attr("y", legendY + legendSpacing * 2)
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "middle")
    .text("Massed Practice");

// 4. Add Legend Item 3: "elaborative encoding"
svg.append("circle")
    .attr("cx", legendX + 10)
    .attr("cy", legendY + legendSpacing * 3) // 3 * spacing down
    .attr("r", 5)
    .attr("fill", colorScale("elaborative encoding"));

svg.append("text")
    .attr("x", legendX + 20)
    .attr("y", legendY + legendSpacing * 3)
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "middle")
    .text("Elaborative Encoding");

// 5. Add Legend Item 4: "mnemonic imagery"
svg.append("circle")
    .attr("cx", legendX + 10)
    .attr("cy", legendY + legendSpacing * 4) // 4 * spacing down
    .attr("r", 5)
    .attr("fill", colorScale("mnemonic imagery"));

svg.append("text")
    .attr("x", legendX + 20)
    .attr("y", legendY + legendSpacing * 4)
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "middle")
    .text("Mnemonic Imagery");