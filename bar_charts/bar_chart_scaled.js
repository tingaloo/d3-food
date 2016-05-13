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

maxCost = d3.max(dataset, function(d) {
  return d.cost;
})

var yScale = d3.scale.linear()
  .domain([0, maxCost])
  .range([0, h]);

var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)

// defining X axis
var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  .ticks(5)


// create SVG bars
svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr({
    x: function(d,i) {return xScale(i); },
    y: function(d) {
      return Math.round(h - yScale(d.cost));
    },
    width: xScale.rangeBand(),
    height: function(d) { return Math.round(yScale(d.cost)); },
    fill: function(d) { return "rgb(0,0, " + (Math.round(255 - (d.cost*5))) + ")"; }
  });

// append text within bars.
svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .attr("text-anchor", "middle")
  .text(function(d) {
    return d.cost
  })
  .attr("x", function(d,i) {
    return xScale(i) + xScale.rangeBand() / 2;
  })
  .attr("y", function(d) {
    return h - (d.cost * 4) + 15;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white")
