import "./styles.css";

const myContainer = document.createElement("div");
myContainer.setAttribute("class", "container");

const mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
mySvg.setAttribute("width", "500");
mySvg.setAttribute("height", "500");

const myPolygon = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "polygon"
);
myPolygon.setAttribute("points", "2,300 252,300 127,250");

const myPolyne = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "polyline"
);
myPolyne.setAttribute("points", "2,300 252,300 127,250");
myPolyne.setAttribute("stroke", "#000");
myPolyne.setAttribute("stroke-width", "2");
myPolyne.setAttribute("fill", "none");
const setStroke = elem => {
  elem.setAttribute("fill", "#FFFF");
  elem.setAttribute("stroke", "#000");
  elem.setAttribute("stroke-width", "2");
  return elem;
};

mySvg.appendChild(myPolyne);

myContainer.appendChild(mySvg);

document.body.appendChild(myContainer);
