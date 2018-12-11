const data = [{
    "date": 0,
    "close": 80
}, {
    "date": 100,
    "close": 100
}, {
    "date": 200,
    "close": 30
}, {
    "date": 300,
    "close": 50
}, {
    "date": 400,
    "close": 40
}, {
    "date": 500,
    "close": 80
}]

function make_y_gridlines() {
    return d3.axisLeft(y)
        .ticks(5)
}


const margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
x.domain([0, d3.max(data, function (d) { return d.date; })]);
y.domain([0, d3.max(data, function (d) { return d.close; })]);


const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "grid")
    .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat("")
    );

svg.append('path')
    .datum(data)
    .attr("class", "line")
    .attr('d', d3.line()
        .curve(d3.curveCardinal)
        .x(d => x(d.date))
        .y(d => y(d.close)))

const plot = svg.append("g")
    .attr("class", "axis-line")
    .call(d3.axisLeft(y))
    .selectAll("dot")
    .data(data)
    .enter()
    .append('g');

plot.append("circle")
    .attr("class", "outer-dot")
    .attr("r", 12)
    .attr("cx", function (d) { return x(d.date); })
    .attr("cy", function (d) { return y(d.close); });

plot.append("circle")
    .on("mouseover", function (d, i) {
        this.classList.add('hover');
        d3.select(this)
            .transition()
            .ease(d3.easeElastic)
            .duration("10")
            .attr("r", 10);
    })
    .on("mouseout", function (d, i) {
        this.classList.remove('hover');
        d3.select(this).transition()
            .ease(d3.easeElastic)
            .duration("10")
            .attr("r", 6);
    })
    .attr("class", "inner-dot")
    .attr("r", 6)
    .attr("cx", function (d) { return x(d.date); })
    .attr("cy", function (d) { return y(d.close); })    