import * as d3 from "d3";
import * as R from "ramda";
import "./styles.css";

const container = document.createElement("div");
const graphContainer = document.createElement("div");

container.setAttribute("class", "container");
graphContainer.setAttribute("class", "graphContainer");

const genGraph = data => {
  const el = d3
    .select(".graphContainer")
    .selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .classed("bar", true)
    .style("height", d => `${d * 10}px`);
  console.log("TCL:  el", el);
};

const genRandom = qutd => {
  const temp = R.range(0, qutd);
  const rand = () => Math.floor(Math.random() * 50);

  return R.map(rand, temp);
};

document.addEventListener("DOMContentLoaded", function(e) {
  container.appendChild(graphContainer);
  document.body.appendChild(container);
  const data = genRandom(20);
  genGraph(data);
});
