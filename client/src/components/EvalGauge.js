import React, {Component} from 'react';
import * as d3 from 'd3';
import './style.css';

class EvalGauge extends Component {

    constructor(props) {

        super(props);
        this.state = {
            entry: this.props.entry,
            price: { 
                score: 0,
                yUP: 0,
                x: 0
            },
            cozy: { 
                score: 0,
                yUP: 0,
                x: 0
            },
            luxury: { 
                score: 0,
                yUP: 0,
                x: 0
            },
            taste: { 
                score: 0,
                yUP: 0,
                x: 0
            },
            loud: { 
                score: 0,
                yUP: 0,
                x: 0
            },
            modern: { 
                score: 0,
                yUP: 0,
                x: 0
            },
            services: { 
                score: 0,
                yUP: 0,
                x: 0
            },
        }

        this.x = d3.scaleLinear().range([0, 440]);
        this.xAxis = d3.axisBottom(this.x).ticks(1);
        this.setState = this.setState.bind(this);
    }

    componentDidMount(){

        this.svg = d3.select(this.refs.gauge_container)
            .attr('width','565')
            .attr('height','160')
        .append('g')


        
        this.renderOuterGauge();
        this.renderInnerGauge();
        this.renderAxis();
    }

    componentDidUpdate(){
        this.controlGauge();
        this.removeAxis();
        this.renderAxis();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.entry !== this.state.entry){
            this.setState({
                ...this.state,
                entry: nextProps.entry
            })
        }
    }

    removeAxis = () => {
        this.svg.select('.axis').remove();
    }
    

    removeInnerGauge(){
        this.svg.select('.innerGauge').remove();
    }

    renderOuterGauge = () => {
        const self = this;

        this.svg.append('path')
            .attr('class','outerGauge')
            .attr('transform','translate(60, 65)')
            .attr('stroke-width','2px')
            .attr('stroke','white')
            .attr('d','M0,0l440,-60v100h-440v-40')
            .on('click', function(d){
                const x = d3.mouse(this)[0] - 1.5;
                const yUP = x/(440/-60) + 1.5;
                const score = x/4.38;

                self.getValuesForGauge(x, yUP, score);
                self.props.getScore(self.state.entry, score);
                self.props.setComment(self.state.entry, score);
            })
        }
    
    getValuesForGauge = (x, yUP, score) => {
        switch(this.props.entry){
            case 'price':
            this.setState({
                ...this.state,
                entry: 'price',
                price: { 
                    score: score,
                    yUP: yUP,
                    x: x
                }
            })
            break;
            case 'cozy':
            this.setState({
                ...this.state,
                entry: 'cozy',
                cozy: { 
                    score: score,
                    yUP: yUP,
                    x: x
                }
            })
            break;
            case 'luxury':
            this.setState({
                ...this.state,
                entry: 'luxury',
                luxury: { 
                    score: score,
                    yUP: yUP,
                    x: x
                }
            })
            break;
            case 'taste':
            this.setState({
                ...this.state,
                entry: 'taste',
                taste: { 
                    score: score,
                    yUP: yUP,
                    x: x
                }
            })
            break;
            case 'loud':
            this.setState({
                ...this.state,
                entry: 'loud',
                loud: { 
                    score: score,
                    yUP: yUP,
                    x: x
                }
            })
            break;
            case 'modern':
            this.setState({
                ...this.state,
                entry: 'modern',
                modern: { 
                    score: score,
                    yUP: yUP,
                    x: x
                }
            })
            break;
            case 'services':
            this.setState({
                ...this.state,
                entry: 'services',
                services: { 
                    score: score,
                    yUP: yUP,
                    x: x
                }
            })
            break;
            default:
        }
    }
    renderInnerGauge = () => {
        const self = this;

        this.svg.append('path')
            .attr('class','innerGauge')
            .attr('transform','translate(60,65)')
            .attr('stroke','transparent')
            .attr('d','M0,0 l440,-60 v100 h-440 v-40')
            .on('click', function(d){
                const x = d3.mouse(this)[0] - 1.5;
                const yUP = x/(440/-60) + 1.5;
                const score = x/4.38;
                console.log(score);

                self.getValuesForGauge(x, yUP, score);
                self.props.getScore(self.state.entry, score);
                self.props.setComment(self.state.entry, score);
            })

    }

    controlGauge = () => {

        d3.select('svg')
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

        const entry = this.state.entry;
        const x = this.state[`${entry}`].x;
        const yUP = this.state[`${entry}`].yUP;
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
        .data(getEntry(this.state.entry))
        .text(d => d)
        .attr('fill','white')
        .attr('font-size','20px')
        .attr('dy','0.8em')
        .attr('dx','0.5em');

        function getEntry(entry){
            switch(entry){
                case 'price':
                return ['PRICY','CHEAP']
                case 'cozy':
                return ['UNCOMFORT','COZY']
                case 'luxury':
                return ['DIRTY','CLEAN']
                case 'taste':
                return ['BAD','GOOD']
                case 'loud':
                return ['QUIET','LOUD']
                case 'modern':
                return ['CLASSIC', 'MODERN']
                case 'services':
                return ['BAD','GOOD']
                default:
            }

        }
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