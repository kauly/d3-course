import * as d3 from "d3";

const container = document.createElement("div");
container.setAttribute("class", "container");

const data = [
  { pigeons: 6, doves: 8, eagles: 15 },
  { pigeons: 9, doves: 15, eagles: 5 },
  { pigeons: 11, doves: 13, eagles: 14 },
  { pigeons: 15, doves: 4, eagles: 20 },
  { pigeons: 22, doves: 25, eagles: 23 }
];

const vizProps = {
  width: 800,
  height: 600
};

const genViz = () => {
  const colorScale = d3.scaleOrdinal(d3.schemeSet2);
  const xScale = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([0, vizProps.width])
    .paddingInner(0.08);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.pigeons + d.doves + d.eagles)])
    .range([vizProps.height, 0]);

  const svg = d3
    .select(".container")
    .append("svg")
    .attr("width", vizProps.width)
    .attr("height", vizProps.height);

  const stack = d3.stack().keys(Object.keys(data[0]));
  const stackData = stack(data);

  console.log("TCL: genViz -> stackData", stackData);
  const groups = svg
    .selectAll("g")
    .data(stackData)
    .enter()
    .append("g")
    .style("fill", (d, i) => colorScale(i));

  groups
    .selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
    .attr("width", xScale.bandwidth())
    .attr("height", d => {
      console.log(d);
      return yScale(d[0]) - yScale(d[1]);
    })
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => yScale(d[1]));
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(container);
  genViz();
});
