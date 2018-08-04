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
            img_url_food: null,
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
            img_url_food: '/assets/images/food_types/container_images/default-img.jpg',
            clickedFoodIcon: null,
            hoveredIcon: null,
            moods: [ 'cozy', 'loud', 'modern', 'friendly', 'romantic',],
            img_url_mood: '/assets/images/food_types/container_images/default2-img.jpg',
            clickedMoodIcon: null
        })

    }

    componentDidUpdate(){
        this.removeImage('svg_food');
        this.renderImage('svg_food', this.state.img_url_food);
        this.removeImage('svg_mood');
        this.renderImage('svg_mood', this.state.img_url_mood);
    }

    removeImage = (container_id) => {
        d3.select(`#${container_id}`)
        .select('defs')
        .remove();
    }

    renderImage = (container_id, img_url) => {
        const type = container_id.split('_')[1];
        
        d3.select(`#${container_id}`)
        .append('defs')
        .append('pattern')
            .attr('id',`${type}-image`)
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
        const prevFoodIcon = this.state.clickedFoodIcon;
        const clickedIcon = e.currentTarget.children[0];
        const prevMoodIcon = this.state.clickedMoodIcon;
        const category = e.currentTarget.parentNode.parentNode;

        const handleAnimation = ( prevIcon, clickedIcon ) => {
            if( prevIcon && clickedIcon !== prevIcon ){
                this.resetIcon(prevIcon);
                this.animateIcon(clickedIcon);
            }else if( !prevIcon ){
                this.animateIcon(clickedIcon);
            }
        }

        if( category.id === 'containerA' ){
            this.setState({
                ...this.state,
                img_url_food: `/assets/images/food_types/container_images/${clickedIcon.id}-img.jpg`,
                clickedFoodIcon: clickedIcon,
            })

            handleAnimation(prevFoodIcon, clickedIcon);
        }else{
            this.setState({
                ...this.state,
                img_url_mood: `/assets/images/food_types/container_images/${clickedIcon.id}-img.jpg`,
                clickedMoodIcon: clickedIcon,
            })

            handleAnimation(prevMoodIcon, clickedIcon);
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
                        <div className="modal-content">
                            <Slider {...settings} >
                                <HomeModalContentA types={this.state.types} handleClick={this.handleClick} handleHover={this.handleHover} />
                                <HomeModalContentB moods={this.state.moods} handleClick={this.handleClick} handleHover={this.handleHover} />
                            </Slider>
                        </div>
                    </div>
                </div>
            </main>

        )
    }
}

export default HomeModal;