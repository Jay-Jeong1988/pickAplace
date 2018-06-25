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
    
    componentWillMount() {
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
                    recurrence: 70,
                    imgUrl: 'https://marketplace.canva.com/MACP0--HhzM/1/0/thumbnail_large/canva-black-circle-with-utensils-restaurant-logo-MACP0--HhzM.jpg'
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
                    recurrence: 10,
                    imgUrl: 'https://seeklogo.com/images/R/restaurant-chief-food-hotel-logo-9DE9D03812-seeklogo.com.png'
                },
                {
                    name: 'fouthrd',
                    price: 20,
                    cozy: 10,
                    luxury: 30,
                    taste: 10,
                    loud: 30,
                    modern: 80,
                    services: 10,
                    recurrence: 10,
                    imgUrl: 'http://3.bp.blogspot.com/-Oz5XdPqGddQ/ULy9zwbIDXI/AAAAAAAAPio/HZwYtIr7DfE/s1600/22-restaurant-logo-design.jpg'
                },
                {
                    name: 'sdgso',
                    price: 80,
                    cozy: 70,
                    luxury: 60,
                    taste: 80,
                    loud: 90,
                    modern: 30,
                    services: 100,
                    recurrence: 70,
                    imgUrl: 'https://marketplace.canva.com/MACP0--HhzM/1/0/thumbnail_large/canva-black-circle-with-utensils-restaurant-logo-MACP0--HhzM.jpg'
                },
                {
                    name: 'pdsgsgsoto',
                    price: 80,
                    cozy: 70,
                    luxury: 60,
                    taste: 80,
                    loud: 90,
                    modern: 30,
                    services: 100,
                    recurrence: 70,
                    imgUrl: 'https://marketplace.canva.com/MACP0--HhzM/1/0/thumbnail_large/canva-black-circle-with-utensils-restaurant-logo-MACP0--HhzM.jpg'
                },
                {
                    name: 'psgsdoto',
                    price: 80,
                    cozy: 70,
                    luxury: 60,
                    taste: 80,
                    loud: 90,
                    modern: 30,
                    services: 100,
                    recurrence: 70,
                    imgUrl: 'https://marketplace.canva.com/MACP0--HhzM/1/0/thumbnail_large/canva-black-circle-with-utensils-restaurant-logo-MACP0--HhzM.jpg'
                },
            ]
        })
    }
    componentDidMount() {
        
        this.svg = d3.select(this.refs.container)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom + 30)
        .append("g")
            .attr( "transform", "translate(" + margin.left + "," + margin.top + ")");
        
        
        this.renderAxis();
    }
    
    componentDidUpdate(){
        
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



            this.svg.select('.x.axis')
            .selectAll('.tick')
            .data(this.state.dummyData)
            .append('foreignObject')
                .attr('transform','translate(-20, 20)')
            .append('xhtml:div')
                .style('width','60px')
                .style('height','40px')
                .style('background-image', d => `url(${d.imgUrl})`)
                .style('background-size','40px')
                .style('background-repeat', 'no-repeat')



            this.svg.select('.x.axis')
            .selectAll('.tick')
            .selectAll('text')
                .style('font-weight','bold')
                .style("font-size", '15px')
                .attr('fill', 'darkgray')
                .attr("dy", "4em")




        
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