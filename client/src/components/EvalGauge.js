import React, {Component} from 'react';
import * as d3 from 'd3';
import './style.css';

class EvalGauge extends Component {

    constructor(props) {

        super(props);
        this.state = {
            price_score: 0,
            cozy_score: 0,
            luxury_score: 0,
            taste_score: 0,
            loud_score: 0,
            modern_score: 0,
            services_score: 0,
            recurrence_score: 0,
            yUP: 0,
            x: 0
        }

        this.x = d3.scaleLinear().range([0, 440]);
        this.xAxis = d3.axisBottom(this.x).ticks(1);
        this.setState = this.setState.bind(this);
    }

    componentDidMount(){

        this.svg = d3.select(this.refs.gauge_container)
            .attr('width','565')
            .attr('height','180')
        .append('g')


        
        this.renderOuterGauge();
        this.renderInnerGauge();
        this.renderAxis();
    }

    componentDidUpdate(){
        this.controlGauge();

        
    }
    

    removeInnerGauge(){
        this.svg.select('.innerGauge').remove();
    }

    renderOuterGauge = () => {
        const self = this;

        const outerGauge = this.svg.append('path')
            .attr('class','outerGauge')
            .attr('transform','translate(60, 65)')
            .attr('stroke-width','2px')
            .attr('stroke','green')
            .attr('d','M0,0l440,-60v100h-440v-40')
            .on('click', function(d){
                const x = d3.mouse(this)[0] - 1.5;
                const yUP = x/(440/-60) + 1.5;
                const score = x/4.38;

                self.setState({
                    ...self.state,
                    price_score: score,
                    yUP: yUP,
                    x: x,
                })
                self.props.getScore(score);
            })
        }

    renderInnerGauge = () => {
        const self = this;

        const innerGauge = this.svg.append('path')
            .attr('class','innerGauge')
            .attr('transform','translate(60,65)')
            .attr('stroke','transparent')
            .attr('d','M0,0 l440,-60 v100 h-440 v-40')
            .on('click', function(d){
                const x = d3.mouse(this)[0] - 1.5;
                const yUP = x/(440/-60) + 1.5;
                const score = x/4.38;
                console.log(score);

                self.setState({
                    ...self.state,
                    price_score: score,
                    yUP: yUP,
                    x: x,
                })

                self.props.getScore(score);
            })

    }

    controlGauge = () => {

        const lg = d3.select('svg')
        .append('defs')
        .append('linearGradient')
            .attr('id', 'lg')
            .attr('x1','80%')
            .attr('y1','0%')
            .attr('x2','0%')
            .attr('y2','0%')
        .append('stop')
            .attr('offset','0%')
            .attr('stop-color','lightgreen' )
            .attr('stop-opacity','1')

        d3.selectAll('defs linearGradient')
        .append('stop')
            .attr('offset','100%')
            .attr('stop-color', 'rgba(255,0,0)')
            .attr('stop-opacity', '1')


        const x = this.state.x;
        const yUP = this.state.yUP;
        const self = this;
        this.svg.select('.innerGauge')
        .transition()
        .duration(300)
        .attr('d',`M1.5,0 l${x},${yUP} v${-(yUP-38.5)} h${-x} v-38.5`)
        .attr('fill','url(#lg)');
    }
        
    renderAxis = () => {

        this.x.domain([0,100]);
        this.svg
        .append('g')
            .attr('class', 'axis')
            .attr('transform', `translate( 60 , 105)`)
        .call(this.xAxis)
        .selectAll('text')
            .attr('font-size','15px')
            .attr('fill','white');

        this.svg.select('.axis')
            .selectAll('.tick')
            .selectAll('line')
            .attr('display','none');

        this.svg.select('.axis')
            .select('path')
            .style('display','none');

        this.svg.select('.axis')
        .selectAll('text')
        .data(['PRICY','CHEAP'])
        .text(d => d)
        .attr('fill','white')
        .attr('font-size','20px')
        .attr('dy','0.8em');

    }
    

    render(){

        return (
            <main className="EvalGauge">
                <svg ref="gauge_container"></svg>
            </main>
        )
    }
}

export default EvalGauge;