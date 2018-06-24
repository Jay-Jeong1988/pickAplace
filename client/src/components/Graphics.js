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
        this.xAxis = d3.axisBottom(this.x).ticks(10);
        this.yAxis = d3.axisLeft(this.y).ticks(10);
        this.renderAxis = this.renderAxis.bind(this);
        this.renderBars = this.renderBars.bind(this);
        
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
                },
                {
                    name: 'third',
                    price: 20,
                    cozy: 10,
                    luxury: 70,
                    taste: 10,
                    loud: 30,
                    modern: 80,
                    services: 10,
                    recurrence: 10
                }
            ]
        });
    }
    
    componentDidUpdate(){
        
        this.renderAxis();
        this.renderBars();
    }
    
    renderBars() {
        
        this.svg.selectAll('bar')
            .data(this.state.dummyData)
            .enter()
        .append('rect')
            .style('fill', 'steelblue')
            .attr('x', d => this.x(d.name))
            .attr('width', this.x.bandwidth())
            .attr('y', d => this.y(d.price))
            .attr('height', d => ( height - this.y(d.price)) )


    }
    
    renderAxis() {
        
        this.x.domain(this.state.dummyData.map( d => d.name ));
        this.y.domain([0, 100]);
        
        this.svg
        .append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate( 0 , ${height})`)
            .call(this.xAxis)
        .selectAll('text')
            .style("text-anchor", "end")
            .attr("dx", ".8em")
            .attr("dy", "2em");
        
        const yColor = ['#FFC36F', '#FFC84D', '#FFC240', '#FFAB34', '#FF9127',
        '#FF761B', '#FF5B13', '#FF4C0B', '#FF4A0B', '#FF3A06', '#FF0303']

        this.svg
        .append('g')
            .attr('class', 'y axis')
            .call(this.yAxis)
        .selectAll('text')
            .data(yColor)
            .style('fill', c => c)
            .style('font-size', '15px')
            .style('font-weight', 'bold')

        
        //     this.svg.append("g")
        //     .attr("class", "y axis")
        //     .call(this.yAxis)
        //     .append("text")
        //     .attr("transform", "rotate(-90)")
        //     .attr("y", 6)
        //     .attr("dy", ".71em")
        //     .style("text-anchor", "end")
        //     .text("Value ($)");
        
        
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