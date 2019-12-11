import "./styles.css";

const container = document.createElement("div");
container.setAttribute("class", "container");

const mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
mySvg.setAttribute("width", "500");
mySvg.setAttribute("height", "500");

const myText = document.createElementNS("http://www.w3.org/2000/svg", "text");
myText.setAttribute("x", "1");
myText.setAttribute("y", "250");
myText.setAttribute("font-size", "32px");
myText.textContent = "Hello World!";

const myTspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
myTspan.setAttribute("x", "1");
myTspan.setAttribute("y", "284");
myTspan.setAttribute("font-size", "32px");
myTspan.textContent = "Second Hello World!";

myText.appendChild(myTspan);
mySvg.appendChild(myText);
container.appendChild(mySvg);
document.body.appendChild(container);
