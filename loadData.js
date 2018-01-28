    var url = "http://www.sfu.ca/~aga53/data/circles.csv";
   // use local file
   //url ="circles.csv";


      d3.csv(url)
      .row(function(d){
              d.x = +d.x; //convert sales to integer, 
                          // default is string
              d.y = +d.y;
              d.r = +d.r;
          return d; //don’t forget to return the row
      })
      .get(function(error, data){



          drawCircles(data);
      })


      function drawCircles(dataset){
          var svg = d3.select("svg");
          svg.selectAll("circle")
          .data(dataset)
          .enter()
          .append("circle")
          .attr("cx", function(d){return d.x;})
          .attr("cy", function(d){return d.y;})
          .attr("r", function(d){return d.r;})
       
      }