import * as d3 from "d3";
import * as moment from "moment";
import "./styles.css";

const container = document.createElement("div");

container.setAttribute("class", "container");

const data = [
  { date: "12/08/2019", value: 20 },
  { date: "21/05/2019", value: 5 },
  { date: "01/04/2019", value: 44 },
  { date: "12/08/2019", value: 13 },
  { date: "30/03/2019", value: 18 },
  { date: "4/08/2019", value: 45 },
  { date: "13/09/2019", value: 29 },
  { date: "22/02/2019", value: 32 },
  { date: "31/05/2019", value: 40 },
  { date: "13/06/2019", value: 19 }
];

const genGraph = () => {
  const newData = data.map(d => ({
    ...d,
    date: moment(d.date, "DD/MM/YYYY")
  }));

  const graphWidth = 800;
  const graphHeigt = 400;
  const padding = 50;

  const xScale = d3
    .scaleTime()
    .domain([
      d3.min(newData, d => d.date.toDate()),
      d3.max(newData, d => d.date.toDate())
    ])
    .range([padding, graphWidth - padding]);
  const yScale = d3
    .scaleLinear()
    .domain([1, d3.max(newData, d => d.value)])
    .range([graphHeigt - padding, padding]);

  const rScale = d3
    .scaleSqrt()
    .domain([1, d3.max(newData, d => d.value)])
    .range([1, 25]);

  const svg = d3
    .select(".container")
    .append("svg")
    .attr("width", graphWidth)
    .attr("height", graphHeigt);

  // gen circles
  svg
    .selectAll("circle")
    .data(newData)
    .enter()
    .append("circle")
    .attr("fill", "#78e08f")
    .attr("stroke", "#000")
    .attr("stroke-width", 1)
    .attr("cx", d => xScale(d.date.toDate()))
    .attr("cy", d => yScale(d.value))
    .attr("r", d => rScale(d.value));

  // gen labels
  svg
    .selectAll("text")
    .data(newData)
    .enter()
    .append("text")
    .attr("x", d => xScale(d.date.toDate()))
    .attr("y", d => yScale(d.value))
    .text(d => d.date.format("DD/MM"));
};

document.addEventListener("DOMContentLoaded", e => {
  document.body.appendChild(container);
  genGraph();
});
