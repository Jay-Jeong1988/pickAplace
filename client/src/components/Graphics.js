import React, { Component } from 'react';
import * as d3 from 'd3';
import { Restaurant } from '../lib/requests';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './style.css';

const margin = { top: 120, right: 55, bottom: 150, left: 85};
const width = 1275 - margin.left - margin.right;
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
                    recurrence: 0,
                    imgUrl: ''
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
                    recurrence: 0,
                    imgUrl: ''
                },{
                    name: 'idealio  ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    recurrence: 0,
                    imgUrl: ''
                },{
                    name: 'idealio   ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    recurrence: 0,
                    imgUrl: ''
                },{
                    name: 'idealio    ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    recurrence: 0,
                    imgUrl: ''
                },{
                    name: 'idealio     ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    recurrence: 0,
                    imgUrl: ''
                },{
                    name: 'idealio      ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    recurrence: 0,
                    imgUrl: ''
                },{
                    name: 'idealio       ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    recurrence: 0,
                    imgUrl: ''
                },{
                    name: 'idealio        ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    recurrence: 0,
                    imgUrl: ''
                },{
                    name: 'idealio         ',
                    price: 0,
                    cozy: 0,
                    luxury: 0,
                    taste: 0,
                    loud: 0,
                    modern: 0,
                    services: 0,
                    recurrence: 0,
                    imgUrl: ''
                },
            ]
        }
        
        
        this.x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.2).paddingOuter(0.2);
        this.x1 = d3.scaleBand().paddingInner(0.05);
        this.y = d3.scaleLinear().range([parseInt(height), 0]);
        this.z = d3.scaleOrdinal()
        .range([ "#0E89A4", "#DDFE8E", "#E00351", "#0552BC", "#8F2B6A", "#D9B021", "#EC5192", "#04DD50" ]);
        this.zz = d3.scaleOrdinal()
        .range([ "#0E89A4", "#DDFE8E", "#E00351", "#0552BC", "#8F2B6A", "#D9B021", "#EC5192", "#04DD50" ]);

        this.x0Axis = d3.axisBottom(this.x0).ticks(10);
        this.yAxis = d3.axisLeft(this.y).ticks(10);
        this.renderAxis = this.renderAxis.bind(this);
        this.renderBars = this.renderBars.bind(this);

        
    }
    
    componentDidMount() {
    
        this.svg = d3.select(this.refs.container)
        .attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr( "transform", "translate(" + margin.left + "," + margin.top + ")");
        
        
        this.moodKeys = ["cozy","luxury","loud","modern"];
        this.renderButton();
        this.renderLegends();
        this.renderDropdown();
    }
    

    
    componentDidUpdate(){
        this.removeAxis();
        this.renderAxis();

        this.removeBars();
        this.renderBars();

    }
    
    removeAxis = () => {
        this.svg.select('.x.axis').remove();
        this.svg.select('.y.axis').remove();
    }
    
    removeBars = () => {
        this.svg.selectAll('.bars').remove();
    }

    removeLegends = () => {
        this.svg.selectAll('.legends').remove();
    }


    
    renderBars() {
        let focusOn = true;

        function focusBar(d, i) {
            d3.event.target.style.filter = focusOn ? "none" : "brightness(200%)";
            focusOn = focusOn ? false : true;
        }
        // var glowOn = true;

        // function switchGlow(d, i) {
        //     d3.event.target.style.filter = glowOn ? "none" : "url(#glow)";
        //     glowOn = glowOn ? false : true;
        // }

        // d3.select('svg')
        // .append('filter')
        //     .attr('id', 'glow')
        // .append('feGaussianBlur')
        //     .attr('stdDeviation','4.0')
        //     .attr('result','coloredBlur')
        
        // d3.select('filter')
        // .append('feMerge')
        // .append('feMergeNode')
        //     .attr('in','coloredBlur')
        
        // d3.select('feMerge')
        // .append('feMergeNode')
        //     .attr('in','SourceGraphic')             //option for 'glow'
        

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
            .attr('id','testing')
            .attr('x', d => this.x1(d.key))
            .attr('y', height)
            .transition()
            .duration(1500)
            .attr('y', d => this.y(d.value) )
            .attr('width', this.x1.bandwidth() )
            .attr('height', d => height - this.y(d.value) )
            .attr('rx', this.x1.bandwidth()/ 2)
            .attr('ry',this.x1.bandwidth()/ 2)
            .attr('fill', d => this.z(d.key) )
            .attr('stroke', 'white')
            .attr('stroke-width', d => this.x1.bandwidth()/70 )


        // bars.append('rect')
        //     .attr('x', d => this.x1(d.key) )
        //     .attr('y', height)
        //     .transition()
        //     .duration(1500)
        //     .attr('y', d => this.y(d.value) )
        //     .attr('width', this.x1.bandwidth() )
        //     .attr('height', d => height - this.y(d.value) * 2 )
        //     .attr('fill', d => this.z(d.key) )
        //     .attr('stroke', 'white')
        //     .attr('stroke-width', d => this.x1.bandwidth()/70 )
        //     .attr('stroke-dasharray', d => `${this.x1.bandwidth() + height - this.y(d.value)}, ${this.x1.bandwidth()}` )
            // .style('filter','url(#glow)')
            // .style('opacity','0.6')
                
        
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
            .attr('transform','translate(-28, 20)')
        .append('xhtml:div')
            .style('width','60px')
            .style('height','40px')
            .style('background-image', d => `url(${d.imgUrl})`)
            .style('background-size','60px')
            .style('background-repeat', 'no-repeat')


        this.svg.select('.x.axis')
        .selectAll('.tick')
        .selectAll('text')
            .style("font-size", '25px')
            .attr('fill', '#635252')
            .attr("dy", "3.5em")


        function insertLineBreaks(d) {
            const el = d3.select(this);
            const words = d.split(' ');
            el.text('');
            for(let i = 0; i < words.length; i++){
                let tspan = el.append('tspan').text(words[i]).attr('fill','white');
                if( i > 0 ){
                    tspan.attr('x',0).attr('dy',15);
                }
            }
        }


        this.svg.select('.x.axis')
        .selectAll('line')
            .attr('stroke','white')
            .attr('stroke-width','2px')
            .attr('y2','9')  //lengthen ticks


        
        const yColor = ['#FFC36F', '#FFC84D', '#FFC240', '#FFAB34', '#FF9127',
        '#FF761B', '#FF5B13', '#FF4C0B', '#FF4A0B', '#FF3A06', '#FF0303']

        this.svg
        .append('g')
            .attr('class', 'y axis')
            .call(this.yAxis)
        .selectAll('text')
            .data(yColor)
            .attr('stroke', c => c)
            .attr('stroke-width','2px')
            .style('fill', 'white')
            .style('font-size', '30px')
            .style('font-weight', 'bold')

        this.svg
        .select('.y.axis')
        .select('path')
            .style('display','none')

        this.svg.select('.y.axis')
        .selectAll('line')
            .attr('stroke','white')
            .attr('stroke-width','2px')
        
        
    }

    renderLegends() {
        this.selected_options = [];

        const legend = d3.select(this.refs.container)
        .append("g")
            .attr('class','legends')
            .attr('transform','translate(1220,70)')
            .attr("font-family", "sans-serif")
            .attr("font-size", 15)
        .selectAll("g")
            .data(['price', 'taste', 'services', 'recurrence'])
            .enter()
        .append("g")
            .attr('id', d => d + '-graphic')
            .attr("transform", function(d, i) { return "translate(0 ," + i * 50 + ")" });
            
        legend.append("rect")
            .attr('class','legendsRect')
            .attr('id', d => d)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", this.z)
            .on('click', this.checkUncheck);
      
        legend.append("text")
            .attr("x", 30)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .attr('fill','white')
            .style('font-size','30px')
            .text( d => { 
                if(d === 'recurrence') return 'Revisit';
                else return `${d.charAt(0).toUpperCase() + d.slice(1)}`; 
            });
        
        
    }

    checkUncheck = () => {
        const rect_id = d3.event.target.id; 
        const thisLegend = d3.select(`#${rect_id}-graphic`);
            
        thisLegend.append('foreignObject')
            .attr('class','fObject')
            .attr('id',`${rect_id}-fObject`)
            .attr('width','22')
            .attr('height','27')
            .attr('y', -8)
        .append('xhtml:img')
            .attr('src','http://icon-park.com/imagefiles/check_sign_icon_gray.png')
            .attr('width', '22')
            .attr('height', '22')
            .style('filter', () => 'brightness(200%) invert(200%)')
            .on('click', () => {
                d3.event.target.remove();
                thisLegend.select('.fObject').remove();
                d3.select('#displayfObject').remove();

                this.selected_options.splice( this.selected_options.indexOf(rect_id), 1);
                console.log(`${rect_id} is removed!`);
            })

        this.selected_options.push(rect_id);
        console.log(`${rect_id} is selected!`);
    }

    renderButton(){
        
        const container = d3.select(this.refs.container)
        .append('g')
            .attr('transform','translate(1220,360)')
            .attr('class','submitButton')
        .append('foreignObject')   //foreign object must be given w&h to be rendered
            .attr('width','195px')
            .attr('height','45px')
        .append('xhtml:div')
            .attr('class','getList');
    
        container.append('xhtml:button')
            .attr('class','btn btn-success')
            .style('width','100%')
            .style('height','45px')
            .html('Show me the result!')
            .style('font-size','20px')
            .on('click', (d,i) => {
                if(!this.selected_options[0]) this.selected_options = ['empty'];
                Restaurant.request_ten(this.selected_options).then( data => {
                    if(data.errors) {
                        console.log(data.errors);
                        this.selected_options.shift();
                    }else { 
                        data.forEach( d => {
                            d.name = d.name.charAt(0).toUpperCase() + d.name.slice(1);
                        })
                        this.setState({
                            dummyData: data
                        })
                    }
                })
            });

    }
    renderDropdown(){

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
            .attr("transform", "translate(1220, 250)")
            .on("mouseover", (d, i) => options.attr('visibility', 'visible'))
            .on("mouseout", (d, i) => options.attr('visibility', 'hidden'));
        
        let displaySelect = select.append('g')
        .attr('id','displaySelect')

        displaySelect.append("rect")
            .attr('stoke','white')
            .attr('x', -8)
            .attr("y",  10 )
            .attr("width", l + 141)
            .attr("height", 40)
            .attr('fill', 'transparent');
            
        displaySelect.append('rect')
            .attr('id', 'selectColor')
            .attr('y', 20)
            .attr('width', 19)
            .attr('height', 19)
            .attr('fill', 'white')
        
        displaySelect.append("text")
            .attr("x", 30)
            .attr("y",38 )
            .style('font-size','28px')
            .attr("id","mydropdown")
            .attr('fill','white')
            .text('Select mood')
  
        var options = select.selectAll(".myBars")
            .data(["cozy","luxury","loud","modern"])
            .enter()
        .append("g")
            .attr('id', d => d + '-graphic')
            .attr('visibility', 'hidden');
        

        options.append("rect")
            .attr('x', -209)
            .attr("y", function(d,i){ 
                return 10 + i*40;
            })
            .attr("width", l + 141)
            .attr("height", 40)
            .attr('fill', '#847FC3')
            
            this.previousElement = null;
            this.previousElementId = '';
            this.newArray = [];
            
            options.append('rect')
                .attr('x', -201)
                .attr('id',d => d)
                .attr('y', function( d, i ){
                    return 19 + i*40;
                })
                .attr('width', 19)
                .attr('height', 19)
                .attr('class', 'optionColor')
                .attr('fill', this.z)
                .on('click', (d, i) => {
                    select.select('#selectColor')
                    .attr('fill', `${d3.event.target.getAttribute('fill')}`);
                    select.select("#mydropdown")
                    .text(`${d3.event.target.nextSibling.innerHTML}`);
                    
                    select.select("#displaySelect")
                    .append('foreignObject')
                        .attr('id','displayfObject')
                        .attr('width','22')
                        .attr('height','27')
                        .attr('y', 10)
                    .append('xhtml:img')
                        .attr('src','http://icon-park.com/imagefiles/check_sign_icon_gray.png')
                        .attr('width', '22')
                        .attr('height', '22')
                        .style('filter', () => 'brightness(200%) invert(200%)')
                        
                
                
                    this.checkUncheck();
                    // When a box is checked...
                    if(options.select(`#${d3.event.target.id}-fObject`)) {
                        options.select(`#${d3.event.target.id}-fObject`)
                        .attr('x', d3.event.target.getAttribute('x'))
                        .attr('y', d3.event.target.getAttribute('y')-8)
                    }


                    this.newArray.push(d3.event.target);

                    if( this.newArray.length <= 1) {
                        this.previousElement = d3.event.target;
                        this.previousElementId = d3.event.target.id;
                    }else {
                        const prevRectSelection = options.select(`#${this.previousElementId}`)._groups[0];
                        const prevRectIndex = prevRectSelection.indexOf(this.previousElement);
                        const prevRect = prevRectSelection[prevRectIndex];
                        this.newArray.shift();

                        if( d3.event.target !== prevRect ){
                            options.select(`#${this.previousElementId}-fObject`).remove();
                            this.selected_options.splice( this.selected_options.indexOf(this.previousElementId), 1);
                            console.log(`${this.previousElementId} is removed!`);
                            console.log(this.selected_options)
                        }
                        this.previousElement = d3.event.target;
                        this.previousElementId = d3.event.target.id;
                    }


                });

            

        options.append("text")
            .style('font-size','28px')
            .style('fill','white')
            .attr("x", -171)
	        .attr("y", function(d,i){ 
                return 37 + i*40;
            })
            .text(d => d.charAt(0).toUpperCase() + d.slice(1) )
            .on('click', (d, i) => {
                select.select('#selectColor')
                    .attr('fill', `${d3.event.target.parentNode.childNodes[1].getAttribute('fill')}`);
                select.select("#mydropdown")
                    .text(`${d3.event.target.innerHTML}`);
            });
        }

    render() {

        return (
            <main >
                <div className="svg-background"></div>
                <svg ref="container" style={{filter: 'contrast(150%)'}}></svg>

            </main>
        )
    }
}

export default Graphics;



