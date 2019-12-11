import "./styles.css";

const myContainer = document.createElement("div");
myContainer.setAttribute("class", "container");

const mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
mySvg.setAttribute("width", "500");
mySvg.setAttribute("height", "500");

const myRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
myRect.setAttribute("width", "250");
myRect.setAttribute("height", "250");
myRect.setAttribute("x", "25");
myRect.setAttribute("y", "25");

const myCircle = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle"
);
myCircle.setAttribute("cx", "127");
myCircle.setAttribute("cy", "127");
myCircle.setAttribute("r", "125");

const myEllipse = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse"
);
myEllipse.setAttribute("cx", "202");
myEllipse.setAttribute("cy", "102");
myEllipse.setAttribute("rx", "200");
myEllipse.setAttribute("ry", "100");

const myLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
myLine.setAttribute("x1", "2");
myLine.setAttribute("y1", "2");
myLine.setAttribute("x2", "250");
myLine.setAttribute("y2", "2");
myLine.setAttribute("stroke", "#000");
myLine.setAttribute("stroke-width", "2");

const myLineTwo = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "line"
);
myLineTwo.setAttribute("x1", "250");
myLineTwo.setAttribute("y1", "250");
myLineTwo.setAttribute("x2", "250");
myLineTwo.setAttribute("y2", "2");
myLineTwo.setAttribute("stroke", "#000");
myLineTwo.setAttribute("stroke-width", "2");

const myLineThree = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "line"
);
myLineThree.setAttribute("x1", "250");
myLineThree.setAttribute("y1", "250");
myLineThree.setAttribute("x2", "500");
myLineThree.setAttribute("y2", "250");
myLineThree.setAttribute("stroke", "#000");
myLineThree.setAttribute("stroke-width", "2");

const myLineFour = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "line"
);
myLineFour.setAttribute("x1", "250");
myLineFour.setAttribute("y1", "250");
myLineFour.setAttribute("x2", "500");
myLineFour.setAttribute("y2", "0");
myLineFour.setAttribute("stroke", "#000");
myLineFour.setAttribute("stroke-width", "2");

const setStroke = elem => {
  elem.setAttribute("fill", "#FFFF");
  elem.setAttribute("stroke", "#000");
  elem.setAttribute("stroke-width", "2");
  return elem;
};

mySvg.appendChild(myLine);
mySvg.appendChild(myLineTwo);
mySvg.appendChild(myLineThree);
mySvg.appendChild(myLineFour);

myContainer.appendChild(mySvg);

document.body.appendChild(myContainer);
