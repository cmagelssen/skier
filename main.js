const skierIconSvg = "skier.svg";

const margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


const svg = d3.select('body').append('svg')
  .attr("width", width)
  .attr("height", height)

  

const data = [
  {"x": 1, "y": 100},
  {"x": 2, "y": 99},
  {"x": 3, "y": 98},
  {"x": 4, "y": 97},
  {"x": 5, "y": 96},
  {"x": 6, "y": 95},
  {"x": 7, "y": 94},
  {"x": 8, "y": 93},
  {"x": 9, "y": 92},
  {"x": 10, "y": 91},
  {"x": 11, "y": 90},
  {"x": 12, "y": 89},
  {"x": 13, "y": 88},
  {"x": 14, "y": 87},
  {"x": 15, "y": 86},
  {"x": 16, "y": 85},
  {"x": 17, "y": 84},
  {"x": 18, "y": 83},
  {"x": 19, "y": 82},
  {"x": 20, "y": 81},
  {"x": 21, "y": 80},
  {"x": 22, "y": 79},
  {"x": 23, "y": 78},
  {"x": 24, "y": 77},
  {"x": 25, "y": 76},
  {"x": 26, "y": 75},
  {"x": 27, "y": 74},
  {"x": 28, "y": 73},
  {"x": 29, "y": 72},
  {"x": 30, "y": 71},
  {"x": 31, "y": 70},
  {"x": 32, "y": 69},
  {"x": 33, "y": 68},
  {"x": 34, "y": 67},
  {"x": 35, "y": 66},
  {"x": 36, "y": 65},
  {"x": 37, "y": 64},
  {"x": 38, "y": 63},
  {"x": 39, "y": 62},
  {"x": 40, "y": 61},
  {"x": 41, "y": 60},
  {"x": 42, "y": 59},
  {"x": 43, "y": 58},
  {"x": 44, "y": 57},
  {"x": 45, "y": 56},
  {"x": 46, "y": 55},
  {"x": 47, "y": 54},
  {"x": 48, "y": 53},
  {"x": 49, "y": 52},
  {"x": 50, "y": 51},
  {"x": 51, "y": 50},
  {"x": 52, "y": 49},
  {"x": 53, "y": 48},
  {"x": 54, "y": 47},
  {"x": 55, "y": 46},
  {"x": 56, "y": 45},
  {"x": 57, "y": 44},
  {"x": 58, "y": 43},
  {"x": 59, "y": 42},
  {"x": 60, "y": 41},
  {"x": 61, "y": 40},
  {"x": 62, "y": 39},
  {"x": 63, "y": 38},
  {"x": 64, "y": 37},
  {"x": 65, "y": 36},
  {"x": 66, "y": 35},
  {"x": 67, "y": 34},
  {"x": 68, "y": 33},
  {"x": 69, "y": 32},
  {"x": 70, "y": 31},
  {"x": 71, "y": 30},
  {"x": 72, "y": 29},
  {"x": 73, "y": 28},
  {"x": 74, "y": 27},
  {"x": 75, "y": 26},
  {"x": 76, "y": 25},
  {"x": 77, "y": 24},
  {"x": 78, "y": 23},
  {"x": 79, "y": 22},
  {"x": 80, "y": 21},
  {"x": 81, "y": 20},
  {"x": 82, "y": 19},
  {"x": 83, "y": 18},
  {"x": 84, "y": 17},
  {"x": 85, "y": 16},
  {"x": 86, "y": 15},
  {"x": 87, "y": 14},
  {"x": 88, "y": 13},
  {"x": 89, "y": 12},
  {"x": 90, "y": 11},
  {"x": 91, "y": 10},
  {"x": 92, "y": 9},
  {"x": 93, "y": 8},
  {"x": 94, "y": 7},
  {"x": 95, "y": 6},
  {"x": 96, "y": 5},
  {"x": 97, "y": 4},
  {"x": 98, "y": 3},
  {"x": 99, "y": 2},
  {"x": 100, "y": 1},

];

const xScale = d3.scaleLinear()
  .domain([d3.min(data, function(d) { return d.x; }), d3.max(data, function(d) { return d.x; }) ])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.y; }) ])
  .range([height, 0]);

const linje = d3.line()
.x(d => xScale(d.x))
.y(d => yScale(d.y))

const g = svg.append("g")

const loype = g.append("path")
  .attr("d", linje(data))
  .attr("stroke", "blue")
  .attr("stroke-width", 1)
  .attr("class", "loypeprofil")
  .attr("fill", "none")


const selectedYear = 66;

// Here I append the skier object
const skier = g.append("image")
  .attr("id", "skier")
  .attr("href", skierIconSvg)
  .attr("x", 130)
  .attr("y", 150)
  .attr("width", 100)
  .attr("height", 100);


  g.append("rect")
  .attr("height", height)
  .attr("width", width)
  .attr("fill", "none")
  .attr("pointer-events", "all")
  .on("mousemove", () => {
    const x = d3.mouse(g.node())[1];
    const hoveredX = yScale.invert(x)
    console.log(hoveredX)
  })
  .call(d3.drag()
    .container(data)
    .on('drag', dragged));

    
    function dragged() {
      d3.select(this).attr("transform", "translate(" + (d.x = d3.event.x) + ","
      + (d.y = d3.event.y) + ")");
    };
