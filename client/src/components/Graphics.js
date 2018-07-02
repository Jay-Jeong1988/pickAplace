import React, { Component } from 'react';
import * as d3 from 'd3';
import { Restaurant } from '../lib/requests';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './style.css';

const margin = { top: 120, right: 55, bottom: 150, left: 180};
const width = 1250 - margin.left - margin.right;
const height = 850 - margin.top - margin.bottom;


class Graphics extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            dummyData: [
                {
                    name: 'idealio',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    revisit: 0,
                    imgUrl: '/assets/images/idealio.png'
                },
                {
                    name: 'idealio ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    revisit: 0,
                    imgUrl: '/assets/images/idealio.png'
                },{
                    name: 'idealio  ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    revisit: 0,
                    imgUrl: '/assets/images/idealio.png'
                },{
                    name: 'idealio   ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    revisit: 0,
                    imgUrl: '/assets/images/idealio.png'
                },{
                    name: 'idealio    ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    revisit: 0,
                    imgUrl: '/assets/images/idealio.png'
                },{
                    name: 'idealio     ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    revisit: 0,
                    imgUrl: '/assets/images/idealio.png'
                },{
                    name: 'idealio      ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    revisit: 0,
                    imgUrl: '/assets/images/idealio.png'
                },{
                    name: 'idealio       ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    revisit: 0,
                    imgUrl: '/assets/images/idealio.png'
                },{
                    name: 'idealio        ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    revisit: 0,
                    imgUrl: '/assets/images/idealio.png'
                },{
                    name: 'idealio         ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    revisit: 0,
                    imgUrl: '/assets/images/idealio.png'
                },
            ]
        }
        
        
        this.x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.2).paddingOuter(0.2);
        this.x1 = d3.scaleBand().paddingInner(0.05);
        this.y = d3.scaleLinear().range([parseInt(height), 0]);
        this.z = d3.scaleOrdinal()
        .range([ "#AA528A", "#4E9397", "#E1714F", "#F3DA7B", "#D8384F" , "#194B8D", "#FFA4CC", "#A3DDE3"  ]);
        this.zz = d3.scaleOrdinal()
        .range([ "#BA96AD", "#B2CCCD", "#F4A790", "#FBECB6", "#E37B89", "#5288D3", "#FFD7E8", "#D9F3F6"]);
        
        this.x0Axis = d3.axisBottom(this.x0).ticks(10);
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
        
        
        this.moodKeys = ["cozy","luxury","loud","modern"];
        
    }
    

    
    componentDidUpdate(){
        this.removeAxis();
        this.renderAxis();

        this.removeBars();
        this.renderBars();

        this.renderLegends();
        this.renderOptions();
    }
    
    removeAxis = () => {
        this.svg.select('.x.axis').remove();
        this.svg.select('.y.axis').remove();
    }
    
    removeBars = () => {
        this.svg.selectAll('.bars')
        .remove();
    }
    
    renderBars() {
        // var glowOn = true;

        // function switchGlow(d, i) {
        //     d3.event.target.style.filter = glowOn ? "none" : "url(#glow)";
        //     glowOn = glowOn ? false : true;
        // }
    
        d3.select('svg')
        .append('filter')
            .attr('id', 'glow')
        .append('feGaussianBlur')
            .attr('stdDeviation','5.0')
            .attr('result','coloredBlur')
        
        d3.select('filter')
        .append('feMerge')
        .append('feMergeNode')
            .attr('in','coloredBlur')
        
        d3.select('feMerge')
        .append('feMergeNode')
            .attr('in','SourceGraphic')             //option for 'glow'
        

        this.keys = Object.keys(this.state.dummyData[0]);
        this.keysWithNumVal = this.keys.slice(1, this.keys.length - 1);
        
        const bars = this.svg.append('g')
        .attr('class','bars')
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
            .enter();
        
        bars.append('rect')
            .attr('y', height)
            .transition()
            .duration(1500)
            .attr('x', d => this.x1(d.key) )
            .attr('y', d => this.y(d.value) )
            .attr('width', this.x1.bandwidth() )
            .attr('height', d => height - this.y(d.value) )
            .attr('fill', d => this.z(d.key) )
            .attr('stroke', d => this.z(d.key))
            .attr('stroke-width', d => this.x1.bandwidth()/15 )
            .attr('stroke-dasharray', d => `${this.x1.bandwidth() + height - this.y(d.value)}, ${this.x1.bandwidth()}` )

        bars.append('rect')
            .attr('y', height)
            .transition()
            .duration(1500)
            .attr('x', d => this.x1(d.key) )
            .attr('y', d => this.y(d.value) )
            .attr('width', this.x1.bandwidth() )
            .attr('height', d => height - this.y(d.value) )
            .attr('fill', d => this.z(d.key) )
            .attr('stroke', d => this.z(d.key))
            .attr('stroke-width', d => this.x1.bandwidth()/15 )
            .attr('stroke-dasharray', d => `${this.x1.bandwidth() + height - this.y(d.value)}, ${this.x1.bandwidth()}` )
            .style('filter','url(#glow)')
            .style('opacity','0.3')
                
        
    }

    
    renderAxis() {
        
        this.keys = Object.keys(this.state.dummyData[0]);
        this.keysWithNumVal = this.keys.slice(1, this.keys.length - 1);

        this.x0.domain(this.state.dummyData.map( d => d.name ));
        this.x1.domain(this.keysWithNumVal).rangeRound([0, this.x0.bandwidth()])
        this.y.domain([0, 100]);
        
        this.svg
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate( 0 , ${height})`)
        .call(this.x0Axis)
        .selectAll('.tick text')
        .each(insertLineBreaks)
        
        this.svg
        .select('.x.axis')
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


        function insertLineBreaks(d) {
            const el = d3.select(this);
            const words = d.split(' ');
            el.text('');
            for(let i = 0; i < words.length; i++){
                let tspan = el.append('tspan').text(words[i]);
                if( i > 0 ){
                    tspan.attr('x',0).attr('dy',15);
                }
            }
        }


        this.svg.select('.x.axis')
        .selectAll('line')
        .attr('y2','9')  //lengthen ticks


        
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
        this.selected_options = [];

        const legend = d3.select(this.refs.container)
        .append("g")
            .attr('transform','translate(-550,70)')
            .attr("font-family", "sans-serif")
            .attr("font-size", 15)
        .selectAll("g")
            .data(['price', 'taste', 'services', 'revisit'])
            .enter()
        .append("g")
            .attr("transform", function(d, i) { return "translate(" + i * 100 + ",0 )"; });

        legend.append("rect")
            .attr('class','legendsRect')
            .attr('id', d => d)
            .attr("x", width - 80)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", this.z)
            .on('click', (d,i) => {
                this.selected_options.push(d3.event.target.id);
            });
      
        legend.append("text")
                .attr("x", width - 50)
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(function(d) { return d; });

    }

    renderOptions(){

        const container = d3.select(this.refs.container)
        .append('g')
            .attr('transform','translate(980,60)')
        .append('foreignObject')   //foreign object must be given w&h to be rendered
            .attr('width','200px')
            .attr('height','200px')
        .append('xhtml:div')
            .attr('class','getList');

        container.append('xhtml:button')
            .attr('class','btn btn-success')
            .html('Show me the result!')
            .on('click', (d,i) => {
                Restaurant.request_ten(this.selected_options).then( data => {
                    this.setState({
                        dummyData: data
                    })   
                    console.log(data);
                })
            });
            
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

        var dropdown = d3.select(this.refs.container)
            .append("g")
                .attr("class","dropdown")
        
        let select = dropdown.append("g")
            .attr("class","select")
            .attr("transform", "translate(800, 55)")
            .on("mouseover", (d, i) => options.attr('visibility', 'visible'))
            .on("mouseout", (d, i) => options.attr('visibility', 'hidden'));
        
            select.append("rect")
                .attr("x", 10)
	            .attr("y",  10 )
	            .attr("width", l + 70)
                .attr("height", 30)
                .attr('fill', 'white');
                
            select.append('rect')
                .attr('id', 'selectColor')
                .attr('x', 17)
                .attr('y', 17)
                .attr('width', 15)
                .attr('height', 15)
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
            .attr('visibility', 'hidden');
        

        options.append("rect").attr("x", 10)
            .attr("y", function(d,i){ 
                return 40 + i*30;
            })
            .attr("width", l + 70)
            .attr("height", 30)
            .attr('fill', 'white')

            

        options.append('rect')
            .attr('x', 17)
            .attr('y', function( d, i ){
                return 48 + i*30;
            })
            .attr('width', 15)
            .attr('height', 15)
            .attr('class', 'optionColor')
            .attr('fill', this.z)
            .on('click', (d, i) => {
                select.select('#selectColor')
                    .attr('fill', `${d3.event.target.getAttribute('fill')}`);
                select.select("#mydropdown")
                    .text(`${d3.event.target.nextSibling.innerHTML}`);
            });
            

        options.append("text")
            .attr("x", 40)
	        .attr("y", function(d,i){ 
                return 60 + i*30;
            })
            .text(d => d)
            .on('click', (d, i) => {
                select.select('#selectColor')
                    .attr('fill', `${d3.event.target.parentNode.childNodes[1].getAttribute('fill')}`);
                select.select("#mydropdown")
                    .text(`${d3.event.target.innerHTML}`);
            });
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



