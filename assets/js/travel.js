var travelHandler = d3.select("#travels");
var filePath = "assets/travels/travel.csv";
d3.csv(filePath)
    .then(function(data) {
        LoadTravels(data);
    })

function LoadTravels(travelData){
    var travels = travelHandler.selectAll('div')
        .data(travelData)
        .enter()
        .append("div")
        .attr('class', "travel_item");
    travels
        .append("div")
        .attr('class', "travel_trip")
        .append("a")
        .text(function(d){
            let trip = getCleanText(d.trip);
            return trip;
        });
        // .on('mouseover', function() {
        //     d3.select(this)
        //         .style('background-color', highlightColor)
        // })
        // .on('mouseout', function () {
        //     d3.select(this)
        //         .style('background-color', function (d) { return d.backgroundColor; })
        // });

    ResizePage();
}

function getCleanText(t){
    if(t[0] == '\"')
        t = t.substr(1, t.length - 1);
    if(t[t.length - 1] == '\"')
        t = t.substr(0, t.length - 1);
    t = t.trim();
    return t;
}