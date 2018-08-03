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
            clickedFoodIcon: null,
            hoveredIcon: null,
            moods: [],
            img_url_mood: null,
            clickedMoodIcon: null
        }

        this.isHovered = false;
    }

    componentDidMount(){
        this.setState({
            types: [ 'hamburgers','french','chinese','korean','franchise','japanese','vietnamese','spanish','brazilian','mexican','fine-dining','seafood','barbecue','fast-food','pizza','greek','ramen','buffet','food-court','steak-house','all-you-can-eat','food-truck','mongolian', 'breakfast', 'italian','sushi'],
            selected_food_type: '',
            img_url: '/assets/images/food_types/container_images/default-img.jpg',
            clickedFoodIcon: null,
            hoveredIcon: null,
            moods: [ 'cozy', 'loud', 'modern', 'friendly', 'romantic',],
            img_url_mood: '/assets/images/food_types/container_images/default2-img.jpg',
            clickedMoodIcon: null
        })
        this.renderFoodImage();
    }

    componentDidUpdate(){
        this.removeFoodImage();
        this.renderFoodImage();
        this.removeMoodImage();
        this.renderMoodImage();
    }

    removeFoodImage = () => {
        d3.select('#svg_food')
        .select('defs')
        .remove();
    }

    renderFoodImage = () => {
        const { img_url } = this.state
        
        d3.select('#svg_food')
        .append('defs')
        .append('pattern')
            .attr('id','food-image')
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

    removeMoodImage = () => {
        d3.select('#svg_mood')
        .select('defs')
        .remove();
    }

    renderMoodImage = () => {
        const { img_url_mood } = this.state
        
        d3.select('#svg_mood')
        .append('defs')
        .append('pattern')
            .attr('id','mood-image')
            .attr('patternUnits','userSpaceOnUse')
            .attr('width','300')
            .attr('height','400')
            .attr('x','0')
            .attr('y','0')
        .append('image')
            .attr('xlink:href', img_url_mood)
            .attr('width','300')
            .attr('height','400')
            .attr('preserveAspectRatio','xMinYMin slice')
    }

    handleClick = (e) => {
        const prevFoodIcon = this.state.clickedFoodIcon;
        const clickedIcon = e.currentTarget.children[0];
        const prevMoodIcon = this.state.clickedMoodIcon;
        const temp = e.currentTarget.parentNode.parentNode;

        if( temp.id === 'containerA' ){
            this.setState({
                ...this.state,
                selected_food_type: clickedIcon.id,
                img_url: `/assets/images/food_types/container_images/${clickedIcon.id}-img.jpg`,
                clickedFoodIcon: clickedIcon,
            })

            if( prevFoodIcon && clickedIcon !== prevFoodIcon ){
                this.resetIcon(prevFoodIcon);
                this.animateIcon(clickedIcon);
            }else if(!prevFoodIcon) {
                this.animateIcon(clickedIcon);
            }
        }else{
            this.setState({
                ...this.state,
                selected_food_type: clickedIcon.id,
                img_url_mood: `/assets/images/food_types/container_images/${clickedIcon.id}-img.jpg`,
                clickedMoodIcon: clickedIcon,
            })

            if( prevMoodIcon && clickedIcon !== prevMoodIcon ){
                this.resetIcon(prevMoodIcon);
                this.animateIcon(clickedIcon);
            }else if(!prevMoodIcon) {
                this.animateIcon(clickedIcon);
            }
        }
    }

    handleHover = (e) => {
        const hoveredIcon = e.currentTarget.children[0];

        if( !this.isHovered ) {
            this.animateIcon(hoveredIcon);
            this.isHovered = true;
        }else {
            if( hoveredIcon !== this.state.clickedFoodIcon && hoveredIcon !== this.state.clickedMoodIcon ){
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
            infinite: false,
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
                            <HomeModalContentB moods={this.state.moods} handleClick={this.handleClick} handleHover={this.handleHover} />
                        </Slider>
                    </div>
                </div>
            </main>

        )
    }
}

export default HomeModal;