import * as d3 from "d3";
import "../assets/styles.css";
const br = require("../assets/uf.json");

const container = document.createElement("div");
container.setAttribute("class", "container");

const vizProps = {
  width: 800,
  height: 600
};

const genViz = async () => {
  const { width, height } = vizProps;
  const colorScale = d3
    .scaleQuantize()
    .domain([
      d3.min(br.features, d => d.properties.densidade),
      d3.max(br.features, d => d.properties.densidade)
    ])
    .range([
      "#fff7ec",
      "#fee8c8",
      "#fdd49e",
      "#fdbb84",
      "#fc8d59",
      "#ef6548",
      "#d7301f",
      "#b30000",
      "#7f0000"
    ]);

  const svg = d3
    .select(".container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const projection = d3
    .geoMercator()
    .scale(650)
    .center([-52, -15])
    .translate([width / 2, height / 2]);

  const path = d3.geoPath(projection);
  console.log(colorScale.domain());
  svg
    .selectAll("path")
    .data(br.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", d => colorScale(d.properties.densidade))
    .attr("fill-opacity", 0.5)
    .attr("stroke", "#222");
};

document.addEventListener("DOMContentLoaded", function(e) {
  document.body.appendChild(container);

  genViz();
});
