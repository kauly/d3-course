import * as d3 from "d3";
import * as moment from "moment";
import "./styles.css";

const data = [
  { date: 1988, num: 51 },
  { date: 1989, num: 60 },
  { date: 1990, num: 62 },
  { date: 1991, num: -64 },
  { date: 1992, num: 69 },
  { date: 1993, num: 69 },
  { date: 1994, num: 75 },
  { date: 1995, num: 80 },
  { date: 1996, num: 91 },
  { date: 1997, num: 93 },
  { date: 1998, num: 97 },
  { date: 1999, num: 100 },
  { date: 2000, num: -103 },
  { date: 2001, num: 104 },
  { date: 2002, num: 105 },
  { date: 2003, num: 110 },
  { date: 2004, num: 111 },
  { date: 2005, num: 112 },
  { date: 2006, num: 112 },
  { date: 2007, num: 113 },
  { date: 2008, num: 119 },
  { date: 2009, num: 128 },
  { date: 2010, num: 139 },
  { date: 2011, num: -139 },
  { date: 2012, num: 139 },
  { date: 2013, num: 140 },
  { date: 2014, num: 143 },
  { date: 2015, num: 146 },
  { date: 2016, num: 147 },
  { date: 2017, num: 149 }
];

const toDate = d => moment(d, "YYYY").toDate();

const parseDate = d => moment(d).format("YYYY");

const item = d => ({ ...d, date: toDate(d.date) });

const dateArr = data.map(item);
console.log("TCL: dateArr", dateArr);
const dateAcc = d => d.date;
const numAcc = d => d.num;

const container = document.createElement("div");
container.setAttribute("class", "container");

const genViz = () => {
  const width = 1000;
  const height = 500;
  const padding = 50;

  const svg = d3
    .select(".container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const xScale = d3
    .scaleTime()
    .domain([d3.min(dateArr, dateAcc), d3.max(dateArr, dateAcc)])
    .range([padding, width - padding]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dateArr, numAcc)])
    .range([height - padding, padding]);

  const xAxis = d3
    .axisBottom(xScale)
    .ticks(10)
    .tickFormat(parseDate);
  const yAxis = d3.axisLeft(yScale).ticks(12);

  const dateScale = d => xScale(dateAcc(d));
  const numScale = d => yScale(numAcc(d));

  const line = d3
    .line()
    .defined(d => d.num >= 0 && d.num <= 100)
    .x(dateScale)
    .y(numScale);

  const greenLine = d3
    .line()
    .defined(d => d.num >= 100)
    .x(dateScale)
    .y(numScale);

  const greenArea = d3
    .area()
    .defined(d => d.num > 100)
    .x(dateScale)
    .y0(yScale.range()[0])
    .y1(d => numScale(d) + 2);

  const redArea = d3
    .area()
    .defined(d => d.num >= 0 && d.num <= 100)
    .x(dateScale)
    .y0(yScale.range()[0])
    .y1(d => numScale(d) + 2);

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("class", "axis")
    .attr("transform", `translate(${0}, ${height - padding})`)
    .call(xAxis);
  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("class", "axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);

  svg
    .append("g")
    .attr("id", "red-line-group")
    .append("path")
    .datum(dateArr)
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "#c0392b")
    .attr("stroke-width", 2);

  svg
    .append("g")
    .attr("id", "green-line-group")
    .append("path")
    .datum(dateArr)
    .attr("d", greenLine)
    .attr("fill", "none")
    .attr("stroke", "#27ae60")
    .attr("stroke-width", 3);

  svg
    .append("g")
    .attr("id", "green-area-group")
    .append("path")
    .datum(dateArr)
    .attr("d", greenArea)
    .attr("fill", "#2ecc71")
    .attr("stroke", "#27ae60")
    .attr("stroke-width", 2)
    .style("opacity", 0.5);

  svg
    .append("g")
    .attr("id", "red-area-group")
    .append("path")
    .datum(dateArr)
    .attr("d", redArea)
    .attr("fill", "#e74c3c")
    .attr("stroke", "#c0392b")
    .attr("stroke-width", 2)
    .style("opacity", 0.5);
};

document.addEventListener("DOMContentLoaded", function(e) {
  document.body.appendChild(container);

  genViz();
});
