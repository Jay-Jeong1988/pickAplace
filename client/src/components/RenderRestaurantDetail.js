import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import $ from 'jquery';

class RenderRestaurantDetail extends Component {

    constructor(props) {
        super(props);

        this.slideIt = this.slideIt.bind(this);
    }

    componentDidUpdate() {
        this.slideIt();
    }
    
    slideIt() {
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
    
    render() {
        
        const settings = {
            dots: true,
            infinite: true,
            speed: 200,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const { photos, geometry, opening_hours, google_rating } = this.props;
        
        if( !photos ) return null;
        return (
            <main className="RenderRestaurantDetail">
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
            </main>
        )
    }
    
}


export default RenderRestaurantDetail;