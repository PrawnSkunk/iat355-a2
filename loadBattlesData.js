
// use local file
var battles ="data/battles.csv";

d3.csv(battles, function(d) {
    return {
        name: d.name,
        year: +d.year, // convert "year" column to number
        Battle_number: d.battle_number,
        //not too sure if names are revelant
        // attacker_king: d.attacker_king,
        // defender_king: d.defender_king,
        defender_size: +d.defender_size, // convert to number
        attacker_size: +d.attacker_size, // convert to number
    };
}, function(error, rows) {
    //print to console to see
    //replace with svg later on
    console.log(rows);
});


// function drawCircles(dataset){
//     var svg = d3.select("svg");
//     svg.selectAll("circle")
//         .data(dataset)
//         .enter()
//         .append("circle")
//         .attr("cx", function(d){return d.x;})
//         .attr("cy", function(d){return d.y;})
//         .attr("r", function(d){return d.r;})
//
// }