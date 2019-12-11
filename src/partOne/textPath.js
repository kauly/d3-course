import "./styles.css";

const container = document.createElement("div");
container.setAttribute("class", "container");

const mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
mySvg.setAttribute("width", "500");
mySvg.setAttribute("height", "500");

const myText = document.createElementNS("http://www.w3.org/2000/svg", "text");
myText.setAttribute("font-size", "32px");
myText.setAttribute("fill", "#000");
myText.setAttribute("x", "1");
myText.setAttribute("y", "100");

const myDef = document.createElementNS("http://www.w3.org/2000/svg", "defs");
const myPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
myPath.setAttribute("id", "re");
myPath.setAttribute("d", "M0,0 L300,300");
myDef.appendChild(myPath);

const myTextPath = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "textPath"
);
myTextPath.setAttribute("href", "#re");
myTextPath.textContent = "Hello World!";

myDef.appendChild(myPath);
myText.appendChild(myTextPath);
mySvg.appendChild(myDef);
mySvg.appendChild(myText);
container.appendChild(mySvg);

document.body.appendChild(container);
