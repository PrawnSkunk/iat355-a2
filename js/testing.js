/* Q1: Maximum And Minimum
   ========================================================================== */
d3.csv("data/battles.csv", function(data) {
    // ".toLocaleString()" means format as "10,000" instead of 10000
    var max_defender = d3.max(data, function(d) { return +d.defender_size;} );
    d3.select('.chart-container').append("p").html("<strong>Q1. Maximum and Minimum</strong>:<hr/>The largest defending army was " + max_defender.toLocaleString() + " defenders.<br/>");
    // "|| Infinity" means "smallest value that is not zero"
    var min_attacker=  d3.min(data, function(d) { return +d.attacker_size || Infinity; });
    d3.select('.chart-container').append("p").html("The smallest attacking army was " + min_attacker.toLocaleString() + " attackers.<br/><br/>");
});


/* Q2: Sum
   ========================================================================== */

d3.csv("data/battles.csv",function(data){
    var sum_major_deaths =  d3.sum(data, function(d) { return +d.major_death });
    var total_battles = d3.sum(data, function(d) { return 1 });
    d3.select('.chart-container').append("p").html('<strong>Q2. Sum:</strong><hr/>' + sum_major_deaths + ' of ' + total_battles + ' battles with main character deaths.<br/><br/>');
});


/* Q3: Average
   ========================================================================== */

d3.csv("data/battles.csv", function(data) {
    var avg_army =  d3.mean(data, function(d) { return (+d.attacker_size + +d.defender_size) });
    d3.select('.chart-container').append("p").html("<strong>Q3. Average</strong>:<hr/>The average battle size was " + avg_army.toLocaleString() + " soldiers.<br/><br/>");
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
    d3.select('.chart-container').append("p").html("<strong>Q4. Dimension Criterion:</strong><hr/>" + sum_allegiances + " major character deaths allegiant to House Stark.<br/><br/>")
});