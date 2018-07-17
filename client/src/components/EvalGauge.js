import React, {Component} from 'react';
import * as d3 from 'd3';
import './style.css';

class EvalGauge extends Component {

    constructor(props) {

        super(props);
        this.state = {
            score: 0
        }

        this.x = d3.scaleBand().rangeRound([0, 650]);
    }

    componentDidMount(){

        this.svg = d3.select(this.refs.gauge_container)
            .attr('width','665')
            .attr('height','315')
        .append('g')
            .attr('transform','translate(50,50)');

        
        this.renderGauge();
    }

    componentDidUpdate(){

    }

    renderGauge = () => {

        this.svg.append('path')
            .attr('transform','translate(0, -80)')
            .attr('stroke-width','2px')
            .attr('stroke','green')
            .attr('d','M0,0l640,-60v80h-640v-20')
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