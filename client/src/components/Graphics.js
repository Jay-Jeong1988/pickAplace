import React, { Component } from 'react';
import * as d3 from 'd3';
import { Restaurant } from '../lib/requests';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './style.css';

const margin = { top: 200, right: 55, bottom: 100, left: 180};
const width = 1250 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;


class Graphics extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            dummyData: []
        }
        
        
        this.x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.2).paddingOuter(0.2);
        this.x1 = d3.scaleBand().paddingInner(0.05);
        this.y = d3.scaleLinear().range([parseInt(height - 50), 0]);
        this.z = d3.scaleOrdinal()
        .range([ "#AA528A", "#4E9397", "#E1714F", "#F3DA7B", "#D8384F" , "#194B8D", "#8DAD9D", "#A3DDE3"  ]);
        this.x0Axis = d3.axisBottom(this.x0).ticks(10);
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
                    revisit: 70,
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
                    revisit: 10,
                    imgUrl: 'https://seeklogo.com/images/R/restaurant-chief-food-hotel-logo-9DE9D03812-seeklogo.com.png'
                },
                {
                    name: 'fouthrd',
                    price: 20,
                    cozy: 90,
                    luxury: 30,
                    taste: 10,
                    loud: 30,
                    modern: 80,
                    services: 10,
                    revisit: 10,
                    imgUrl: 'http://3.bp.blogspot.com/-Oz5XdPqGddQ/ULy9zwbIDXI/AAAAAAAAPio/HZwYtIr7DfE/s1600/22-restaurant-logo-design.jpg'
                },
                {
                    name: 'sdgso',
                    price: 20,
                    cozy: 10,
                    luxury: 60,
                    taste: 80,
                    loud: 90,
                    modern: 30,
                    services: 20,
                    revisit: 70,
                    imgUrl: 'https://marketplace.canva.com/MACP0--HhzM/1/0/thumbnail_large/canva-black-circle-with-utensils-restaurant-logo-MACP0--HhzM.jpg'
                },
                {
                    name: 'pdsgsgsoto',
                    price: 10,
                    cozy: 30,
                    luxury: 20,
                    taste: 30,
                    loud: 90,
                    modern: 30,
                    services: 20,
                    revisit: 20,
                    imgUrl: 'https://marketplace.canva.com/MACP0--HhzM/1/0/thumbnail_large/canva-black-circle-with-utensils-restaurant-logo-MACP0--HhzM.jpg'
                },
                {
                    name: 'to',
                    price: 20,
                    cozy: 60,
                    luxury: 25,
                    taste: 10,
                    loud: 37,
                    modern: 30,
                    services: 22,
                    revisit: 5,
                    imgUrl: 'https://marketplace.canva.com/MACP0--HhzM/1/0/thumbnail_large/canva-black-circle-with-utensils-restaurant-logo-MACP0--HhzM.jpg'
                },
                {
                    name: 'pdoto',
                    price: 0,
                    cozy: 20,
                    luxury: 30,
                    taste: 40,
                    loud: 10,
                    modern: 30,
                    services: 20,
                    revisit: 10,
                    imgUrl: 'https://marketplace.canva.com/MACP0--HhzM/1/0/thumbnail_large/canva-black-circle-with-utensils-restaurant-logo-MACP0--HhzM.jpg'
                },
                {
                    name: 'pto',
                    price: 40,
                    cozy: 60,
                    luxury: 50,
                    taste: 30,
                    loud: 20,
                    modern: 30,
                    services: 22,
                    revisit: 40,
                    imgUrl: 'https://marketplace.canva.com/MACP0--HhzM/1/0/thumbnail_large/canva-black-circle-with-utensils-restaurant-logo-MACP0--HhzM.jpg'
                },
                {
                    name: 'gwgsdoto',
                    price: 30,
                    cozy: 33,
                    luxury: 35,
                    taste: 36,
                    loud: 38,
                    modern: 41,
                    services: 32,
                    revisit: 25,
                    imgUrl: 'https://marketplace.canva.com/MACP0--HhzM/1/0/thumbnail_large/canva-black-circle-with-utensils-restaurant-logo-MACP0--HhzM.jpg'
                },
                {
                    name: 'psato',
                    price: 20,
                    cozy: 40,
                    luxury: 50,
                    taste: 70,
                    loud: 20,
                    modern: 30,
                    services: 100,
                    revisit: 60,
                    imgUrl: 'https://marketplace.canva.com/MACP0--HhzM/1/0/thumbnail_large/canva-black-circle-with-utensils-restaurant-logo-MACP0--HhzM.jpg'
                },
            ]
        })
    }
    componentDidMount() {
        
        this.svg = d3.select(this.refs.container)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr( "transform", "translate(" + margin.left + "," + margin.top + ")");
        
        this.keys = Object.keys(this.state.dummyData[0]);
        this.keysWithNumVal = this.keys.slice(1, this.keys.length - 1);

        this.moodKeys = ["cozy","luxury","loud","modern"];
        
        this.renderAxis();
    }
    


    componentDidUpdate(){
        
        this.renderBars();
        this.renderLegends();
        this.renderOptions();
    }
    


    renderBars() {
       
        this.svg.append('g')
        .selectAll('g')
            .data(this.state.dummyData)
            .enter()
        .append('g')
            .attr('transform', d => { 
                return 'translate(' + this.x0(d.name) + ', 0)';
            })
        .selectAll('rect')
            .data( d => { 
                return this.keysWithNumVal.map( function(key){ return { key: key, value: d[key] }; }); })
            .enter()
        .append('rect')
            .attr('x', d => this.x1(d.key) )
            .attr('y', d => this.y(d.value) )
            .attr('width', this.x1.bandwidth())
            .attr('height', d => height - this.y(d.value) )
            .attr('fill', d => this.z(d.key) );
        
        
    }

    
    renderAxis() {
        

        this.x0.domain(this.state.dummyData.map( d => d.name ));
        this.x1.domain(this.keysWithNumVal).rangeRound([0, this.x0.bandwidth()])
        this.y.domain([0, 100]);
        
        this.svg
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate( 0 , ${height})`)
        .call(this.x0Axis)
        .select('path')
        .style('display','none')
        


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


        this.svg.select('.x.axis')
        .selectAll('line')
        .attr('y2','9')


        
        const yColor = ['#FFC36F', '#FFC84D', '#FFC240', '#FFAB34', '#FF9127',
        '#FF761B', '#FF5B13', '#FF4C0B', '#FF4A0B', '#FF3A06', '#FF0303']

        this.svg
        .append('g')
            .attr('class', 'y axis')
            .call(this.yAxis)
        .selectAll('text')
            .data(yColor)
            .style('fill', c => c)
            .style('font-size', '22px')
            .style('font-weight', 'bold')

        this.svg
        .select('.y.axis')
        .select('path')
            .style('display','none')
        
        
    }

    renderLegends() {

        const legend = d3.select(this.refs.container)
        .append("g")
            .attr('transform','translate(-550,70)')
            .attr("font-family", "sans-serif")
            .attr("font-size", 15)
            .attr("text-anchor", "end")
        .selectAll("g")
            .data(['price', 'taste', 'services', 'revisit'])
            .enter()
        .append("g")
            .attr("transform", function(d, i) { return "translate(" + i * 100 + ",0 )"; });

        legend.append("rect")
            .attr('class','legendsRect')
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", this.z);
      
        legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(function(d) { return d; });

    }

    renderOptions(){

        // const container = d3.select(this.refs.container)
        // .append('g')
        //     .attr('transform','translate(100,500)')
        // .append('foreignObject')
        //     .attr('width','200px')
        //     .attr('height','200px')
        // .append('xhtml:div')
        //     .attr('class','dropdown');

        // container.append('xhtml:button')
        //     .attr('class','btn btn-primary dropdown-toggle')
        //     .attr('id','dropdownMenuButton')
        //     .attr('type','button')
        //     .attr('data-toggle','dropdown')
        //     .html('Select mood')
        // .append('xhtml:span')
        //     .attr('class','caret')

        // container.append('xhtml:div')
        //     .attr('class','dropdown-menu')
        //     .attr('aria-labelledby','dropdownMenuButton')
        // .selectAll('option')
        //     .data(this.moodKeys)
        //     .enter()
        // .append('xhtml:a')
        //     .attr('class','dropdown-item')
        //     .html( d => d )                           // bootstrap dropdown

        var l=4;
        for(let i=0; i< this.moodKeys.length; i++){
            if( l < this.moodKeys[i].length ) l = this.moodKeys[i].length
        };
        l=l*10;
        var svg = d3.select(this.refs.container)
            .append("g")
                .attr("class","dropdown")
        
        let select = svg.append("g")
            .attr("class","select")
            .attr("transform", "translate(800, 55)");
        
            select.append("rect")
                .attr("x", 10)
	            .attr("y",  10 )
	            .attr("width", l + 70)
                .attr("height", 30)
                .attr('fill', 'white');
                
            select.append('rect')
                .attr('id', 'selectColor')
                .attr('x', 20)
                .attr('y', 20)
                .attr('width', 10)
                .attr('height', 10)
                .attr('fill', 'white')
            
            select.append("text")
                .attr("x", 40)
	            .attr("y",30 )
                .attr("id","mydropdown")
	            .text('select mood');
  
        var options = select.selectAll(".myBars")
            .data(this.moodKeys)
            .enter()
        .append("g")
	
        options.attr("class", "option").on("click", function() { 
            document.getElementById("selectColor").setAttribute('fill', this.getElementsByClassName("optionColor")[0].getAttribute('fill')); 
            document.getElementById("mydropdown").innerHTML = this.getElementsByTagName("text")[0].innerHTML;
            document.getElementById('mydropdown').setAttribute('x', '60');
            d3.event.stopPropagation();
        });

        options.append("rect").attr("x", 10)
            .attr("y", function(d,i){ 
                return 40 + i*30;
            })
            .attr("width", l + 70)
            .attr("height", 30)
            .attr('fill', 'white');

        options.append('rect')
            .attr('x', 20)
            .attr('y', function( d, i ){
                return 50 + i*30;
            })
            .attr('width', 10)
            .attr('height', 10)
            .attr('class', 'optionColor')
            .attr('fill', this.z)

        options.append("text")
            .attr("x", 40)
	        .attr("y", function(d,i){ 
                return 60 + i*30;
            })
	        .text(d => d);

   
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