
// use local file
var battles ="data/battles.csv";

//printing out max and all the data from csv file 
d3.csv(battles, function(error, data) {
    console.log(data);
    data.forEach(function(d) {
        d.battle_number = +d.battle_number;
    });

    var maximum = d3.max(data, function(d) { return d.battle_number; });
    console.log("max is " + maximum);
});


// below is print out a specific category
// d3.csv(battles, function(d) {
//     return {
//         name: d.name,
//         year: +d.year, // convert "year" column to number
//         Battle_number: d.battle_number,
//         //not too sure if names are revelant
//         // attacker_king: d.attacker_king,
//         // defender_king: d.defender_king,
//         defender_size: +d.defender_size, // convert to number
//         attacker_size: +d.attacker_size, // convert to number
//     };
// }, function(error, rows) {
//     //print to console to see
//     //replace with svg later on
//     console.log(rows);
// });
