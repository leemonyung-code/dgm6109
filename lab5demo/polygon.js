"use strict"

function closedPolygon(...args) {
    if (args.length < 2) {
        console.log("WARNING: No points defined")
        return "";
    }
    let polyString = "";

    for (let i = 0; i < args.length; i++) {
        polyString += args[i];
        polyString += " ";
    }

    polyString += args[0] + " " + args[1];

    return polyString;
}