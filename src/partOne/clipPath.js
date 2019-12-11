import "./styles.css";

const myContainer = document.createElement("div");
myContainer.setAttribute("class", "container");

const mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
mySvg.setAttribute("width", "500");
mySvg.setAttribute("height", "500");

const myDef = document.createElementNS("http://www.w3.org/2000/svg", "defs");
const myClip = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "clipPath"
);
myClip.setAttribute("id", "custom");

const innerCircle = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle"
);
innerCircle.setAttribute("cx", "250");
innerCircle.setAttribute("cy", "250");
innerCircle.setAttribute("r", "10");
innerCircle.setAttribute("stroke", "#000");
innerCircle.setAttribute("stroke-width", "2");
myClip.appendChild(innerCircle);
myDef.appendChild(myClip);

const myCircle = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle"
);
myCircle.setAttribute("cx", "250");
myCircle.setAttribute("cy", "250");
myCircle.setAttribute("r", "200");
myCircle.setAttribute("clip-path", "url(#custom)");

const setStroke = elem => {
  elem.setAttribute("stroke", "#000");
  elem.setAttribute("stroke-width", "2");
  return elem;
};

mySvg.appendChild(myDef);
mySvg.appendChild(setStroke(myCircle));
myContainer.appendChild(mySvg);

document.body.appendChild(myContainer);
