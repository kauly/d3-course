import * as d3 from "d3";

const data = [25, 10, 20, 5];
const container = document.createElement("div");
container.setAttribute("class", "container");

const chartProps = {
  width: 1000,
  height: 700,
  innerRadius: 150,
  outerRadius: 500 / 2
};

const genViz = () => {
  const { width, height, innerRadius, outerRadius } = chartProps;

  const svg = d3
    .select(".container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const colorScale = d3.scaleOrdinal(d3.schemeDark2);

  const pieData = d3.pie()(data);
  const arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const arcs = svg
    .selectAll("g.arc")
    .data(pieData)
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", `translate(${outerRadius}, ${height * 0.5})`);

  arcs
    .append("path")
    .attr("fill", (d, i) => colorScale(i))
    .attr("d", arc);

  arcs
    .append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "text-middle")
    .text(d => d.value);
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(container);
  genViz();
});
