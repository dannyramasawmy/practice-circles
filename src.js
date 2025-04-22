class Segment {
    constructor(name, colour) {
        this.name = name;
        this.colour = colour;
    }
}

function drawCircularDiagram(targetId, segments) {
    const svg = document.getElementById(targetId);
    svg.innerHTML = ""; // Clear previous content

    const centerX = 200;
    const centerY = 200;
    const radius = 150;
    const n = segments.length;

    for (let i = 0; i < n; i++) {
        const angleModifier = - Math.PI/2 - Math.PI/n
        const startAngle = (2 * Math.PI / n) * i + angleModifier;
        const endAngle = (2 * Math.PI / n) * (i + 1) + angleModifier;

        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);

        const largeArcFlag = (endAngle - startAngle > Math.PI) ? 1 : 0;

        const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            "Z"
        ].join(" ");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("fill", segments[i].colour);
        path.setAttribute("stroke", "#ddd");
        path.setAttribute("stroke-width", "4");
        svg.appendChild(path);

        // Add label
        const midAngle = (startAngle + endAngle) / 2;
        const labelRadius = radius * 0.6;
        const labelX = centerX + labelRadius * Math.cos(midAngle);
        const labelY = centerY + labelRadius * Math.sin(midAngle);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", labelX);
        text.setAttribute("y", labelY);
        text.textContent = segments[i].name;
        text.setAttribute("font-size", "18");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("fill", "#fff");
        text.setAttribute("font-weight", "bold");
        svg.appendChild(text);
    }
}

var segments = [];
const labels = ["C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"];

const colours = []
for (let i = 0; i < labels.length; i++) {
    const hue = (i * 360) / labels.length; // Evenly spaced hues around the circle
    const colour = `hsl(${hue}, 50%, 50%)`; // Saturated and vivid
    colours.push(colour);
}

segments_co5 = [
    new Segment(labels[0], colours[0]),
    new Segment(labels[1], colours[1]),
    new Segment(labels[2], colours[2]),
    new Segment(labels[3], colours[3]),
    new Segment(labels[4], colours[4]),
    new Segment(labels[5], colours[5]),
    new Segment(labels[6], colours[6]),
    new Segment(labels[7], colours[7]),
    new Segment(labels[8], colours[8]),
    new Segment(labels[9], colours[9]),
    new Segment(labels[10], colours[10]),
    new Segment(labels[11], colours[11]),
]

segments_dimin = [
    new Segment(labels[0], colours[0]),
    new Segment(labels[3], colours[3]),
    new Segment(labels[6], colours[6]),
    new Segment(labels[9], colours[9]),
]

const routes = {
    "/home": () => "<h1>Circle of 5ths</h1>",
    "/diminished": () => "<h1>Diminished</h1>",
    "/contact": () => "<h1>Contact</h1>",
  };

const routeContent = {
    "/home": () => segments_co5,
    "/diminished": () => segments_dimin,
    "/contact": () => segments_co5,
}

function router() {
    const path = location.hash.slice(1) || "/home";
    const content = routes[path] ? routes[path]() : "<h1>404 Not Found</h1>";
    document.getElementById("app").innerHTML = content;
    
    const page_content = routeContent[path] ? routeContent[path]() : "<h1>404 Data not Found</h1>";
    drawCircularDiagram("diagram0", page_content);
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

// Call the function when the script loads
// drawCircularDiagram("diagram1", segments[0,]);
