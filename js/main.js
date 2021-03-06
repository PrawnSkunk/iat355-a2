/* Q1: Maximum And Minimum
   ========================================================================== */
d3.csv("data/battles.csv", function(data) {
    // ".toLocaleString()" means format as "10,000" instead of 10000
    var max_defender = d3.max(data, function(d) { return +d.defender_size;} );
    d3.select('.q1-container').append("p").html("<strong>Q1. Maximum and Minimum</strong>:<hr/>The largest defending army was " + max_defender.toLocaleString() + " defenders.<br/>");
    // "|| Infinity" means "smallest value that is not zero"
    var min_attacker=  d3.min(data, function(d) { return +d.attacker_size || Infinity; });
    d3.select('.q1-container').append("p").html("The smallest attacking army was " + min_attacker.toLocaleString() + " attackers.<br/><br/>");
});


/* Q2: Sum
   ========================================================================== */

d3.csv("data/battles.csv",function(data){
    var sum_major_deaths =  d3.sum(data, function(d) { return +d.major_death });
    var total_battles = d3.sum(data, function(d) { return 1 });
    d3.select('.q2-container').append("p").html('<strong>Q2. Sum:</strong><hr/>' + sum_major_deaths + ' of ' + total_battles + ' battles with main character deaths.<br/><br/>');
});


/* Q3: Average
   ========================================================================== */

d3.csv("data/battles.csv", function(data) {
    var avg_army =  d3.mean(data, function(d) { return (+d.attacker_size + +d.defender_size) });
    d3.select('.q3-container').append("p").html("<strong>Q3. Average</strong>:<hr/>The average battle size was " + avg_army.toLocaleString() + " soldiers.<br/><br/>");
});


/* Q4: Dimension Criterion
   ========================================================================== */

d3.csv("data/character-deaths.csv", function(data) {
    // Reduce function counts strings in an array (NOT object)
    var sum_allegiances = d3.values(data)
        .map(function(d) { return d.Allegiances; })
        .reduce(function (e, a) {
            return e + (a === 'House Stark');
        }, 0);
    d3.select('.q4-container').append("p").html("<strong>Q4. Dimension Criterion:</strong><hr/>" + sum_allegiances + " major character deaths allegiant to House Stark.<br/><br/>")
});


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
        if (d.attacker_size > 0)
        return d.name;
    }));

    y.domain([0, 3200]);

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
});

