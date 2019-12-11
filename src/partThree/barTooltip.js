import * as d3 from "d3";
import "./styles.css";

const container = document.createElement("div");
const tooltip = document.createElement("div");

tooltip.setAttribute("id", "tooltip");
container.setAttribute("class", "container");
container.appendChild(tooltip);

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
    .rangeRound([0, width])
    .paddingInner(0.08);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, height]);

  svg
    .append("g")
    .attr("id", "bars-group")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => height - yScale(d))
    .attr("height", d => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("fill", "#78e08f")
    .attr("stroke", "#000")
    .attr("stroke-width", 1)
    .on("mouseover", function(d) {
      const x = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
      const y = parseFloat(d3.select(this).attr("y")) / 2 + height / 2;
      console.log(x, y);
      d3.select("#tooltip")
        .style("display", "block")
        .style("top", y)
        .style("left", x)
        .text(d);
    })
    .on("mouseout", () => {
      d3.select("#tooltip").style("display", "none");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(container);
  console.log(graphProps.data);
  createBarGraph();
});
