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

const genGraph = pData => {
  const graphProps = {
    width: 800,
    height: 400,
    padding: 50
  };

  const xScale = d3
    .scaleLinear()
    .domain([1, d3.max(pData, d => d[0])])
    .range([graphProps.padding, graphProps.width - graphProps.padding]);

  const yScale = d3
    .scaleLinear()
    .domain([1, d3.max(pData, d => d[1])])
    .range([graphProps.height - graphProps.padding, graphProps.padding]);

  const aScale = d3
    .scaleSqrt()
    .domain([1, d3.max(pData, d => d[1])])
    .range([5, 20]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  const svg = d3
    .select(".container")
    .append("svg")
    .attr("width", graphProps.width)
    .attr("height", graphProps.height);

  svg
    .append("g")
    .attr(
      "transform",
      `translate(0, ${graphProps.height - graphProps.padding})`
    )
    .attr("class", "axis")
    .call(xAxis);

  svg
    .append("g")
    .attr("transform", `translate(${graphProps.padding})`)
    .attr("class", "axis")
    .call(yAxis);

  svg
    .append("g")
    .selectAll("circle")
    .data(pData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d[0]))
    .attr("cy", d => yScale(d[1]))
    .attr("r", d => aScale(d[1]))
    .attr("fill", "#78e08f")
    .attr("stroke", "#000")
    .attr("stroke-width", 1);

  svg
    .append("g")
    .selectAll("text")
    .data(pData)
    .enter()
    .append("text")
    .text(d => d.join(","))
    .attr("x", d => xScale(d[0]))
    .attr("y", d => yScale(d[1]))
    .style("font-size", "10px");
};

document.addEventListener("DOMContentLoaded", e => {
  document.body.appendChild(container);
  const data = genData(30);
  console.log("TCL: data", data);
  genGraph(data);
});
