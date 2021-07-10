var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(stateData) {
    stateData.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
    });

    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, d => d.poverty), d3.max(stateData, d => d.poverty)])
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, d => d.healthcare), d3.max(stateData, d => d.healthcare)])
    .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()

        circlesGroup
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d=> yLinearScale(d.healthcare))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("opacity", ".5");
    console.log(stateData)
    // var textGroup = chartGroup.selectAll("text")
    //     .data(stateData)
    //     .enter()
    //     .append("text")
    //     .text(function(d){ return d.abbr})
    //     .attr("dx", d => xLinearScale(d.poverty))
    //     .attr("dy", d=> yLinearScale(d.healthcare)+10/2.5)
    //     .attr("font-size", "10")
    //     .attr("fill", "red")
    //     .attr("text-anchor", "middle")
   circlesGroup
    .append("text")
    .text(function(d){ return d.abbr})
    .attr("dx", d => xLinearScale(d.poverty))
    .attr("dy", d=> yLinearScale(d.healthcare)+10/2.5)
    .attr("font-size", "10")
    .attr("fill", "white")
    .attr("text-anchor", "middle")

    chartGroup
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", svgWidth/2)
    .attr("y", svgHeight -50)
    .text("Poverty %")

    chartGroup
    .append("text")
    .attr("text-anchor", "end")
    .attr("y", -40)
    .attr("dy", ".5em")
    .attr("transform", "rotate(-90)")
    .text("Lacks Healthcare %")
})