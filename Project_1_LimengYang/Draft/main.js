"use strict"

let drawingWidth = 500;
let drawingHeight = 500;

let sx = drawingWidth-500;
let sy = drawingHeight-500;

let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", drawingWidth)
    .attr("height", drawingHeight);

let border = drawing.append("rect")
    .attr("width", drawingWidth)
    .attr("height", drawingHeight)
    .attr("fill", "lightgrey")

// Draw a dog


//traingle
let m1 = sx+125
let m2 = sx+75
//top

let m3 = sx+175
let n1 = sy+135
//downleft

let n2 = sy+300
let n3 = n2
//downright

//Trapezoid
let t1 = sx+50
let s1 = sy+100
//Upperleft

let t2 = sx+155
let s2 = sy+50
//Upperright

let t3 = t1+50
let s3 = s1+25
//Downleft

let t4 = t2-5
let s4 = s2+50
//Downright

let dogHeadtrapezoid = drawing.append("polyline")
.attr("points", closedPolygon(t1,s1,
                            t2,s2,
                            t4,s4,
                            t3,s3))
.attr("stroke", "black")
.attr("stroke-width", 2)
.attr("fill","lightgrey");

let dogEarleft = drawing.append("polyline")
.attr("points", closedPolygon(t1,s1,
                            t1-25,s1+75,
                            t1+25,s1+75,))
.attr("stroke", "black")
.attr("stroke-width", 2)
.attr("fill","darkgrey");

let dogEarright = drawing.append("polyline")
.attr("points", closedPolygon(t2,s2,
                            t2+75,s2-25,
                            t2+75,s2+25,))
.attr("stroke", "black")
.attr("stroke-width", 2)
.attr("fill","lightgrey");

let dogBodytraingle1 = drawing.append("polyline")
.attr("points", closedPolygon(m1,n1,
                            m2,n2,
                            m3,sy+n3))
.attr("stroke", "black")
.attr("stroke-width", 2)
.attr("fill","lightgrey");

let dogBodytraingle2 = drawing.append("polyline")
.attr("points", closedPolygon((m1+m2)/2,(n1+n2)/2,
                            (m1+m3)/2,(n1+n3)/2,
                            (m2+m3)/2,(n2+n3)/2))
.attr("fill","darkgrey")
.attr("stroke", "black")
.attr("stroke-width", 2);

let dogTail = drawing.append("polyline")
.attr("points", closedPolygon(m2,n2,
                            m2-50,n2,
                            m2-50,n2-50))
.attr("fill","darkgrey")
.attr("stroke", "black")
.attr("stroke-width", 2);

let u1 = ((m2+m3)/2+m2)/2

let dogNail1 = drawing.append("line")
.attr("x1", u1-5)
.attr("x2", u1-10)
.attr("y1", n2)
.attr("y2", n2-10)
.attr("stroke", "black")
.attr("stroke-width", 2);

let dogNail2 = drawing.append("line")
.attr("x1", u1+10)
.attr("x2", u1+5)
.attr("y1", n2)
.attr("y2", n2-10)
.attr("stroke", "black")
.attr("stroke-width", 2);

let dogNail3 = drawing.append("line")
.attr("x1", u1+40)
.attr("x2", u1+45)
.attr("y1", n2)
.attr("y2", n2-10)
.attr("stroke", "black")
.attr("stroke-width", 2);

let dogNail4 = drawing.append("line")
.attr("x1", u1+55)
.attr("x2", u1+60)
.attr("y1", n2)
.attr("y2", n2-10)
.attr("stroke", "black")
.attr("stroke-width", 2);

let ox = t4+20
let oy = s4+85


let dogMouth = drawing.append("polyline")
.attr("points", closedPolygon(t3,s3,
                             t4,s4,
                             ox,oy))
.attr("stroke", "black")
.attr("stroke-width", 2)
.attr("fill","darkgrey");

let dogNose = drawing.append("circle")
.attr("cx", ox)
.attr("cy", oy)
.attr("r", 5)
.attr("fill", "black");

let dogEyeleft = drawing.append("circle")
.attr("cx", ox-65)
.attr("cy", oy-80)
.attr("r", 5)
.attr("fill", "black");

let dogEyeright = drawing.append("circle")
.attr("cx", ox-35)
.attr("cy", oy-90)
.attr("r", 5)
.attr("fill", "black");