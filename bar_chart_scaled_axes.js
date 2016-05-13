
var w = 500;
var h = 300;
var padding = 30;
var barPadding = 3;

d3.json("restaurant_daily_cost.json", function(dataset){

// defining scales
var xScale = d3.scale.ordinal()
  .domain(d3.range(dataset.length))
  .rangeRoundBands([padding,w - padding/ 2], 0.05);

maxCost = d3.max(dataset, function(d) {
  return d.cost;
})

var yScale = d3.scale.linear()
  .domain([0, maxCost])
  .range([0, h - padding]);

var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)

// defining x scale
var dateScale = d3.scale.ordinal()
  .domain(dataset.map(function(d) { return d.date }))
  .rangeRoundBands([padding,w - padding/ 2], 0.05);
// defining X axis
var xAxis = d3.svg.axis()
  .scale(dateScale)
  .orient("bottom")

//<TODO><Y>AXIS</Y></TODO>


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
    height: function(d) { return Math.round(yScale(d.cost) - (padding + barPadding)); },
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
    return h - (d.cost * 4);
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white")

// append X axis
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0, " + ( h - padding ) + ")")
  .call(xAxis);

  // <INEFFICIENT> CALCULATION</INEFFICIENT> see restaurant_total_data.json
  function calculateRestaurantTotals(dataset) {
    var restaurantTotals = [];
    for (var i = 0; i < dataset.length; i++) {

      if (restaurantTotals.length < 1) {
        let obj = new Object();
        obj.restaurant = dataset[i].restaurant
        obj.cost = dataset[i].cost
        restaurantTotals.push(obj)
      } else {
        // search through array to find matching restaurant
        for (var j = 0; j < restaurantTotals.length; j++) {
          var found = false;
            if (dataset[i].restaurant == restaurantTotals[j].restaurant) {
              restaurantTotals[j].cost += dataset[i].cost
              found = true;
              // console.log("restaurant found, adding price to " + dataset[i].restaurant)
              break; // must include break statement or if doesn't terminate
            }

        }
        if (found == false) {
          let obj = new Object();
          obj.restaurant = dataset[i].restaurant
          obj.cost = dataset[i].cost
          restaurantTotals.push(obj)
        }
      }
    }
    return restaurantTotals
  }

  d3.json("restaurant_total_data.json", function(restaurantTotals) {
  d3.select("#restaurantTotal")
    .on("click", function() {
      // var restaurantTotals = calculateRestaurantTotals(dataset)

      // change xScale
      xScale.domain(d3.range(restaurantTotals.length));	//Recalibrate the x scale domain, given the new length of dataset

      var newMax = d3.max(restaurantTotals, function(d) {
        return d.cost;
      })

      // change yScale
      yScale.domain([0, newMax]);

      //remove old bars
      svg.selectAll("rect").remove();
      // add new bars
      svg.selectAll("rect")
        .data(restaurantTotals)
        .enter()
        .append("rect")
        // note transitions don't work because we are creating NEW BARS
        .transition()
        .attr({
          x: function(d,i) {return xScale(i); },
          y: function(d) {
            return Math.round(h - yScale(d.cost));
          },
          width: xScale.rangeBand(),
          height: function(d) { return Math.round(yScale(d.cost) - (padding + barPadding)); },
          fill: function(d) { return "rgb(0,0, " + (Math.round(255 - (d.cost*5))) + ")"; }
        });
      // Update text values
      svg.selectAll("text").remove();
        svg.selectAll("text")
          .data(restaurantTotals)
          .enter()
          .append("text")
          .transition()
          .ease("linear")
          .attr("text-anchor", "middle")
          .text(function(d) {
            return "$" + Math.round(d.cost).toFixed(2);
          })
          .attr("x", function(d,i) {
            return xScale(i) + xScale.rangeBand() / 2;
          })
          .attr("y", function(d) {
            return h - yScale(d.cost) - 10;
          })
          .attr("font-family", "sans-serif")
          .attr("font-size", "11px")
          .attr("fill", "black")

      // remove old axis
        svg.select(".x.axis").remove();
      // add new axis with restaurant scale
      // defining x scale
      var restaurantScale = d3.scale.ordinal()
        .domain(restaurantTotals.map(function(d) { return d.restaurant }))
        .rangeRoundBands([padding,w - padding/ 2], 0.05);
      // defining X axis
      var xAxis = d3.svg.axis()
        .scale(restaurantScale)
        .orient("bottom")
        // append X axis
        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0, " + ( h - padding ) + ")")
          .call(xAxis);
      }) // end onclick
    }) // end total cost per restaurant scope
  }); // end daily restaurant cost json scope
