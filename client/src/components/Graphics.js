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
                    recurrence: 0,
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
                    recurrence: 0,
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
                    recurrence: 0,
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
                    recurrence: 0,
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
                    recurrence: 0,
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
                    recurrence: 0,
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
                    recurrence: 0,
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
                    recurrence: 0,
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
                    recurrence: 0,
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
                    recurrence: 0,
                    imgUrl: '/assets/images/idealio.png'
                },
            ]
        }
        
        
        this.x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.2).paddingOuter(0.2);
        this.x1 = d3.scaleBand().paddingInner(0.05);
        this.y = d3.scaleLinear().range([parseInt(height), 0]);
        this.z = d3.scaleOrdinal()
        .range([ "#4E9397", "#E1714F", "#D8384F", "#194B8D", "#AA528A", "#F3DA7B", "#FFA4CC", "#A3DDE3"  ]);
        this.zz = d3.scaleOrdinal()
        .range([ "#8F2B6A", "#1E7075", "#D3451A", "#D9B021", "#C8041F", "#042757", "#EC5192", "#5AC2CE" ]);

        this.x0Axis = d3.axisBottom(this.x0).ticks(10);
        this.yAxis = d3.axisLeft(this.y).ticks(10);
        this.renderAxis = this.renderAxis.bind(this);
        this.renderBars = this.renderBars.bind(this);

        
    }
    
    componentDidMount() {
        
        d3.select(this.refs.container)
        .append('defs')
        .append('pattern')
        .attr('id','img1')
        .attr('patternUnits','userSpaceOnUse') 
        .attr('width','100%')
        .attr('height','700')
        .append('xhtml:image')
        .attr('xlink:href','https://previews.123rf.com/images/hilmawan/hilmawan1803/hilmawan180300088/97196617-red-brick-wall-background-lot-of-gradation-and-color-horizontal-alignment.jpg')
        .attr('x','0')
        .attr('y','0')
        .attr('width','100%')
        .attr('height','700')

        
        this.svg = d3.select(this.refs.container)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr('fill','url(#img1)')
        .attr( "transform", "translate(" + margin.left + "," + margin.top + ")");
        
        
        this.moodKeys = ["cozy","luxury","loud","modern"];
        this.renderButton();
        this.renderDropdown();
        this.renderLegends();
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
            .attr('x', d => this.x1(d.key))
            .attr('y', height)
            .transition()
            .duration(1500)
            .attr('y', d => this.y(d.value) )
            .attr('width', this.x1.bandwidth() )
            .attr('height', d => height - this.y(d.value) )
            .attr('fill', d => this.zz(d.key) )
            .attr('stroke', d => this.zz(d.key))
            .attr('stroke-width', d => this.x1.bandwidth()/70 )
            .attr('stroke-dasharray', d => `${this.x1.bandwidth() + height - this.y(d.value)}, ${this.x1.bandwidth()}` );

            
            // bars.append('rect')
            // .on('click', (d,i) => {

            // })
            //     .attr('x', d => this.x1(d.key) )
            //     .attr('y', height)
            //     .transition()
            //     .duration(1500)
            //     .attr('y', d => this.y(d.value) )
            //     .attr('width', this.x1.bandwidth() )
            //     .attr('height', d => height - this.y(d.value) )
            //     .attr('fill', d => this.z(d.key) )
            //     .attr('stroke', d => this.zz(d.key))
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
            .style('font-weight','bold')
            .style("font-size", '15px')
            .attr('fill', '#635252')
            .attr("dy", "4.5em")


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
        .attr('y2','9')  //lengthen ticks


        
        const yColor = ['#FFC36F', '#FFC84D', '#FFC240', '#FFAB34', '#FF9127',
        '#FF761B', '#FF5B13', '#FF4C0B', '#FF4A0B', '#FF3A06', '#FF0303']

        this.svg
        .append('g')
            .attr('class', 'y axis')
            .call(this.yAxis)
        .selectAll('text')
            .data(yColor)
            .attr('stroke','white')
            .attr('stroke-width','0.3px')
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
            .attr('class','legends')
            .attr('transform','translate(380,70)')
            .attr("font-family", "sans-serif")
            .attr("font-size", 15)
        .selectAll("g")
            .data(['price', 'taste', 'services', 'recurrence'])
            .enter()
        .append("g")
            .attr('id', d => d + '-graphic')
            .attr("transform", function(d, i) { return "translate(" + i * 100 + ",0 )"; });
            
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
            .text(function(d) { 
                if(d === 'recurrence') return 'revisit';
                else return d; 
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
                    this.selected_options.splice( this.selected_options.indexOf(rect_id), 1);
                    console.log(`${rect_id} is removed!`);
                })

            this.selected_options.push(rect_id);
            console.log(`${rect_id} is selected!`);
    }

    renderButton(){
        
        const container = d3.select(this.refs.container)
        .append('g')
            .attr('transform','translate(980,60)')
            .attr('class','submitButton')
        .append('foreignObject')   //foreign object must be given w&h to be rendered
            .attr('width','200px')
            .attr('height','200px')
        .append('xhtml:div')
            .attr('class','getList');
    
        container.append('xhtml:button')
            .attr('class','btn btn-success')
            .html('Show me the result!')
            .on('click', (d,i) => {
                if(!this.selected_options[0]) this.selected_options = ['empty'];
                Restaurant.request_ten(this.selected_options).then( data => {
                    if(data.errors) {
                        console.log(data.errors);
                        this.selected_options.shift();
                    }else { 
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
            .attr("transform", "translate(800, 55)")
            .on("mouseover", (d, i) => options.attr('visibility', 'visible'))
            .on("mouseout", (d, i) => options.attr('visibility', 'hidden'));
        
            select.append("rect")

	            .attr("y",  10 )
	            .attr("width", l + 70)
                .attr("height", 30)
                .attr('fill', 'white');
                
            select.append('rect')
                .attr('id', 'selectColor')
                .attr('x', 7)
                .attr('y', 16)
                .attr('width', 19)
                .attr('height', 19)
                .attr('fill', 'white')
            
            select.append("text")
                .attr("x", 34)
	            .attr("y",30 )
                .attr("id","mydropdown")
	            .text('select mood');
  
        var options = select.selectAll(".myBars")
            .data(["cozy","luxury","loud","modern"])
            .enter()
        .append("g")
            .attr('id', d => d + '-graphic')
            .attr('visibility', 'hidden');
        

        options.append("rect")
            .attr("y", function(d,i){ 
                return 40 + i*30;
            })
            .attr("width", l + 70)
            .attr("height", 30)
            .attr('fill', 'white')
            
            this.previousElement = null;
            this.previousElementId = '';
            this.newArray = [];
            
            options.append('rect')
            .attr('id',d => d)
            .attr('x', 7)
            .attr('y', function( d, i ){
                return 46 + i*30;
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

                    this.previousElementId = d3.event.target.id;
                }


            });

            

        options.append("text")
            .attr("x", 34)
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
                <div className="svg-background"></div>
                <svg ref="container">
                    <defs>
                        <pattern id="svgbg" patternUnits="userSpaceOnUse" width="100%" height="700">
                            <image href="http://pluspng.com/img-png/brick-hd-png-brick-wallpaper-red-awesome-1920.jpg"
                            width="100%" height="700" x="0" y="0"/>
                        </pattern>
                    </defs>
                </svg>

            </main>
        )
    }
}

export default Graphics;



