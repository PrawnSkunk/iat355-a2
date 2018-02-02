// get the console output
var consoletxt = console.log;

//print console message to screen appended with a paragraph
console.log = function (message) {
    consoletxt.apply(console, arguments);
    $("#cout").append('<p>' + prettify(message) + '</p>')
};

function prettify(m){
    //the output is a string, assign it with stringtext class
    if(typeof m == 'string'){
        return '<span class="stringtext">' + m + '</span>';;
    }
    if(typeof m == 'object'){
        if(m instanceof Array){
            var arr = '[';
            for(var i =0; i < m.length; i++){
                arr += prettify(m[i]);
                arr += (i === m.length -1 ? ']' : ',');
            }
            return arr;
        }else{
            var obj = 'Object {';
            for (var property in m){
                var value = m[property];
                obj += property + ' : ' + prettify(value) + ', '
            }
            obj += '}';
            return obj;
        }
    }

}
//
// console.log("test123");
// console.log([1,3,4]);
// console.log({a:"test", b: 2});

//---------loading battle csv file----------
// use local file
var battles ="data/battles.csv";
// get the csv file
d3.csv(battles, function(error, data) {
    data.forEach(function(d) {
        d.battle_number = +d.battle_number;
        d.defender_size=+d.defender_size;
        d.attacker_size=+d.attacker_size;
    });


    var max_battle = d3.max(data, function(d) { return d.battle_number; });
    var min_battle=  d3.min(data, function(d) { return d.battle_number; });
    var sum_battle=  d3.sum(data, function(d) { return d.battle_number; });
    var avg_battle=  d3.mean(data, function(d) { return d.battle_number; });
    console.log("The largest battle size is " + max_battle);
    console.log("The smallest battle size is " + min_battle);
    console.log("The total battle size is " + sum_battle);
    console.log("The average of the battle size is " + avg_battle);

    var max_defender = d3.max(data, function(d) { return d.defender_size; });
    var min_defender=  d3.min(data, function(d) { return d.defender_size; });
    var sum_defender=  d3.sum(data, function(d) { return d.defender_size; });
    var avg_defender=  d3.mean(data, function(d) { return d.defender_size; });
    console.log("The largest defender size is " + max_defender);
    console.log("The smallest defender size is " + min_defender);
    console.log("The total defender size is " + sum_defender);
    console.log("The average of the defender size is " + avg_defender);

    var max_attacker = d3.max(data, function(d) { return d.attacker_size; });
    var min_attacker=  d3.min(data, function(d) { return d.attacker_size; });
    var sum_attacker=  d3.sum(data, function(d) { return d.attacker_size; });
    var avg_attacker=  d3.mean(data, function(d) { return d.attacker_size; });
    console.log("The largest attacker size is " + max_attacker);
    console.log("The smallest attacker size is " + min_attacker);
    console.log("The total attacker size is " + sum_attacker);
    console.log("The average of the attacker size is " + avg_attacker);



});

//---------loading character deaths csv file----------
// use local file

// d3.csv(battles, function(d) {
//     return {
//         year: +d.year, // convert "year" column to number
//     };
// }, function(d) {
//     //print to console to see
//     //replace with svg later on
//     for (i = 0; i < d.length; i++) {
//         // console.log(i);
//         console.log(d[i].year);
//     }
// });
