import "./styles.css";

const myContainer = document.createElement("div");
myContainer.setAttribute("class", "container");

const mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
mySvg.setAttribute("width", "500");
mySvg.setAttribute("height", "500");

const myPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
myPath.setAttribute(
  "d",
  `
  M50,50 L50,50 L150,150 Z 
  M5150,150 L150,50 L50,50 Z 
`
);

const setStroke = elem => {
  elem.setAttribute("fill", "#FFFF");
  elem.setAttribute("stroke", "#000");
  elem.setAttribute("stroke-width", "2");
  return elem;
};

mySvg.appendChild(setStroke(myPath));
myContainer.appendChild(mySvg);

document.body.appendChild(myContainer);
