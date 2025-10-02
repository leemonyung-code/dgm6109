document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  let xInputEl = document.getElementById("xInput");
  let yInputEl = document.getElementById("yInput");
  let modeSelect = document.getElementById("modeSelect");
  let drawBtn = document.getElementById("drawBtn");

  let canvas = d3.select("#canvas").select("svg");
  if (canvas.empty()) {
    canvas = d3.select("svg");
  }

  if (typeof closedPolygon !== "function") {
    window.closedPolygon = function(...args) {
      if (args.length === 1 && Array.isArray(args[0]) && Array.isArray(args[0][0])) {
        return args[0].map(pt => `${pt[0]},${pt[1]}`).join(" ");
      }
      let pts = [];
      for (let i = 0; i < args.length; i += 2) {
        let x = args[i];
        let y = args[i + 1];
        pts.push(`${x},${y}`);
      }
      return pts.join(" ");
    };
  }

  function drawImage() {
    let dogX = parseFloat(xInputEl.value) || 100;
    let dogY = parseFloat(yInputEl.value) || 50;
    let choice = modeSelect.value; 

    canvas.selectAll(".dogGroup").remove();
    let g = canvas.append("g").attr("class", "dogGroup");

    // triangle (body-ish)
    let m1 = dogX + 125;
    let m2 = dogX + 75;
    let m3 = dogX + 175;
    let n1 = dogY + 135;
    let n2 = dogY + 300;
    let n3 = n2;

    // Trapezoid (head region)
    let t1 = dogX + 50;
    let s1 = dogY + 100;
    let t2 = dogX + 155;
    let s2 = dogY + 50;
    let t3 = t1 + 50;
    let s3 = s1 + 25;
    let t4 = t2 - 5;
    let s4 = s2 + 50;

    // HEAD trapezoid
    g.append("polyline")
     .attr("points", closedPolygon(t1, s1,
                                  t2, s2,
                                  t4, s4,
                                  t3, s3))
     .attr("stroke", "black")
     .attr("stroke-width", 2)
     .attr("fill", "lightgrey");

    // LEFT EAR
    g.append("polyline")
     .attr("points", closedPolygon(t1, s1,
                                  t1 - 25, s1 + 75,
                                  t1 + 25, s1 + 75))
     .attr("stroke", "black")
     .attr("stroke-width", 2)
     .attr("fill", "darkgrey");

    // RIGHT EAR
    g.append("polyline")
     .attr("points", closedPolygon(t2, s2,
                                  t2 + 75, s2 - 25,
                                  t2 + 75, s2 + 25))
     .attr("stroke", "black")
     .attr("stroke-width", 2)
     .attr("fill", "lightgrey");

    // BODY triangle 1
    g.append("polyline")
     .attr("points", closedPolygon(m1, n1,
                                  m2, n2,
                                  m3, n3))
     .attr("stroke", "black")
     .attr("stroke-width", 2)
     .attr("fill", "lightgrey");

    // BODY triangle 2 (center)
    g.append("polyline")
     .attr("points", closedPolygon((m1 + m2) / 2, (n1 + n2) / 2,
                                  (m1 + m3) / 2, (n1 + n3) / 2,
                                  (m2 + m3) / 2, (n2 + n3) / 2))
     .attr("fill", "darkgrey")
     .attr("stroke", "black")
     .attr("stroke-width", 2);

   
    if (choice === "tongue_out") {
      g.append("polyline")
       .attr("points", closedPolygon(m2, n2,
                                    m2 - 50, n2,
                                    m2 - 50, n2 - 50))
       .attr("fill", "darkgrey")
       .attr("stroke", "black")
       .attr("stroke-width", 2);

      // tongue added in this mode
      g.append("ellipse")
       .attr("cx", dogX + 150)
       .attr("cy", dogY + 170)
       .attr("rx", 10)
       .attr("ry", 20)
       .attr("fill", "red");
    } else {

      // TAIL (choice-dependent)
if (choice === "tongue_out") {
  // normal tail but add tongue
  g.append("polyline")
   .attr("points", closedPolygon(m2, n2,
                                m2 - 50, n2,
                                m2 - 50, n2 - 50))
   .attr("fill", "darkgrey")
   .attr("stroke", "black")
   .attr("stroke-width", 2);

  g.append("ellipse")
   .attr("cx", dogX)
   .attr("cy", dogY + 120)
   .attr("rx", 12)
   .attr("ry", 20)
   .attr("fill", "red");

} else if (choice === "wag_tail") {
  g.append("polyline")
   .attr("points", closedPolygon(m2, n2,
                                m2 - 50, n2 - 30,
                                m2 - 40, n2 - 70))
   .attr("fill", "darkgrey")
   .attr("stroke", "black")
   .attr("stroke-width", 2);

} else {
  // original tail
  g.append("polyline")
   .attr("points", closedPolygon(m2, n2,
                                m2 - 40, n2,
                                m2 - 40, n2 - 50))
   .attr("fill", "darkgrey")
   .attr("stroke", "black")
   .attr("stroke-width", 2);
}

    }

    // nails
    let u1 = ((m2 + m3) / 2 + m2) / 2;
    g.append("line")
     .attr("x1", u1 - 5)
     .attr("x2", u1 - 10)
     .attr("y1", n2)
     .attr("y2", n2 - 10)
     .attr("stroke", "black")
     .attr("stroke-width", 2);

    g.append("line")
     .attr("x1", u1 + 10)
     .attr("x2", u1 + 5)
     .attr("y1", n2)
     .attr("y2", n2 - 10)
     .attr("stroke", "black")
     .attr("stroke-width", 2);

    g.append("line")
     .attr("x1", u1 + 40)
     .attr("x2", u1 + 45)
     .attr("y1", n2)
     .attr("y2", n2 - 10)
     .attr("stroke", "black")
     .attr("stroke-width", 2);

    g.append("line")
     .attr("x1", u1 + 55)
     .attr("x2", u1 + 60)
     .attr("y1", n2)
     .attr("y2", n2 - 10)
     .attr("stroke", "black")
     .attr("stroke-width", 2);

    // mouth / nose / eyes
    let ox = t4 + 20;
    let oy = s4 + 85;

    g.append("polyline")
     .attr("points", closedPolygon(t3, s3,
                                  t4, s4,
                                  ox, oy))
     .attr("stroke", "black")
     .attr("stroke-width", 2)
     .attr("fill", "darkgrey");

    g.append("circle")
     .attr("cx", ox)
     .attr("cy", oy)
     .attr("r", 5)
     .attr("fill", "black");

    g.append("circle")
     .attr("cx", ox - 65)
     .attr("cy", oy - 80)
     .attr("r", 5)
     .attr("fill", "black");

    g.append("circle")
     .attr("cx", ox - 35)
     .attr("cy", oy - 90)
     .attr("r", 5)
     .attr("fill", "black");
  }

  drawBtn.addEventListener("click", () => {
    try {
      drawImage();
    } catch (err) {
      console.error("Error while drawing:", err);
    }
  });

  drawImage();
});

