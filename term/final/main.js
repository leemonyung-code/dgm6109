"use strict";

/*
    Term Project - Final
    By: Limeng Yang
    
    Goal: Visualize the relationship between Study Time and Delayed Recall Score across different study methods over a 12-week period.
    
    Data Source: 'data.json', containing records from Oct 1 to Dec 10, 2025.
    
    Citations:
    - Scatterplot implementation adapted from Lab 7/9 solutions by Jay Taylor-Laird.
    - Legend logic and scale configuration adapted from Class 8 Slides.
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
 * Initialize the visualization.
 * Loads data asynchronously from "data.json".
 * Once loaded, processes numerical values and triggers the build function.
 */
(function() {
    d3.json("data.json").then(function(loadedData) {
        data = loadedData; // Store data globally
        
        // Convert string numbers to actual numbers for calculation
        // cite: (Class_06_Slides, p. 25, "Data Types")
        for (let i = 0; i < data.length; i++) {
            data[i].studyTime = Number(data[i].studyTime);
            data[i].delayedRecallScore = Number(data[i].delayedRecallScore);
            data[i].confidence = Number(data[i].confidence);
        }
 
       buildVisualization();
    });
})();

/**
 * Orchestrates the creation of the visualization elements.
 * Calls functions to set up the SVG container and draw the chart.
 */
function buildVisualization() {
    createSVG();
    drawScatterplot();
}

/**
 * Creates the main SVG element and appends a background rectangle.
 * Sets up the canvas size based on global width/height variables.
 * Returns: None
 */
function createSVG() {
    // Create the SVG element attached to the #canvas div
    svg = d3.select("#canvas")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // Draw a background rectangle for better visibility
    svg.append("rect")
        .attr("fill", "#FFFFF0") // Ivory background
        .attr("stroke", "black")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
}

/**
 * Draws the scatterplot including scales, axes, data points, and labels.
 * Requirements: Requires global 'data' and 'svg' variables to be populated.
 * Parameters: None
 * Returns: None
 */
function drawScatterplot() {
    
    // 1. Define Scales
    
    // Find min/max for X (Study Time)
    // cite: (Class_08_Slides, p. 14, "Using d3 to find..._maxes")
    let xDomain = d3.extent(data, function(d) { return d.studyTime; });
    
    // Find min/max for Y (Delayed Recall)
    let yDomain = d3.extent(data, function(d) { return d.delayedRecallScore; });
    
    // Find min/max for r (Self Rated Confidence)
    let rDomain = d3.extent(data, function(d) { return d.confidence; });

    // X Scale: Linear mapping of study time to chart width
    let xScale = d3.scaleLinear()
        .domain([xDomain[0] - 1, xDomain[1]]) // Added padding for better visualization
        .range([margin.left, chartWidth + margin.left]);

    // Y Scale: Linear mapping of recall score to chart height (inverted)
    let yScale = d3.scaleLinear()
        .domain([yDomain[0] - 1, yDomain[1] + 1]) 
        .range([chartHeight + margin.top, margin.top]);
    
    // Radius Scale: Linear mapping of confidence to circle size
    let rScale = d3.scaleLinear()
        .domain(rDomain)
        .range([3, 24]); // Adjusted range to ensure minimum visibility

    // Color Scale: Ordinal mapping for the four study methods
    // cite: (Lab_08_Slides, p. 18, "scalePoint() can help!")
    let methodCategories = [
        "spaced repetition", 
        "massed practice", 
        "elaborative encoding", 
        "mnemonic imagery"
    ];
    
    let colorScale = d3.scaleOrdinal()
        .domain(methodCategories)
        .range(["rgba(180, 8, 8, 1)",    // Red
                "rgba(29, 4, 152, 1)",    // Blue
                "rgba(30, 170, 198, 1)",  // Teal
                "rgba(235, 233, 67, 1)"]); // Yellow

    // 2. Draw Axes
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    // Append X Axis
    svg.append("g")
        .attr("transform", "translate(0, " + (chartHeight + margin.top) + ")")
        .call(xAxis);

    // Append Y Axis
    svg.append("g")
        .attr("transform", "translate(" + margin.left + ", 0)")
        .call(yAxis);

    // 3. Draw Labels
    // X Axis Label
    svg.append("text")
        .attr("x", margin.left + chartWidth / 2)
        .attr("y", svgHeight - margin.bottom / 3)
        .attr("text-anchor", "middle")
        .attr("class", "axisLabel")
        .style("font-size", "14px")
        .text("Study Time (minutes)");

    // Y Axis Label (Rotated)
    // cite: (Lab_08_Slides, p. 27, "Runaway text!")
    svg.append("text")
        .attr("x", -(margin.top + chartHeight / 2))
        .attr("y", margin.left / 3)
        .attr("text-anchor", "middle")
        .attr("class", "axisLabel")
        .style("font-size", "14px")
        .attr("transform", "rotate(-90)")
        .text("Delayed Recall Score (0-15)");

    // 4. Draw Data Points (Circles)
    // Map each data point to a circle element
    let circles = svg.selectAll("circle.datapoint")
        .data(data)
        .join("circle")
        .classed("datapoint", true);

    // Set Attributes for each circle
    circles
        .attr("r", function(d) {
            return rScale(d.confidence);
        }) 
        .attr("cx", function(d) {
            return xScale(d.studyTime);
        })
        .attr("cy", function(d) {
            return yScale(d.delayedRecallScore);
        })
        .attr("fill", function(d) {
            // Color is determined by the study method
            return colorScale(d.method);
        })
        .attr("fill-opacity", 0.7)
        // Add a simple tooltip title
        .append("title") 
        .text(function(d) {
            return d.method + "\nDate: " + d.date + "\nScore: " + d.delayedRecallScore;
        });

    // 5. Draw Legend (Key)
    drawLegend(methodCategories, colorScale, rScale);
}

function drawLegend(categories, colorScale, rScale) {
    let legendX = margin.left + chartWidth + 20;
    let legendY = margin.top;
    let legendSpacing = 25;

    let boxHeight = 6 * legendSpacing; 
    let boxWidth = 160;

    // Draw Legend Box for Study Methods
    svg.append("rect") 
        .attr("x", legendX - 10) 
        .attr("y", legendY - 23) 
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    // Draw Legend Box for Confidence
    svg.append("rect") 
        .attr("x", legendX + 25)
        .attr("y", legendY + 145) 
        .attr("width", boxWidth - 40)
        .attr("height", boxHeight + 55)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    // Title: Study Method
    svg.append("text")
        .attr("x", legendX)
        .attr("y", legendY)
        .attr("font-weight", "bold")
        .style("font-family", "sans-serif")
        .text("Study Method");

    // Loop through categories to draw colored dots and text for Method Legend
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let itemY = legendY + 30 + (i * legendSpacing);

        // Color Indicator
        svg.append("circle")
            .attr("cx", legendX + 10)
            .attr("cy", itemY)
            .attr("r", 8)
            .attr("fill", colorScale(category));

        // Text Label
        svg.append("text")
            .attr("x", legendX + 25)
            .attr("y", itemY + 4)
            .style("font-family", "sans-serif")
            .style("font-size", "12px")
            .text(category);
    }

    // Title: Confidence
    let sizeLegendStartY = legendY + 30 + (categories.length * legendSpacing) + 20;

    svg.append("text")
        .attr("x", legendX + 40)
        .attr("y", sizeLegendStartY + 20)
        .attr("font-weight", "bold")
        .style("font-family", "sans-serif")
        .text("Confidence");

    // Define example sizes to display in the legend
    let sizeExamples = [7, 7.5, 8, 8.5]; // Updated to reflect new data range

    // Loop to draw size examples
    for (let j = 0; j < sizeExamples.length; j++){
        let circleSizeexample = sizeExamples[j];
        let itemY = sizeLegendStartY + 50 + (j * legendSpacing * 1.6);
        
        svg.append("circle")
            .attr("cx", legendX + 60)
            .attr("cy", itemY)
            .attr("r", rScale(circleSizeexample)) 
            .attr("fill", "grey");

        // Text Label
        svg.append("text")
            .attr("x", legendX + 90)
            .attr("y", itemY + 4)
            .style("font-family", "sans-serif")
            .style("font-size", "12px")
            .text(circleSizeexample); 
    }
}