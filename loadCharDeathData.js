var deaths="data/character-deaths.csv";

d3.csv(deaths, function(d) {
    return {
        // if showing 0, that means no data
        name: d.Name,
        DeathYear: +d['Death Year'],
        BookDeath: +d['Book of Death']
    };
}, function(error, rows) {
    //print to console to see
    //replace with svg later on
    console.log(rows);
});
