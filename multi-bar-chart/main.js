const data = [
    {
        "categorie": "Student",
        "values": [
            {
                "value": 0,
                "rate": "Not at all"
            },
            {
                "value": 4,
                "rate": "Not very much"
            },
            {
                "value": 12,
                "rate": "Medium"
            },
            {
                "value": 6,
                "rate": "Very much"
            }
        ]
    },
    {
        "categorie": "Liberal Profession",
        "values": [
            {
                "value": 1,
                "rate": "Not at all"
            },
            {
                "value": 21,
                "rate": "Not very much"
            },
            {
                "value": 13,
                "rate": "Medium"
            },
            {
                "value": 18,
                "rate": "Very much"
            }
        ]
    },
    {
        "categorie": "Salaried Staff",
        "values": [
            {
                "value": 3,
                "rate": "Not at all"
            },
            {
                "value": 22,
                "rate": "Not very much"
            },
            {
                "value": 6,
                "rate": "Medium"
            },
            {
                "value": 15,
                "rate": "Very much"
            }
        ]
    },
    {
        "categorie": "Employee",
        "values": [
            {
                "value": 12,
                "rate": "Not at all"
            },
            {
                "value": 7,
                "rate": "Not very much"
            },
            {
                "value": 18,
                "rate": "Medium"
            },
            {
                "value": 13,
                "rate": "Very much"
            }
        ]
    },
    {
        "categorie": "Craftsman",
        "values": [
            {
                "value": 6,
                "rate": "Not at all"
            },
            {
                "value": 15,
                "rate": "Not very much"
            },
            {
                "value": 9,
                "rate": "Medium"
            },
            {
                "value": 12,
                "rate": "Very much"
            }
        ]
    },
    {
        "categorie": "Inactive",
        "values": [
            {
                "value": 6,
                "rate": "Not at all"
            },
            {
                "value": 6,
                "rate": "Not very much"
            },
            {
                "value": 6,
                "rate": "Medium"
            },
            {
                "value": 2,
                "rate": "Very much"
            }
        ]
    }
]

const margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

const color = d3.scaleOrdinal(d3.schemeCategory20c);

var x0 = d3.scaleBand().rangeRound([0, width])
    .padding(0.1);
var x1 = d3.scaleBand();
var y = d3.scaleLinear().range([height, 0]);

x0.domain(data.map(d => d.categorie));
x1.domain(data[0].values.map(v => v.rate)).rangeRound([0, x0.bandwidth()]);
y.domain([0, d3.max(data, d => d3.max(d.values, _d => _d.value))]);


function make_y_gridlines() {
    return d3.axisLeft(y)
        .ticks(5)
}

function make_x_gridlines() {
    return d3.axisBottom(x0)
        .ticks(0)
}

const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


/**
 * Y-Axis
 */
svg.append("g")
    .attr("class", "grid")
    .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat("")
    )

svg.select('.y').transition().duration(500).delay(1300).style('opacity', '1');


/**
* X-Axis
*/
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(make_x_gridlines())


const slice = svg.selectAll(".slice")
    .data(data)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform", function (d) {
        return "translate(" + x0(d.categorie) + ",0)";
    });


slice.selectAll("rect")
    .data(function (d) { return d.values; })
    .enter().append("rect")
    .attr("width", x1.bandwidth())
    .attr("x", function (d) { return x1(d.rate); })
    .style("fill", function (d) { return color(d.rate) })
    .attr("y", function (d) { return y(0); })
    .attr("height", function (d) { return height - y(0); })

slice.selectAll("rect")
    .transition()
    .delay(function (d) { return Math.random() * 1000; })
    .duration(1000)
    .attr("y", function (d) { return y(d.value); })
    .attr("height", function (d) { return height - y(d.value); });


// var legend = svg.selectAll(".legend")
//     .data(data[0].values.map(function (d) { return d.rate; }).reverse())
//     .enter().append("g")
//     .attr("class", "legend")
//     .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })
//     .style("opacity", "0");

// legend.append("text")
//     .attr("x", width - 24)
//     .attr("y", 9)
//     .attr("dy", ".35em")
//     .style("text-anchor", "end")
//     .text(function (d) { return d; });

legend.transition().duration(500).delay(function (d, i) { return 1300 + 100 * i; }).style("opacity", "1");