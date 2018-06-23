import React, { Component } from 'react';
import * as d3 from 'd3';
import { Restaurant } from '../lib/requests';

const margin = { top: 20, right: 20, bottom: 70, left: 40};
const width = 700 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;


class Graphics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dummyData: []
        }
        this.x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
        this.y = d3.scaleLinear().range([height, 0]);
        this.xAxis = d3.axisBottom(this.x);
        this.yAxis = d3.axisLeft(this.y).ticks(10);
        this.renderChart = this.renderChart.bind(this);
           
    }
    
    componentDidMount() {
        this.svg = d3.select(this.refs.container)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr( "transform", "translate(" + margin.left + "," + margin.top + ")");
        this.setState({
            dummyData: [
                {
                    name: 'proto',
                    price: 80,
                    cozy: 70,
                    luxury: 60,
                    taste: 80,
                    loud: 90,
                    modern: 30,
                    services: 100,
                    recurrence: 70
                },
                {
                    name: 'second',
                    price: 30,
                    cozy: 20,
                    luxury: 50,
                    taste: 10,
                    loud: 30,
                    modern: 80,
                    services: 10,
                    recurrence: 10
                }
            ]
        });
        this.renderChart();
    }
    
    componentDidUpdate(){
        this.renderChart();
        
    }
    
    renderChart() {
        
        // this.svg.selectAll('g')
        // .data(this.state.dummyData)
        // .enter()
        // .append('circle').attr('transform', d => `translate(${d.price}, 20)`)
        // .attr('cx',32).attr('cy',53).attr('r',15);
        this.state.dummyData.forEach( (data) => {

            this.x.domain([0, 2]);
            this.y.domain([0, 100]);

            this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(this.xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)" );

            this.svg.append("g")
            .attr("class", "y axis")
            .call(this.yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Value ($)");

            this.svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .style("fill", "steelblue")
            .attr("x", function(d) { return this.x(d.name); })
            .attr("width", this.x.bandwidth())
            .attr("y", function(d) { return this.y(d.price); })
            .attr("height", function(d) { return height - this.y(d.price); });
        })
        // this.x.domain( this.state.dummyData.map(d => d.name ));
        // this.y.domain([0, 100]);

        // this.svg.selectAll('g')
        //     .data(this.state.dummyData)
        //     .enter()
        // .append('g')
        //     .attr('class', 'x axis')
        //     .call(this.xAxis)
        // .selectAll("text")
        //     .style("text-anchor", "end")
        //     .attr("dx", "-.8em")
        //     .attr("dy", "2em");

        // this.svg.selectAll('g')
        //     .attr('class', 'y axis')
        //     .call(this.yAxis)
        // .append('text')
        //     .attr('transform', 'rotate(-90)')
        //     .attr('y', 6)
        //     .attr('dy', '.71em')
        //     .style('text-anchor', 'end')
        //     .text('Value (%)');

    
        //     this.x.domain(data.map(d => d.name));
        //     this.y.domain([0, d3.max(data, d => d.price)]);
    
        //     this.svg.append("g")
        //         .attr("class", "x axis")
        //         .style("font:10px sans-serif")
        //         .call(this.xAxis)
        //     .selectAll("text")
        //         .style("text-anchor", "end")
        //         .attr("dx", "-.8em")
        //         .attr("dy", "2em");
    
        //     this.svg.append("g")
        //         .attr("class", "y axis")
        //         .style("font:10px sans-serif")
        //         .call(this.yAxis)
        //     .append("text")
        //         .attr("transform", "rotate(-90)")
        //         .attr("y", 6)
        //         .attr("dy", ".71em")
        //         .style("text-anchor", "end")
        //         .text("Value (%)");
    
        //     this.svg.selectAll("bar")
        //         .data(data)
        //     .enter().append("rect")
        //         .style("fill", "steelblue")
        //         .attr("x", function(d) { return this.x(d.name); })
        //         .attr("width", this.x.bandWidth())
        //         .attr("y", function(d) { return this.y(d.price); })
        //         .attr("height", function(d) { return height - this.y(d.price); });
        // })
    }

    render() {

        return (
            <main>

                <svg ref="container">
                </svg>

            </main>
        )
    }
}

export default Graphics;