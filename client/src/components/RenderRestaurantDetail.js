import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import $ from 'jquery';

class RenderRestaurantDetail extends Component {

    constructor(props) {
        super(props);

        this.slideArrow = this.slideArrow.bind(this);
        this.getOpenOrCloseTime = this.getOpenOrCloseTime.bind(this);

    }

    componentDidUpdate() {
        this.slideArrow();
    }
    
    slideArrow() {
        if( $('.slick-prev > img ') ) $('.slick-prev > img ').remove();
        if( $('.slick-next > img ') ) $('.slick-next > img ').remove();

        $('.photo_container > .slick-next')
        .css({visibility: 'hidden'})
        .css('right','-14px')
        .css('width', '30px')
        .css('height', '45px')
        .append("<img src='/assets/images/slide-arrow.png' width='20px'/>");

        $('.photo_container > .slick-prev')
        .css({visibility: 'hidden'})
        .css('left','-14px')
        .css('width', '30px')
        .css('height', '45px')
        .append("<img src='/assets/images/slide-arrow-r.png' width='20px'/>");

        $('.slick-next > img').css('visibility','initial');
        $('.slick-prev > img').css('visibility','initial');

        $('.slick-prev').addClass('removeFont');
        $('.slick-next').addClass('removeFont');

       
    }
    
   
        
    getOpenOrCloseTime( periods, OoC ) {
        const now = new Date();
        const today = now.getDay();
        const tomorrow = (today === 6) ? 0 : (today + 1);
        let OoC_at = [];
        let hours = 0;
        let minutes = 0;
        let closestDate = new Date();
        let smallestTimeGap = 86400000;
        
        for( let i of periods ){
            let timeDiffer = i[`${OoC}`].nextDate - now.getTime();
            if( timeDiffer < smallestTimeGap ) {
                smallestTimeGap = timeDiffer
                closestDate = i[`${OoC}`].nextDate; 
            }
        }

        for( let i of periods ){
            if( i[`${OoC}`].nextDate === closestDate ) OoC_at = [ i[`${OoC}`].hours, i[`${OoC}`].minutes ];
        }
        
        if( OoC_at[0].toString() && OoC_at[1].toString() ) {
            hours = OoC_at[0];
            minutes = OoC_at[1];
        }
        if( minutes === 0 ) minutes = '00';

        if( hours >= 12 && hours < 24 ){
            if( hours > 12 ) hours -= 12

            return `${hours}:${minutes} p.m.`;
        }else {
            return `${hours}:${minutes} a.m.`;
        }
    }


    render() {
        
        const settings = {
            dots: true,
            infinite: true,
            speed: 200,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const { photos, geometry, opening_hours = '', google_rating = '' } = this.props;
        
        if( !photos ) return null;
        return (
            <main className="RenderRestaurantDetail">
                <div className="restaurant container">
                    <Slider {...settings} className="photo_container" >
                        {
                            photos.map( photo => {
                                return photo ?
                                (   
                                    <div key={photos.indexOf(photo)}>
                                        <div className="photos"
                                            style={{ 
                                                backgroundImage: `url(${photo.getUrl({'maxWidth': 1600, 'maxHeight': 1600})}`,
                                                backgroundSize: 'contain',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center',
                                                backgroundColor: 'black'
                                            }}>
                                        </div>
                                    </div>
                                )
                                :
                                ''
                            })
                        }
                    </Slider>
                    <div className="placeData">
                        <div className="g-rating">
                            <small style={{display:'inline'}}>Google Rating </small><h1 style={{display:'inline'}}>{google_rating} /5</h1>
                        </div>    
                        <div className="opening-hours">
                            {
                                opening_hours.open_now ? 
                                <small style={{color: 'blue'}}>Open now ∙ <span style={{color: 'red'}}>Closes at { this.getOpenOrCloseTime(this.props.opening_hours.periods, 'close') }</span></small>
                                :
                                <small style={{color: 'red'}}>Closed now ∙ <span style={{color: 'blue'}}>Opens at { this.getOpenOrCloseTime(this.props.opening_hours.periods, 'open') }</span></small>
                            }

                        </div>
                    </div>
                </div>
            </main>
        )
    }
    
}


export default RenderRestaurantDetail;