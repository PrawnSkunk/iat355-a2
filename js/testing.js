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
        return '<span class="stringtext">' + m + '</span>';
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
// get the csv file
d3.csv("data/battles.csv", function(data) {
    // ".toLocaleString()" means format as "10,000" instead of 10000
    var max_defender = d3.max(data, function(d) { return +d.defender_size;} );
    console.log("Q1. Maximum: The largest defending army was " + max_defender.toLocaleString());

    // "|| Infinity" means "smallest value that is not zero"
    var min_attacker=  d3.min(data, function(d) { return +d.attacker_size || Infinity; });
    console.log("Q2. Minimum: The smallest attacking army was " + min_attacker.toLocaleString());
});

d3.csv("data/character-deaths.csv", function(data) {
    // Reduce function counts strings in an array (NOT object)
    var sum_allegiances = d3.values(data)
        .map(function(d) { return d.Allegiances; })
        .reduce(function (e, a) {
            return e + (a === 'House Stark');
        }, 0);
    console.log("Q4. Dimension Criterion: " + sum_allegiances + " major character deaths allegiant to House Stark.")
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
