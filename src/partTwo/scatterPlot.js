import * as d3 from "d3";
import * as R from "ramda";
import "./styles.css";

const container = document.createElement("div");

container.setAttribute("class", "container");

const genData = size => {
  const range = R.range(1, size + 1);
  const randomY = () => Math.floor(Math.random() * 300);
  const randomX = () => Math.floor(Math.random() * 700);
  const randomPoint = () => [randomX(), randomY()];
  return R.map(randomPoint, range);
};

const genGraph = () => {
  const data = genData(10);
  const graphWidth = 800;
  const graphHeigt = 400;
  const padding = 50;

  const xScale = d3
    .scaleLinear()
    .domain([1, d3.max(data, d => d[0])])
    .range([padding, graphWidth - padding]);
  const yScale = d3
    .scaleLinear()
    .domain([1, d3.max(data, d => d[1])])
    .range([graphHeigt - padding, padding]);

  const rScale = d3
    .scaleSqrt()
    .domain([1, d3.max(data, d => d[1])])
    .range([1, 25]);

  const svg = d3
    .select(".container")
    .append("svg")
    .attr("width", graphWidth)
    .attr("height", graphHeigt);

  // gen circles
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("fill", "#78e08f")
    .attr("stroke", "#000")
    .attr("stroke-width", 1)
    .attr("cx", d => xScale(d[0]))
    .attr("cy", d => yScale(d[1]))
    .attr("r", d => rScale(d[1]));

  // gen labels
  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", d => xScale(d[0]))
    .attr("y", d => yScale(d[1]))
    .text(d => d.join(","));
};

document.addEventListener("DOMContentLoaded", e => {
  document.body.appendChild(container);
  genGraph();
});
