import * as d3 from "d3";
import * as R from "ramda";
import "./styles.css";

const genData = size => {
  const range = R.range(1, size + 1);
  const randomY = () => Math.floor(Math.random() * 30);

  const randomPoint = n => ({ key: n - 1, num: randomY() });
  return R.map(randomPoint, range);
};

const key = d => d.key;

const data = genData(15);

const container = document.createElement("div");
const btnContainer = document.createElement("div");

const btnReverse = document.createElement("button");
const btnUpdate = document.createElement("button");
const btnDelete = document.createElement("button");

btnReverse.textContent = "Reverse";
btnReverse.setAttribute("class", "btn");
btnReverse.setAttribute("id", "reverse");

btnUpdate.textContent = "Update";
btnUpdate.setAttribute("class", "btn");
btnUpdate.setAttribute("id", "update");

btnDelete.textContent = "Delete";
btnDelete.setAttribute("class", "btn");
btnDelete.setAttribute("id", "delete");

container.setAttribute("class", "container");
container.appendChild(btnContainer);

btnContainer.setAttribute("class", "btnContainer");
btnContainer.appendChild(btnReverse);
btnContainer.appendChild(btnUpdate);
btnContainer.appendChild(btnDelete);

const genGraph = () => {
  const chartWidth = 800;
  const chartHeight = 500;

  console.log("TCL: data", data);
  const xScale = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([0, chartWidth])
    .paddingInner(0.05);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.num)])
    .range([0, chartHeight]);

  const svg = d3
    .select(".container")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight);

  svg
    .append("g")
    .attr("id", "bar-group")
    .selectAll("rect")
    .data(data, key)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => chartHeight - yScale(d.num))
    .attr("width", xScale.bandwidth())
    .attr("height", d => yScale(d.num))
    .attr("fill", "#78e08f")
    .attr("stroke", "#000")
    .attr("stroke-width", 1);

  svg
    .append("g")
    .attr("id", "text-group")
    .selectAll("text")
    .data(data, key)
    .enter()
    .append("text")
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", d => chartHeight - yScale(d.num) + 15)
    .attr("text-anchor", "middle")
    .text(d => d.num);

  d3.select("#reverse").on("click", () => {
    data.reverse();
    yScale.domain([0, d3.max(data, d => d.num)]);
    svg
      .selectAll("rect")
      .data(data, key)
      .transition()
      .delay((d, i) => {
        return (i / data.length) * 1000;
      })
      .duration(1000)
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => chartHeight - yScale(d.num))
      .attr("height", d => yScale(d.num));

    svg
      .selectAll("text")
      .data(data, key)

      .transition()
      .delay((d, i) => {
        return (i / data.length) * 1000;
      })
      .duration(1000)
      .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr("y", d => chartHeight - yScale(d.num) + 15)
      .text(d => d.num);
  });

  d3.select("#update").on("click", () => {
    const randomN = Math.floor(Math.random() * 40 + 1);
    data.push({ key: data.length + 1, num: randomN });

    xScale.domain(d3.range(data.length));
    yScale.domain([0, d3.max(data, d => d.num)]);

    const bars = d3
      .select("#bar-group")
      .selectAll("rect")
      .data(data);

    const texts = d3
      .select("#text-group")
      .selectAll("text")
      .data(data);

    bars
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", chartHeight)
      .attr("height", 0)
      .attr("width", xScale.bandwidth())
      .attr("fill", "#78e08f")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .merge(bars)
      .transition()
      .duration(1000)
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => chartHeight - yScale(d.num))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(d.num))
      .attr("fill", "#78e08f")
      .attr("stroke", "#000")
      .attr("stroke-width", 1);

    texts
      .enter()
      .append("text")
      .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr("y", d => chartHeight + 15)
      .text(d => d.num)
      .merge(texts)
      .transition()
      .duration(1000)
      .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr("y", d => chartHeight - yScale(d.num) + 15)
      .attr("text-anchor", "middle")
      .text(d => d.num);
  });

  d3.select("#delete").on("click", () => {
    data.shift();
    xScale.domain(d3.range(data.length));
    yScale.domain([0, d3.max(data, d => d.num)]);
    // selecting only 14 rect
    const bars = d3
      .select("#bar-group")
      .selectAll("rect")
      .data(data, key);

    const texts = d3
      .select("#text-group")
      .selectAll("text")
      .data(data, key);

    bars
      .exit()
      .transition()
      .duration(500)
      .attr("y", chartHeight)
      .remove();

    bars
      .transition()
      .duration(1000)
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => chartHeight - yScale(d.num))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(d.num))
      .attr("fill", "#78e08f")
      .attr("stroke", "#000")
      .attr("stroke-width", 1);

    texts
      .exit()
      .transition()
      .duration(1000)
      .attr("y", chartHeight)
      .remove();

    texts
      .transition()
      .duration(1000)
      .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr("y", d => chartHeight - yScale(d.num) + 15)
      .attr("text-anchor", "middle")
      .text(d => d.num);
  });
};

document.addEventListener("DOMContentLoaded", function(e) {
  document.body.appendChild(container);

  genGraph();
});
