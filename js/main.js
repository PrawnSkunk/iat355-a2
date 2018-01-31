/* Largest Defending Army
   ========================================================================== */

// Set Margin
var margin = { top: 40,  right: 40,  bottom: 40, left: 40},
    width = 560 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
// Set Range
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
var y = d3.scaleLinear()
    .range([height, 0]);

// Append a header to the body element
var title = d3.select('.chart-container').append("h2")
    .text("Largest Defending Army");

// Append an SVG object to the body element
var svg = d3.select('.chart-container').append("svg")

    // Start-- Make chart responsive
    .attr("width", '100%')
    .attr("height", '100%')
    .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
    .attr('preserveAspectRatio','xMinYMin')
    // End-- Make chart responsive

    // Append a group element to the SVG element
    .append("g")

    // Transform SVG to top-left margin
    .attr("transform", "translate(" +  margin.left + ",-" + margin.top + ")");

// Load Data
d3.csv("data/battles.csv", function(error, data) {
    if (error) throw error;

    // Format the data
    data.forEach(function(d) {
        // Use unary plus operator (+) to convert strings to numbers
        d.defender_size = +d.defender_size;
    });

    // Sort the data by defender size
    data.sort(function(a, b) {
        return b.defender_size - a.defender_size;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) {
        return d.name;
    }));
    y.domain([0, d3.max(data, function(d) {
        return d.defender_size;
    })]);

    // Append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
            return x(d.name);
        })
        .attr("width", x.bandwidth())
        .attr("y", function(d) {
            return y(d.defender_size);
        })
        .attr("height", function(d) {
            return height - y(d.defender_size);
        });
    // Add the x Axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "start");

    // Add the y Axis
    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

});

/* Smallest Attacking Army
   ========================================================================== */



// Append a header to the body element
var title = d3.select('.chart-container').append("h2")
    .text("Smallest Attacker Army");

// Append an SVG object to the body element
var svg2 = d3.select('.chart-container').append("svg")

// Start-- Make chart responsive
    .attr("width", '100%')
    .attr("height", '100%')
    .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
    .attr('preserveAspectRatio','xMinYMin')
    // End-- Make chart responsive

    // Append a group element to the SVG element
    .append("g")

    // Transform SVG to top-left margin
    .attr("transform", "translate(" +  margin.left + ",-" + margin.top + ")");

// Load Data
d3.csv("data/battles.csv", function(error, data) {
    if (error) throw error;

    // Format the data
    data.forEach(function(d) {
        // Use unary plus operator (+) to convert strings to numbers
        d.attacker_size = +d.attacker_size;
    });

    // Sort the data by defender size
    data.sort(function(a, b) {
        return a.attacker_size- b.attacker_size;

    });



    // Scale the range of the data in the domains
    x.domain(data.map(function(d) {
        return d.name;
    }));
    y.domain([0, d3.max(data, function(d) {
        return d.attacker_size;
    })]);

    // Add the x Axis
    svg2.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "start");

    // Add the y Axis
    svg2.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    // Append the rectangles for the bar chart

    svg2.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
            return x(d.name);
        })
        .attr("width", x.bandwidth())
        .attr("y", function(d) {
            return y(d.attacker_size);
        })
        .attr("height", function(d) {
            return height - y(d.attacker_size);
        });
    var min_attacker = d3.select('.chart-container').append("h5")
        .text("Smallest Attacker Army size is "+d3.min(data,function(d){return d.attacker_size;}));
    var max_attacker = d3.select('.chart-container').append("h5")
        .text("Largerst Attacker Army size is "+d3.max(data,function(d){return d.attacker_size;}));
    var max_attacker = d3.select('.chart-container').append("h5")
        .text("Average Attacker Army size is "+d3.mean(data,function(d){return d.attacker_size;}));


});
