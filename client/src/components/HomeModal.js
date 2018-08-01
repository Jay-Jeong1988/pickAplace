import React, { Component } from 'react';
import * as d3 from 'd3';

class HomeModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            types: [ 'hamburgers','french','chinese','korean','franchise','japanese','vietnamese','spanish','brazilian','mexican','fine-dining','seafood','barbeque','fast-food','pizza','greek','ramen','buffet','food-court','steak-house','all-you-can-eat','food-truck','mongolian', 'breakfast', 'italian','sushi'],
            selected_food_type: 'hamburgers',
            img_url: 'https://us.123rf.com/450wm/timolina/timolina1504/timolina150400378/39128783-big-juicy-hamburger-with-vegetables-and-beef-on-a-wooden-background-in-rustic-style.jpg?ver=6'
        }

        this.renderFoodImage = this.renderFoodImage.bind(this);
    }

    componentDidMount(){
        this.renderFoodImage();
    }
    renderFoodImage() {

        const { img_url } = this.state
        
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
            .attr('xlink:href', img_url)
            .attr('width','300')
            .attr('height','400')
            .attr('preserveAspectRatio','xMinYMin slice')
    }

    render() {
        const { types } = this.state;
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
                                <div className="right-container">

                                {
                                    types.map( (d, i) => {
                                        if( i % 2 === 0 ){
                                            return d ? (
                                                <div key={i} className="rows">
                                                    <div style={{width: '30%', textAlign: 'center', margin: '0 15px'}}>
                                                        <div id={d} style={{width: '50px', height: '50px', marginLeft: '20%', backgroundImage: `url(/assets/images/food_types/${d}.png)`, backgroundSize: 'cover'}}></div>
                                                        <h6 style={{color: 'gray'}}>{d}</h6>
                                                    </div>
                                                    {
                                                        types[i+1] ? (
                                                            <div style={{width: '30%', textAlign: 'center', margin: '0 15px'}}>
                                                                <div id={ types[i+1] } style={{width: '50px', height: '50px', marginLeft: '20%', backgroundImage: `url(/assets/images/food_types/${types[i+1]}.png)`, backgroundSize: 'cover'}}></div>
                                                                <h6 style={{color: 'gray'}}>{types[i+1]}</h6>
                                                            </div>
                                                        )
                                                        :
                                                        ''
                                                    }
                                                </div>
                                            )
                                            :
                                            ''
                                        }
                                    })
                                }
                                    <div style={{color: 'silver', fontSize: '8px'}}>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Meat">Meat</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"     title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                                    <div style={{color: 'silver', fontSize: '8px'}}>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Socrates">Socrates</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"     title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        )
    }
}

export default HomeModal;