// define svg boundaries
// bar graph sizing
var w = 500;
var h = 200;
var barPadding = 3;

var dataset = [ {date: 3/18, cost: 46.62, restaurant: "Mission BBQ"},
                {date: 3/25, cost: 46.98, restaurant: "La Madeleine"},
                {date: 3/28, cost: 29.10, restaurant: "Ledo's Pizza"},
                {date: 4/04, cost: 34.47, restaurant: "BGR"},
                {date: 4/08, cost: 32.86, restaurant: "Hunan Manor"},
                {date: 4/11, cost: 38.97, restaurant: "Ledo's Pizza"},
                {date: 4/18, cost: 28.13, restaurant: "Ledo's Pizza"},
                {date: 4/25, cost: 29.17, restaurant: "BGR"},
                {date: 5/2,  cost: 23.54, restaurant: "Ledo's Pizza"},
                {date: 4/29, cost: 31.80, restaurant: "Stanford Grill"},
                {date: 5/9,  cost: 32.26, restaurant: "Ledo's Pizza"} ];

var xScale = d3.scale.ordinal()
  .domain(d3.range(dataset.length))
  .rangeRoundBands([0,w], 0.05);

var yScale = d3.scale.linear()
  .domain([0, d3.max(dataset)])
  .range([0, h]);

var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)

svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr({
    x: function(d,i) {return i * (w/dataset.length) },
    y: function(d)   {return h - (d.cost * 4); },
    width: w/ dataset.length - barPadding,
    height: function(d) { return d.cost * 4; },
    fill: function(d) { return "rgb(0,0, " + (Math.round(255 - (d.cost*5))) + ")"; }
  });

svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function(d) {
    return d.cost
  })
  .attr("x", function(d,i) {
    return i * (w/dataset.length);
  })
  .attr("y", function(d) {
    return h - (d.cost * 4) + 15;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white")
