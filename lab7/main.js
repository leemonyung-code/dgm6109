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
  { studyTime: 26, delayedRecallScore: 10 },
  { studyTime: 18, delayedRecallScore: 8 },
  { studyTime: 32, delayedRecallScore: 10 },
  { studyTime: 27, delayedRecallScore: 11 },
  { studyTime: 24, delayedRecallScore: 9 },
  { studyTime: 22, delayedRecallScore: 7 },
  { studyTime: 30, delayedRecallScore: 10 },
  { studyTime: 28, delayedRecallScore: 11 },
  { studyTime: 25, delayedRecallScore: 10 },
  { studyTime: 19, delayedRecallScore: 9 },
  { studyTime: 33, delayedRecallScore: 11 },
  { studyTime: 27, delayedRecallScore: 10 },
  { studyTime: 23, delayedRecallScore: 9 },
  { studyTime: 21, delayedRecallScore: 8 },
  { studyTime: 29, delayedRecallScore: 10 },
  { studyTime: 30, delayedRecallScore: 12 },
  { studyTime: 26, delayedRecallScore: 10 },
  { studyTime: 19, delayedRecallScore: 8 },
  { studyTime: 31, delayedRecallScore: 9 },
  { studyTime: 29, delayedRecallScore: 11 },
  { studyTime: 24, delayedRecallScore: 9 },
  { studyTime: 20, delayedRecallScore: 7 },
  { studyTime: 32, delayedRecallScore: 10 },
  { studyTime: 28, delayedRecallScore: 12 },
  { studyTime: 24, delayedRecallScore: 10 },
  { studyTime: 20, delayedRecallScore: 8 },
  { studyTime: 31, delayedRecallScore: 10 }
];  // Include all my data points from Oct 1 to Oct 27

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

let xScale = d3.scaleLinear()
    .domain(xDomain)
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain(yDomain)
    .range([svgHeight - margin, margin]);

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", 8)// Shrink the size of point a little bit to adjust the number of my data
    .attr("cx", function (value) {
        return xScale(value.studyTime);
    })
    .attr("cy", function (value) {
        return yScale(value.delayedRecallScore);
    })

/**** label the axes ****/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
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
    .attr("x", svgWidth - margin) // Move to right margin(600 - 25 = 575)
    .attr("y", svgHeight - (margin / 2)) // Maintain the same height of Y
    .attr("text-anchor", "end") // Change to “end” to make the text end at x=575.
    .attr("alignment-baseline", "baseline")
    .text(xDomain[1]); //Use the maximum value of the X-axis domain

// (Top-Left Label for Y-Axis Max)
let yMaxLabel = svg.append("text")
    .attr("x", margin - 5) // 5 pixels to the left of the left margin (25)
    .attr("y", margin) // Move to top margin (25)
    .attr("text-anchor", "end") // “end” (right-aligned)
    .attr("alignment-baseline", "middle") // Center the Y axis
    .text(yDomain[1]); // Use the maximum value of the Y-axis domain (13)