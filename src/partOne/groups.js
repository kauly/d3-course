import "./styles.css";

const container = document.createElement("div");
container.setAttribute("class", "container");

const mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
mySvg.setAttribute("width", "500");
mySvg.setAttribute("height", "500");

const myDef = document.createElementNS("http://www.w3.org/2000/svg", "defs");

const myRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
myRect.setAttribute("id", "reee");

myRect.setAttribute("width", "250");
myRect.setAttribute("height", "250");
myRect.setAttribute("fill", "blue");
myRect.setAttribute("x", "25");
myRect.setAttribute("y", "25");

const myUse = document.createElementNS("http://www.w3.org/2000/svg", "use");
myUse.setAttribute("href", "#reee");

myDef.appendChild(myRect);

mySvg.appendChild(myDef);
mySvg.appendChild(myUse);

container.appendChild(mySvg);

document.body.appendChild(container);
