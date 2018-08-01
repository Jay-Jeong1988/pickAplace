import React, { Component } from 'react';
import * as d3 from 'd3';

class HomeModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            food_type: 'hamburger'
        }

        this.renderFoodImage = this.renderFoodImage.bind(this);
    }

    componentDidMount(){
        this.renderFoodImage();
    }
    renderFoodImage() {
        
        d3.select('.left-container')
        .append('defs')
        .append('pattern')
            .attr('id', 'food-image')
            .attr('patternUnits','userSpaceOnUse')
            .attr('width','300')
            .attr('height','400')
            .attr('x','0')
            .attr('y','0')
        .append('image')
            .attr('xlink:href','https://us.123rf.com/450wm/timolina/timolina1504/timolina150400378/39128783-big-juicy-hamburger-with-vegetables-and-beef-on-a-wooden-background-in-rustic-style.jpg?ver=6')
            .attr('width','300')
            .attr('height','400')
            .attr('preserveAspectRatio','xMinYMin slice')
    }

    render() {
        return (
            <main className="HomeModal">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#home_modal">
                    LET'S START!
                </button>
                <div id="home_modal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document" style={{marginTop: '200px', maxWidth: '600px'}}>
                        <div className="modal-content" style={{height: '400px', backgroundColor: 'white'}}>
                            <div className="modal-body" style={{backgroundColor: 'white'}}>
                                <svg className="left-container">
                                    <g stroke="black" strokeWidth="0.5" fill="url(#food-image)">
                                        <path d="M0,0h300l-30,400h-270v-400"></path>
                                    </g>
                                </svg>
                                <div className="right-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        )
    }
}

export default HomeModal;