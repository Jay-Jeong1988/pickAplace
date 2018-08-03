import React, { Component } from 'react';
import * as d3 from 'd3';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import HomeModalContentA from './HomeModalContentA';
import HomeModalContentB from './HomeModalContentB';

class HomeModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            types: [],
            selected_food_type: null,
            img_url: null,
            clickedIcon: null,
            hoveredIcon: null,
            moods: []
        }

        this.isHovered = false;
    }

    componentDidMount(){
        this.setState({
            types: [ 'hamburgers','french','chinese','korean','franchise','japanese','vietnamese','spanish','brazilian','mexican','fine-dining','seafood','barbecue','fast-food','pizza','greek','ramen','buffet','food-court','steak-house','all-you-can-eat','food-truck','mongolian', 'breakfast', 'italian','sushi'],
            selected_food_type: '',
            img_url: '/assets/images/food_types/container_images/default-img.jpg',
            clickedIcon: null,
            hoveredIcon: null,
            moods: [ 'cozy', 'asdf']
        })
        this.renderFoodImage();
    }

    componentDidUpdate(){
        this.removeFoodImage();
        this.renderFoodImage();
    }

    removeFoodImage = () => {
        d3.select('.left-container')
        .select('defs')
        .remove();
    }

    renderFoodImage = () => {
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

    handleClick = (e) => {
        const prevIcon = this.state.clickedIcon;
        const clickedIcon = e.currentTarget.children[0];

        this.setState({
            ...this.state,
            selected_food_type: clickedIcon.id,
            img_url: `/assets/images/food_types/container_images/${clickedIcon.id}-img.jpg`,
            clickedIcon: clickedIcon
        })

        if( prevIcon && clickedIcon !== prevIcon ){
            this.resetIcon(prevIcon);
            this.animateIcon(clickedIcon);
        }else if(!prevIcon) {
            this.animateIcon(clickedIcon);
        }
    }

    handleHover = (e) => {
        const hoveredIcon = e.currentTarget.children[0];

        if( !this.isHovered ) {
            this.animateIcon(hoveredIcon);
            this.isHovered = true;
        }else {
            if( hoveredIcon !== this.state.clickedIcon ){
                this.resetIcon(hoveredIcon);
            }
            this.isHovered = false;
        }
    }

    animateIcon = (icon) => {
        icon.style.backgroundImage = `url(/assets/images/food_types/icons_coloured/${icon.id}_cl.png)`;
        icon.style.width = '60px';
        icon.style.height = '60px';
    }

    resetIcon = (icon) => {
        icon.style.backgroundImage = `url(/assets/images/food_types/icons/${icon.id}.png)`;
        icon.style.width = '50px';
        icon.style.height = '50px';
    }

    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 200,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <main className="HomeModal">
                <div id="home_modal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document" style={{marginTop: '150px', maxWidth: '600px'}}>
                        <Slider {...settings} >
                            <HomeModalContentA types={this.state.types} handleClick={this.handleClick} handleHover={this.handleHover} />
                            <HomeModalContentB moods={this.state.moods} handleClick={this.handlClick} handleHover={this.handleHover} />
                        </Slider>
                    </div>
                </div>
            </main>

        )
    }
}

export default HomeModal;