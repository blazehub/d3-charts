const data = [{
    ptx: 2,
    pty: 4,
    pth: 5,
    ptl: 3
}, {
    ptx: 10,
    pty: 8,
    pth: 11,
    ptl: 5
}, {
    ptx: 20,
    pty: 17,
    pth: 23,
    ptl: 12
}, {
    ptx: 30,
    pty: 35,
    pth: 42,
    ptl: 26
}];

const margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


const x = d3.scaleLinear().range([0, width])
    .domain([0, d3.max(data, d => d.ptx)]),
    y = d3.scaleLinear().range([height, 0])
        .domain([0, d3.max(data, d => d.pty)]);


const svg = d3.select('body').append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

const yAxis = d3.axisLeft(y)
    .ticks(5);

svg.append("g")
    .attr("class", "grid")
    .call(yAxis
        .tickSize(-width)
        .tickFormat("")
    );

svg.append("g")
    .attr("class", "axis-line")
    .call(d3.axisLeft(y))

svg.append('path')
    .data([data])
    .attr('class', 'area')
    .attr('d', d3.area()
        .curve(d3.curveCardinal)
        .x(d => x(d.ptx) || 1)
        .y0(d => y(d.pth))
        .y1(d => y(d.pty))
    )

svg.append('path')
    .data([data])
    .attr('class', 'area')
    .attr('d', d3.area()
        .curve(d3.curveCardinal)
        .x(d => x(d.ptx) || 1)
        .y0(d => y(d.ptl))
        .y1(d => y(d.pty))
    )

const medianLine = d3.line()
    .curve(d3.curveCardinal)
    .x(function (d) { return x(d.ptx); })
    .y(function (d) { return y(d.pty); });


svg.datum(data);

svg.append('path')
    .attr('class', 'median-line')
    .attr('d', medianLine)
