import * as d3 from "d3";
import * as R from "ramda";

import "./styles.css";

const container = document.createElement("div");
const svgContainer = document.createElement("div");
const btn = document.createElement("button");

btn.setAttribute("class", "btn");
btn.textContent = "Update";

svgContainer.setAttribute("class", "svgContainer");

container.setAttribute("class", "container");
container.appendChild(btn);
container.appendChild(svgContainer);

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
    .domain([0, d3.max(pData, d => d[0])])
    .range([graphProps.padding, graphProps.width - graphProps.padding * 2]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(pData, d => d[1])])
    .range([graphProps.height - graphProps.padding, graphProps.padding]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  const svg = d3
    .select(".svgContainer")
    .append("svg")
    .attr("width", graphProps.width)
    .attr("height", graphProps.height);

  svg
    .append("clipPath")
    .attr("id", "plot-area-cp")
    .append("rect")
    .attr("x", graphProps.padding)
    .attr("y", graphProps.padding)
    .attr("width", graphProps.width - graphProps.padding * 3)
    .attr("height", graphProps.height - graphProps.padding * 2);

  svg
    .append("g")
    .attr(
      "transform",
      `translate(0, ${graphProps.height - graphProps.padding})`
    )
    .attr("class", "axis")
    .attr("id", "x-axis")
    .call(xAxis);

  svg
    .append("g")
    .attr("transform", `translate(${graphProps.padding})`)
    .attr("class", "axis")
    .attr("id", "y-axis")
    .call(yAxis);

  svg
    .append("g")
    .attr("id", "plot-area")
    .attr("clip-path", "url(#plot-area-cp)")
    .selectAll("circle")
    .data(pData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d[0]))
    .attr("cy", d => yScale(d[1]))
    .attr("r", 15)
    .attr("fill", "#78e08f")
    .attr("stroke", "#000")
    .attr("stroke-width", 1);

  d3.select(".btn").on("click", () => {
    const data = genData(30);
    xScale.domain([0, d3.max(data, d => d[0])]);
    yScale.domain([0, d3.max(data, d => d[1])]);

    svg
      .selectAll("circle")
      .data(data)
      .transition()
      .duration(1000)
      .on("start", function() {
        d3.select(this).attr("fill", "#ffff");
      })
      .attr("cx", d => xScale(d[0]))
      .attr("cy", d => yScale(d[1]))
      .transition()
      .attr("fill", "#78e08f");

    svg
      .select("#x-axis")
      .transition()
      .duration(1000)
      .call(xAxis);
    svg
      .select("#y-axis")
      .transition()
      .duration(1000)
      .call(yAxis);
  });
};

document.addEventListener("DOMContentLoaded", e => {
  document.body.appendChild(container);
  const data = genData(30);
  console.log("TCL: data", data);
  genGraph(data);
});
