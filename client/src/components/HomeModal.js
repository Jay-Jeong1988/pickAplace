import React, { Component } from 'react';
import * as d3 from 'd3';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import HomeModalContentA from './HomeModalContentA';
import HomeModalContentB from './HomeModalContentB';
import HomeModalContentC from './HomeModalContentC';

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
            clickedMoodIcon: null,
            currentModalPage: 0,
            otherThings: [],
            img_url_otherThings: null,
            clickedOtherThingsIcon: null
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
            clickedMoodIcon: null,
            currentModalPage: 0,
            otherThings: [ 'hygiene', 'price', 'taste', 'services', 'revisit' ],
            img_url_otherThings: '/assets/images/food_types/container_images/default3-img.jpg',
            clickedOtherThingsIcon: null
        })

    }

    componentDidUpdate(){
        this.removeImage('svg_food');
        this.renderImage('svg_food', this.state.img_url_food);
        this.removeImage('svg_mood');
        this.renderImage('svg_mood', this.state.img_url_mood);
        this.removeImage('svg_otherThings');
        this.renderImage('svg_otherThings', this.state.img_url_otherThings);
        this.showHideArrows();
        this.changePage();
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
            .attr('width','375')
            .attr('height','500')
            .attr('x','0')
            .attr('y','0')
        .append('image')
            .attr('xlink:href', img_url)
            .attr('width','375')
            .attr('height','500')
            .attr('preserveAspectRatio','xMinYMin slice')
    }


    handleClick = (e) => {
        const clickedIcon = e.currentTarget.children[0];
        const prevFoodIcon = this.state.clickedFoodIcon;
        const prevMoodIcon = this.state.clickedMoodIcon;
        const prevOtherThingsIcon = this.state.clickedOtherThingsIcon
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
        }else if( category.id === 'containerB' ){
            this.setState({
                ...this.state,
                img_url_mood: `/assets/images/food_types/container_images/${clickedIcon.id}-img.jpg`,
                clickedMoodIcon: clickedIcon,
            })
            handleAnimation(prevMoodIcon, clickedIcon);
        }else {
            this.setState({
                ...this.state,
                img_url_otherThings: `/assets/images/food_types/container_images/${clickedIcon.id}-img.jpg`,
                clickedOtherThingsIcon: clickedIcon,
            })
            handleAnimation(prevOtherThingsIcon, clickedIcon);
        }

    }

    handleHover = (e) => {
        const hoveredIcon = e.currentTarget.children[0];
        const {clickedFoodIcon} = this.state;
        const {clickedMoodIcon} = this.state;
        const {clickedOtherThingsIcon} = this.state;

        if( !this.isHovered ) {
            this.animateIcon(hoveredIcon);
            this.isHovered = true;
        }else {
            if( hoveredIcon !== clickedFoodIcon && hoveredIcon !== clickedMoodIcon && hoveredIcon !== clickedOtherThingsIcon ){
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

    showHideArrows = () => {
        const currentModalPage = this.state.currentModalPage;
        const endPageNumbers = [0, 2];

        if( !endPageNumbers.includes(currentModalPage) ){
            d3.select('.slick-prev').style('visibility','visible');
            if( this.state.clickedMoodIcon ) d3.select('.slick-next').style('visibility','visible');
            else d3.select('.slick-next').style('visibility','hidden');
        }else {
            if( currentModalPage === 0 ) {
                d3.select('.slick-prev').style('visibility','hidden');
                if( this.state.clickedFoodIcon ) d3.select('.slick-next').style('visibility','visible');
                else d3.select('.slick-next').style('visibility','hidden');
            }else{
                d3.select('.slick-next').style('visibility','hidden');
            }
        }
    }


    changePage = () => {
        const prevArrow = document.getElementsByClassName('slick-prev')[0];
        const nextArrow = document.getElementsByClassName('slick-next')[0];
        const currentModalPage = this.state.currentModalPage;

        d3.selectAll('.slick-arrow').on('click', () => {
            if( d3.event.target === prevArrow && currentModalPage !== 0 ) {
                this.setState({
                    ...this.state,
                    currentModalPage: currentModalPage - 1
                })
            }else if( d3.event.target === nextArrow && currentModalPage !== 2 ) {
                this.setState({
                    ...this.state,
                    currentModalPage: currentModalPage + 1
                })
            }
        })
    }   

    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 200,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipe: false
        };

        return (
            <main className="HomeModal">
                <div id="home_modal" className="modal" tabIndex="-1" role="dialog" aria-labelledby="home_modal">
                    <div className="modal-dialog" role="document" style={{marginTop: '150px', maxWidth: '750px'}}>
                        <div className="modal-content">
                            <Slider {...settings} >
                                <HomeModalContentA types={this.state.types} handleClick={this.handleClick} handleHover={this.handleHover} />
                                <HomeModalContentB moods={this.state.moods} handleClick={this.handleClick} handleHover={this.handleHover} />
                                <HomeModalContentC otherThings={this.state.otherThings} handleClick={this.handleClick} handleHover={this.handleHover} />
                            </Slider>
                        </div>
                    </div>
                </div>
            </main>

        )
    }
}

export default HomeModal;