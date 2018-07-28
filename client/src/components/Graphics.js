import React, { Component } from 'react';
import * as d3 from 'd3';
import { Restaurant } from '../lib/requests';
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
                    imgUrl: '',
                    count: 0
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
                    imgUrl: '',
                    count: 0
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
                    imgUrl: '',
                    count: 0
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
                    imgUrl: '',
                    count: 0
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
                    imgUrl: '',
                    count: 0
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
                    imgUrl: '',
                    count: 0
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
                    imgUrl: '',
                    count: 0
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
                    imgUrl: '',
                    count: 0
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
                    imgUrl: '',
                    count: 0
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
                    imgUrl: '',
                    count: 0
                },
            ]
        }
        
        
        this.x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.2).paddingOuter(0.2);
        this.x1 = d3.scaleBand().paddingInner(0.05);
        this.y = d3.scaleLinear().range([parseInt(height, 10), 0]);
        this.z = d3.scaleOrdinal()
        .range([ "#0E89A4", "#DDFE8E", "#E00351", "#0552BC", "#8F2B6A", "#D9B021", "#EC5192", "#04DD50" ]);
        this.zz = d3.scaleOrdinal()
        .range(["#FF6C36","#60FFAA","#000062","#00FFDC","#FFDA06","#001EFF","#00DC5A","#FF00DE"]);

        this.x0Axis = d3.axisBottom(this.x0).ticks(10);
        this.yAxis = d3.axisLeft(this.y).ticks(10);
        this.renderAxis = this.renderAxis.bind(this);
        this.renderBars = this.renderBars.bind(this);

        
    }
    
    componentDidMount() {
        
        this.svg = d3.select(this.refs.container)
        .attr('viewBox','0 0 1500 1500')
        // .attr("width", "100%")
        // .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr( "transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr('id','barChart');
        
        
        this.moodKeys = ["cozy","luxury","loud","modern"];
        this.renderLegends();
        this.renderDropdown();
        this.renderButton();
        this.renderMeasureLines();
        this.renderAxis();
    }
    
    
    
    componentDidUpdate(){

        this.removeMeasureLines();
        this.renderMeasureLines();
        
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
        this.svg.select('#lg1').remove();
    }
    
    removeLegends = () => {
        this.svg.selectAll('.legends').remove();
    }
    
    removeMeasureLines = () => {
        this.svg.selectAll('.measureLines').remove();
    }


    renderMeasureLines() {

        const measureLines = this.svg.append('g')
            .attr('class','measureLines')
        .selectAll('g')
            .data(['M10,0h1100','M10,175h1100','M10,349h1100', 'M10,580h1100'])
            .enter()
        .append('g')
            .attr('stroke','rgba(20,20,20,0.5)')
            .attr('stroke-width','0.7')
        
        measureLines.append('path')
            .attr('class','animate-path')
            .attr('d', d => d)
    }

    renderBars() {
  
        d3.select('svg')
        .append('defs')
        .append('style')
            .attr('type','text/css')
            .html(`@media screen and (max-width: 400px) { 
                #barChart{ 
                    transform: translate(${margin.left + 100}px, 600px);
                 }
                .legends {
                    transform: translate( 200px, 300px )
                }
                #taste-graphic {
                    transform: translate( 180px, 0 )
                }
                #services-graphic {
                    transform: translate( 360px, 0 )
                }
                #recurrence-graphic {
                    transform: translate( 540px, 0 )
                }
                .legends .legendsRect {
                    width: 50px;
                    height: 50px;
                }
                .select {
                    transform: translate( 1100px, 300px )
                }
                .submitButton {
                    transform: translate( 1220px, 450px )
                }
            }`);


//////////////////////////////////////////////////////////////////
        d3.select('svg')
        .append('defs')
        .selectAll('linearGradient')
            .data(['red','orange','yellow','seagreen', 'limegreen', 'lightgreen', 'springgreen'])
            .enter()
        .append('linearGradient')
            .attr('id', d => `lg-${d}`)
            .attr('x1','0%')
            .attr('y1','50%')
            .attr('x2','0%')
            .attr('y2','0%')
        .append('stop')
            .attr('offset','0%')
            .attr('stop-color', d => d)
            .attr('stop-opacity','1')

        d3.selectAll('defs linearGradient')
        .append('stop')
            .attr('offset','100%')
            .attr('stop-color', 'rgba(255,255,255)')
            .attr('stop-opacity', '1')

//////////////////////////////////////////////////////////////'radial Gradient'

        // const rect_offset = d3.select('svg')
        // .append('defs')
        // .append('filter')
        //     .attr('id','f1')
        //     .attr('x', '0')
        //     .attr('y', '0')
        //     .attr('width', '300%')
        //     .attr('height', '300%')

        // rect_offset
        // .append('feOffset')
        //     .attr('result', 'offOut')
        //     .attr('in', 'SourceGraphic')
        //     .attr('dx','30')
        //     .attr('dy','30')

        // rect_offset
        // .append('feBlend')
        //     .attr('in','SourceGraphic')
        //     .attr('in2','offOut')
        //     .attr('mode','normal')
        ///////////////////////////////feoffset
        
        

        
        
        const bars = this.svg.append('g')
        .attr('class','bars')
        .selectAll('g')
        .data(this.state.dummyData)
        .enter()
        

        bars.append('g')
            .attr('id', d => {
                let newName = '';
                if( d.name.includes('\'') || d.name.split(" ")[1] ){
                    newName = d.name.split('\'').join('').split(' ').join('_');
                }else {
                    newName = d.name;
                }
                    return `bar-container-${replaceSpecialChars(newName)}`;
            })
            .attr('transform', d => { 
                return 'translate(' + this.x0(d.name) + ', 0)';
            })
        .selectAll('rect')
            .data( d => { 
                return this.keysWithNumVal.map( function(key){ return { key: key, value: d[key] }; }); })
            .enter()
        .append('rect')
            .on('mouseover', d => {
                const barId = d3.event.target.parentNode.getAttribute('id');
                const restaurant_name = barId.split('-')[barId.split('-').length - 1];

                // d3.event.target.style.fill = `url(#glow-${d.key})`;
                d3.event.target.style.fill = this.zz(d.key)

                d3.select(`#tooltip-container-${replaceSpecialChars(restaurant_name)}_${d.key}`)
                    .attr('visibility','visible')
            })
            .on('mouseout', d => {
                const barId = d3.event.target.parentNode.getAttribute('id');
                const restaurant_name = barId.split('-')[barId.split('-').length - 1];

                d3.event.target.style.fill = this.z(d.key)
            
                d3.select(`#tooltip-container-${replaceSpecialChars(restaurant_name)}_${d.key}`)
                    .attr('visibility','hidden')
            })
            .attr('class','animate-bars-stroke')
            .attr('x', d => this.x1(d.key))
            .attr('y', height)
            .transition()
            .duration(1500)
            .attr('y', d => this.y(d.value) )
            .attr('width', this.x1.bandwidth() )
            .attr('height', d => height - this.y(d.value) )
            .attr('rx', this.x1.bandwidth()* Math.pow(0.87, 5))
            .attr('ry',this.x1.bandwidth()* Math.pow(0.87, 5))
            .attr('fill', d => this.z(d.key) )
            .attr('stroke', 'white')
            .attr('stroke-width', d => this.x1.bandwidth()/70 )


        const tooltip = bars.append('g')
            .attr('id', d => {
                let newName = '';
                if( d.name.includes('\'') || d.name.split(" ")[1] ){
                    newName = d.name.split('\'').join('').split(' ').join('_');
                }else {
                    newName = d.name;
                }
                    return `tooltip-container-${replaceSpecialChars(newName)}`;
            })
            .attr('transform', d => { 
                return `translate(${this.x0(d.name)}, 0)`;
            })
            .attr('visibility','hidden')
            .attr('stroke','white')
            .attr('fill','rgba(0,0,0,0.7)')
        .selectAll('g')
            .data( d => { 
                return this.keysWithNumVal.map( function(key){ return { key: key, value: d[key] }; }); })
            .enter()
        .append('g')
            .attr('id', function(d) {
                return `${this.parentNode.id}_${d.key}`;
            })
            .attr('transform', d => 'translate(' + this.x1(d.key) +',' + (this.y(d.value) + -100) + ')')

        function replaceSpecialChars( str ){
            let temp = '';
                for(let char of str){
                    temp += char.replace(/[^\w\s\-]/gi, '_');
            }
            return temp;
        }

        tooltip.append('path')
            .attr('class','animate-tips-stroke')
            .attr('id', function(d) {
                return `tooltip-${this.parentNode.id.split('-')[this.parentNode.id.split('-').length - 1]}`;
            })
            

        tooltip.append('text')
            .style('font-size','15px')
            .style('font-weight','lighter')
            .attr('y', '15')
            .attr('fill','white')
            .attr('x', 0)
        .text( function(d) {
            const name = this.parentNode.parentNode.id.split('-')[this.parentNode.parentNode.id.split('-').length - 1];
            let Lv = '';
            switch( d.key ) {
                case 'price': 
                    if(d.value > 95) Lv = "is almost free";
                    else if(d.value > 86) Lv = "is very cheap";
                    else if(d.value > 65) Lv = "is cheap";
                    else if(d.value >= 50) Lv = "is fair";
                    else if(d.value > 37) Lv = "is little pricy";
                    else if(d.value > 20) Lv = "is pricy";
                    else if(d.value > 0) Lv = "is very pricy";
                    break;
                
                case 'taste':
                    if(d.value > 95) Lv = "serves unbelievable foods";
                    else if(d.value > 86) Lv = "serves very delicious foods";
                    else if(d.value > 65) Lv = "serves tasty foods";
                    else if(d.value >= 50) Lv = "serves fair foods";
                    else if(d.value > 37) Lv = "serves not bad foods";
                    else if(d.value > 20) Lv = "serves not good foods";
                    else if(d.value > 0) Lv = "serves awful foods";
                    break;

                case 'services':
                    if(d.value > 95) Lv = "has the best services ever";
                    else if(d.value > 86) Lv = "has very nice services";
                    else if(d.value > 65) Lv = "has good sevices";
                    else if(d.value >= 50) Lv = "has fair services";
                    else if(d.value > 37) Lv = "does not have good sevices";
                    else if(d.value > 20) Lv = "has definitely not good services";
                    else if(d.value > 0) Lv = "has awful services";
                    break;
                
                case 'recurrence':
                    d.key = 'revisit';
                    if(d.value > 95) Lv = "is my favorite place";
                    else if(d.value > 86) Lv = "Definitely revisiting";
                    else if(d.value > 65) Lv = "I am going to visit again";
                    else if(d.value >= 50) Lv = "I'm not sure revisiting";
                    else if(d.value > 37) Lv = "Maybe I'll visit again";
                    else if(d.value > 20) Lv = "Probably not visiting again";
                    else if(d.value > 0) Lv = "Not visiting there again";
                    break; 

                case 'cozy':
                    if(d.value > 95) Lv = "is like my second home";
                    else if(d.value > 86) Lv = "is very cozy";
                    else if(d.value > 65) Lv = "is cozy";
                    else if(d.value >= 50) Lv = "is so so comfortable";
                    else if(d.value > 37) Lv = "is not really cozy";
                    else if(d.value > 20) Lv = "is uncomfortable";
                    else if(d.value > 0) Lv = "is very uncomfortable";
                    break; 

                case 'luxury': //sanitation
                    d.key = 'sanitation';
                    if(d.value > 95) Lv = "is like a white room";
                    else if(d.value > 86) Lv = "is very clean";
                    else if(d.value > 65) Lv = "is clean";
                    else if(d.value >= 50) Lv = "is normal";
                    else if(d.value > 37) Lv = "is not so clean";
                    else if(d.value > 20) Lv = "needs to be cleaned";
                    else if(d.value > 0) Lv = "is very unsanitary";
                    break; 

                case 'modern':
                    if(d.value > 95) Lv = "is in the future";
                    else if(d.value > 86) Lv = "is very fancy";
                    else if(d.value > 65) Lv = "is fancy";
                    else if(d.value >= 50) Lv = "is ordinary";
                    else if(d.value > 37) Lv = "is classic";
                    else if(d.value > 20) Lv = "is old";
                    else if(d.value > 0) Lv = "is in the Middle Ages";
                    break; 

                case 'loud':
                    if(d.value > 95) Lv = "is heavy metal concert";
                    else if(d.value > 86) Lv = "is very loud";
                    else if(d.value > 65) Lv = "is loud";
                    else if(d.value >= 50) Lv = "is normal";
                    else if(d.value > 37) Lv = "is quiet";
                    else if(d.value > 20) Lv = "is peaceful";
                    else if(d.value > 0) Lv = "is silent";
                    break; 
                
                default:

            }
            return `${name}-${d.key}:${d.value}%-This place -'${Lv}'`;
        });
        
        tooltip.selectAll('text').each(insertLineBreaks);

        tooltip.selectAll('text tspan:first-of-type')
            .attr('dx', 9)
            .attr('fill','white')
            .attr('stroke', function(d){
                if(d.value > 95) return `url(#lg-springgreen)`;
                else if(d.value > 86) return `url(#lg-lightwgreen)`;
                else if(d.value > 65) return `url(#lg-limegreen)`;
                else if(d.value >= 50) return `url(#lg-seagreen)`;
                else if(d.value > 37) return `url(#lg-yellow)`;
                else if(d.value > 20) return `url(#lg-orange)`;
                else if(d.value > 0) return `url(#lg-red)`;
            });

        tooltip.selectAll('text tspan:not(:first-child)')
            .attr('x', 9)
            .attr('fill','white')
            .attr('dy','18')
            .attr('stroke', function(d){
                if(d.value > 95) return `url(#lg-springgreen)`;
                else if(d.value > 86) return `url(#lg-lightgreen)`;
                else if(d.value > 65) return `url(#lg-limegreen)`;
                else if(d.value >= 50) return `url(#lg-seagreen)`;
                else if(d.value > 37) return `url(#lg-yellow)`;
                else if(d.value > 20) return `url(#lg-orange)`;
                else if(d.value > 0) return `url(#lg-red)`;
            });
        

        function insertLineBreaks(d) {
            const el = d3.select(this);
            const text = el.text();
            const words = text.split('-');
            el.text('');
            for(let i=0; i < words.length; i++){
                el.append('tspan').text(words[i]).attr('fill','rgb(40,40,40)');
            }
        }

        tooltip.selectAll('path')
            .attr('d', function(d){
                const tspans = this.nextSibling.querySelectorAll('tspan');
                let longestWordLength = 0;
                for(let tspan of tspans){
                    const wordLength = tspan.innerHTML.length;
                    if( wordLength >= longestWordLength ) longestWordLength = wordLength;
                }
                return `m0,0h${((longestWordLength * 7) + 5)}v80h${ - (longestWordLength * 7 * 3/5)}l-8,17l2,-17h${ - (longestWordLength * 7  * 2/5 - 1)} v-80`;
            })
        
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
            
/*                                         double rect for more effects(if needed)   */
                
        
    }

    
    renderAxis() {
        this.keys = Object.keys(this.state.dummyData[0]);
        this.keysWithNumVal = this.keys.slice(1, this.keys.length - 2);

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
            .style("font-size", '15px')
            .style('font-family', 'tahoma')
            .style('font-weight', 200)
            .attr('stroke','#396392')
            .attr('stroke-width', '0.2')
            .attr('fill', '#635252')
            .attr("dy", "3.5em")


        function insertLineBreaks(d) {
            const el = d3.select(this);
            const words = d.split(' ');
            el.text('');
            for(let i = 0; i < words.length; i++){
                let tspan = el.append('tspan').text(words[i]).attr('fill','rgb(30,30,30)');
                if( i > 0 ){
                    tspan.attr('x',0).attr('dy',20);
                }
            }
        }


        this.svg.select('.x.axis')
        .selectAll('line')
            .attr('stroke','rgb(20,20,20)')
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
            .style('fill', 'rgba(30,30,30,0.2)')
            .style('font-size', '30px')
            .style('font-weight', 'bold')

        this.svg
        .select('.y.axis')
        .select('path')
            .style('display','none')

        this.svg.select('.y.axis')
        .selectAll('line')
            .attr('stroke','rgb(20,20,20)')
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
            .attr('fill','rgb(30,30,30)')
            .style('font-size','30px')
            .text( d => { 
                if(d === 'recurrence') return 'Revisit';
                else return `${d.charAt(0).toUpperCase() + d.slice(1)}`; 
            })
        
        
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
                if(d3.event.target.parentNode.parentNode.className.animVal === 'options') {
                    d3.selectAll('#displayfObject').remove();
                    console.log(d3.event.target.parentNode.parentNode.className.animVal);
                }
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
            .attr('fill','rgb(30,30,30)')
            .text('Select mood')
  
        var options = select.selectAll(".myBars")
            .data(["cozy","luxury","loud","modern"])
            .enter()
        .append("g")
            .attr('class','options')
            .attr('id', d => d + '-graphic')
            .attr('visibility', 'hidden');
        

        options.append("rect")
            .attr('x', -209)
            .attr("y", function(d,i){ 
                return 10 + i*40;
            })
            .attr("width", l + 141)
            .attr("height", 40)
            .attr('fill', '#F7C7FE')
            
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
            .style('fill','rgb(30,30,30)')
            .attr("x", -171)
	        .attr("y", function(d,i){ 
                return 37 + i*40;
            })
            .text(d => {
                if(d === 'luxury') return 'Sanitation';
                else return d.charAt(0).toUpperCase() + d.slice(1) 
            })
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
                <h5 style={{position: 'absolute', left:'350px', top: '70px', color: 'rgb(60,60,60)'}}>Check the box(es) on the right to look up restaurants</h5>
                {/* <div className="svg-background"></div> */}
                <svg ref="container" style={{filter: 'contrast(200%)'}}></svg>

            </main>
        )
    }
}

export default Graphics;



