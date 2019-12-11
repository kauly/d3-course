import * as d3 from "d3";
import "./styles.css";

const container = document.createElement("div");
container.setAttribute("class", "container");

const graphProps = {
  width: 800,
  height: 500,
  padding: 50,
  data: [6, 20, 21, 14, 2, 30, 7, 16, 25, 5, 11, 28, 10, 26, 9]
};

function createBarGraph() {
  const { width, height, padding, data } = graphProps;
  const svg = d3
    .select(".container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const xScale = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([padding, width - padding])
    .paddingInner(0.08);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([height - padding, padding]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height - padding})`)
    .attr("class", "axis")
    .call(xAxis);

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${padding})`)
    .attr("class", "axis")
    .call(yAxis);

  svg
    .append("g")
    .attr("id", "bars-group")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => height - padding - yScale(d))
    .attr("height", d => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("fill", "#78e08f")
    .attr("stroke", "#000")
    .attr("stroke-width", 1)
    .on("mouseover", function() {
      d3.select(this)
        .transition()
        .duration(500)
        .attr("fill", "#1abc9c");
    })
    .on("mouseout", function() {
      d3.select(this)
        .transition()
        .duration(500)
        .attr("fill", "#78e08f");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(container);
  console.log(graphProps.data);
  createBarGraph();
});
