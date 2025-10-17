"use strict";

/*
 Limeng Drawing #7 - Dog
 
 This function draws a dog on the SVG canvas.
 posX - horizontal position of the dog's origin
 posY - vertical position of the dog's origin
 showOrigin - a boolean to show the origin point
 choice - a string ("normal", "tongue_out", "wag_tail") for different modes
 It returns the same canvas after drawing.
 */

function dog(svgCanvas, posX, posY, showOrigin, choice = "normal") {

    // Origin for the dog drawing
    let dogX = posX - 100;
    let dogY = posY - 200;//I modyfied here by substracting the coordinates to better fitting my classmates' projects

    // --- Head Region ---

    // Head (trapezoid)
    let headPoints = "";
    headPoints += (dogX + 50) + "," + (dogY + 100) + " ";
    headPoints += (dogX + 155) + "," + (dogY + 50) + " ";
    headPoints += (dogX + 150) + "," + (dogY + 100) + " ";
    headPoints += (dogX + 100) + "," + (dogY + 125);
    svgCanvas.append("polygon")
        .attr("points", headPoints)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "lightgrey");

    // Left Ear
    let leftEarPoints = "";
    leftEarPoints += (dogX + 50) + "," + (dogY + 100) + " ";
    leftEarPoints += (dogX + 25) + "," + (dogY + 175) + " ";
    leftEarPoints += (dogX + 75) + "," + (dogY + 175);
    svgCanvas.append("polygon")
        .attr("points", leftEarPoints)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "darkgrey");

    // Right Ear
    let rightEarPoints = "";
    rightEarPoints += (dogX + 155) + "," + (dogY + 50) + " ";
    rightEarPoints += (dogX + 230) + "," + (dogY + 25) + " ";
    rightEarPoints += (dogX + 230) + "," + (dogY + 75);
    svgCanvas.append("polygon")
        .attr("points", rightEarPoints)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "lightgrey");

    // --- Body Region ---

    // Body (main triangle)
    let bodyPoints = "";
    bodyPoints += (dogX + 125) + "," + (dogY + 135) + " ";
    bodyPoints += (dogX + 75) + "," + (dogY + 300) + " ";
    bodyPoints += (dogX + 175) + "," + (dogY + 300);
    svgCanvas.append("polygon")
        .attr("points", bodyPoints)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "lightgrey");

    // Body (center triangle)
    let centerBodyPoints = "";
    centerBodyPoints += ((dogX + 125 + dogX + 75) / 2) + "," + ((dogY + 135 + dogY + 300) / 2) + " ";
    centerBodyPoints += ((dogX + 125 + dogX + 175) / 2) + "," + ((dogY + 135 + dogY + 300) / 2) + " ";
    centerBodyPoints += ((dogX + 75 + dogX + 175) / 2) + "," + ((dogY + 300 + dogY + 300) / 2);
    svgCanvas.append("polygon")
        .attr("points", centerBodyPoints)
        .attr("fill", "darkgrey")
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    // --- Tail and Tongue (Conditional) ---

    if (choice === "tongue_out") {
        let tailPoints = "";
        tailPoints += (dogX + 75) + "," + (dogY + 300) + " ";
        tailPoints += (dogX + 35) + "," + (dogY + 300) + " ";
        tailPoints += (dogX + 35) + "," + (dogY + 250);
        svgCanvas.append("polygon")
            .attr("points", tailPoints)
            .attr("fill", "darkgrey")
            .attr("stroke", "black")
            .attr("stroke-width", 2);

        svgCanvas.append("ellipse")
            .attr("cx", dogX + 150)
            .attr("cy", dogY + 170)
            .attr("rx", 10)
            .attr("ry", 20)
            .attr("fill", "red");

    } else if (choice === "wag_tail") {
        let tailPoints = "";
        tailPoints += (dogX + 75) + "," + (dogY + 300) + " ";
        tailPoints += (dogX + 25) + "," + (dogY + 270) + " ";
        tailPoints += (dogX + 35) + "," + (dogY + 230);
        svgCanvas.append("polygon")
            .attr("points", tailPoints)
            .attr("fill", "darkgrey")
            .attr("stroke", "black")
            .attr("stroke-width", 2);
    } else { // "normal" mode
        let tailPoints = "";
        tailPoints += (dogX + 75) + "," + (dogY + 300) + " ";
        tailPoints += (dogX + 35) + "," + (dogY + 300) + " ";
        tailPoints += (dogX + 35) + "," + (dogY + 250);
        svgCanvas.append("polygon")
            .attr("points", tailPoints)
            .attr("fill", "darkgrey")
            .attr("stroke", "black")
            .attr("stroke-width", 2);
    }

    // --- Details ---
    let nailOriginX = ((dogX + 75 + dogX + 175) / 2 + dogX + 75) / 2;
    let nailOriginY = dogY + 300;
    svgCanvas.append("line").attr("x1", nailOriginX - 5).attr("y1", nailOriginY).attr("x2", nailOriginX - 10).attr("y2", nailOriginY - 10).attr("stroke", "black").attr("stroke-width", 2);
    svgCanvas.append("line").attr("x1", nailOriginX + 10).attr("y1", nailOriginY).attr("x2", nailOriginX + 5).attr("y2", nailOriginY - 10).attr("stroke", "black").attr("stroke-width", 2);
    svgCanvas.append("line").attr("x1", nailOriginX + 40).attr("y1", nailOriginY).attr("x2", nailOriginX + 45).attr("y2", nailOriginY - 10).attr("stroke", "black").attr("stroke-width", 2);
    svgCanvas.append("line").attr("x1", nailOriginX + 55).attr("y1", nailOriginY).attr("x2", nailOriginX + 60).attr("y2", nailOriginY - 10).attr("stroke", "black").attr("stroke-width", 2);

    let mouthOriginX = dogX + 150;
    let mouthOriginY = dogY + 180;
    let mouthPoints = "";
    mouthPoints += (dogX + 100) + "," + (dogY + 125) + " ";
    mouthPoints += (dogX + 150) + "," + (dogY + 100) + " ";
    mouthPoints += mouthOriginX + "," + mouthOriginY;
    svgCanvas.append("polygon")
        .attr("points", mouthPoints)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "darkgrey");

    svgCanvas.append("circle")
        .attr("cx", mouthOriginX)
        .attr("cy", mouthOriginY)
        .attr("r", 5)
        .attr("fill", "black");
    svgCanvas.append("circle")
        .attr("cx", mouthOriginX - 65)
        .attr("cy", mouthOriginY - 80)
        .attr("r", 5)
        .attr("fill", "black");
    svgCanvas.append("circle")
        .attr("cx", mouthOriginX - 35)
        .attr("cy", mouthOriginY - 90)
        .attr("r", 5)
        .attr("fill", "black");

    // --- Show Origin Point ---
    if (showOrigin) {
        svgCanvas.append("circle")
            .attr("cx", dogX)
            .attr("cy", dogY)
            .attr("r", 3)
            .attr("fill", "deeppink");
    }

    return svgCanvas;
}