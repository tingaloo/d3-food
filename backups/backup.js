// remove old bars


// This code block is supposed to take the SVG code block and splice
// out the proper array elements, but the change does not
// persist.
var oldBars = svg.selectAll("rect")
console.log(oldBars)
oldBars[0].splice(6, 5)
svg.selectAll("rect").splice(6, 5)
for (var i = dataset.length; i >= restaurantTotals.length; i--) {
  // console.log(i)
  console.log(oldBars[0][i])
}
console.log(oldBars)
console.log(svg.selectAll("rect"))

// Code block will alter existing bars, and NOT erase the old ones.
// the previous block above does that.
svg.selectAll("rect")
    .data(dataset)
    .transition() // adds basic transition
    .delay(function(d, i) {
			   return i / dataset.length * 1000;		// One-tenth of an additional second delay for each subsequent element
		   })
    .duration(500) // adds 1 second
    // .ease("linear")
    .attr("x", function(d) {
      console.log(xScale(i))
      return xScale(i);
    })
    .attr("y", function(d) {
      return Math.round(h - yScale(d.cost)); // must reset the y position
    })
    .attr("height", function(d) {
      return Math.round(yScale(d.cost) );
    })
    .attr("width", function(d) {
      return xScale.rangeBand();
    })
    .attr("fill", function(d) {
      return "rgb(0,0, " + (Math.round(255 - (d.cost*5))) + ")";
    })
