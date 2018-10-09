import React, { Component } from 'react';
import Slider from 'react-slick';
import './LandingSlider.css';

class LandingSlider extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            slide_urls: [
                '/assets/images/landingImages/in_use/lpi-0.jpg',
                '/assets/images/landingImages/in_use/lpi-1.jpg',
                '/assets/images/landingImages/in_use/lpi-2.jpg',
                '/assets/images/landingImages/in_use/lpi-3.jpg',
                '/assets/images/landingImages/in_use/lpi-4.jpg',
                '/assets/images/landingImages/in_use/lpi-5.jpg',
                '/assets/images/landingImages/in_use/lpi-6.jpg',
                '/assets/images/landingImages/in_use/lpi-7.jpg',
                '/assets/images/landingImages/in_use/lpi-8.jpg',
                '/assets/images/landingImages/in_use/lpi-9.jpg',
            ],
        }
        this.swipeStart = {};

    }

    componentDidMount() {
        const site_name = document.querySelector('#site-name');
        const slides = document.querySelectorAll('.slick-slide:not(.slick-active)');
        site_name.classList.add('show');
        slides.forEach( slide => slide.classList.add('reset') );

        this.animateScroll();
    }

    animateScroll = () => {
        const scroll_arrow = document.getElementById('scroll-arrow');
        let sw = 0;
        setInterval( () => {

            if( sw ){
                scroll_arrow.classList.remove('scroll-animate');
                sw = 0;
            }else {
                scroll_arrow.classList.add('scroll-animate');
                sw = 1;
            }
        }, 1450 );
    }

    handleTouchStart = (e) => {
        e.preventDefault();
        this.swipeStart = {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY
        }
        
    }

    handleTouchEnd = (e) => {
        const swipeEnd = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        }

        if(this.swipeStart.y - swipeEnd.y > 15 || this.swipeStart.y - swipeEnd.y < -15){
            this.props.redirectToHome(e);
        }
    }

    render() {
        const settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 3000,
            swipe: true,
            fade: true,
            pauseOnHover: false,
            arrows: false,
            cssEase: 'cubic-bezier(.68, 0, .42, 1)',
            afterChange: (current) => {
                const currentSlide = document.querySelector(`.slick-slide[data-index='${current}'`);
                const previousSlide = currentSlide ? currentSlide.previousSibling : null;
                const firstSlide = currentSlide ? currentSlide.parentNode.firstChild : null;
                const lastSlide = currentSlide ? currentSlide.parentNode.lastChild : null;
                if( currentSlide && currentSlide === firstSlide ) lastSlide.classList.add('reset');
                else if( currentSlide !== firstSlide ) previousSlide.classList.add('reset');
            }
        };
        const { slide_urls } = this.state;
        const { redirectToHome } = this.props;

        return (
            <main className="LandingSlider">
                <div id="site-name">
                    <span className="c1" style={{transitionDelay: '900ms'}}>I</span>
                    <span className="c2" style={{transitionDelay: '1100ms'}}>d</span>
                    <span className="c3" style={{transitionDelay: '500ms'}}>e</span>
                    <span className="c4" style={{transitionDelay: '700ms'}}>a</span>
                    <span className="c5" style={{transitionDelay: '800ms'}}>l</span>
                    <span className="c6" style={{transitionDelay: '1200ms'}}>i</span>
                    <span className="c7" style={{transitionDelay: '1900ms'}}>o</span>
                </div>
                <Slider ref={slider => (this.slider = slider)} {...settings} className="slide-container">
                    {
                        slide_urls.map( (url, i) => {
                            return url ? (
                                <div key={i} className="slides">
                                    <div className="bg_img" style={{ backgroundImage: `url(${url})` }}></div>
                                </div>
                            )
                            :
                            ''
                        })
                    }
                
                </Slider>
                <div id="scroll-open" style={{touchAction: 'none'}}>
                    <a href="/" onClick={redirectToHome} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd} onWheel={redirectToHome}>
                        <div id="scroll-arrow"></div>
                    </a>
                </div>
            </main>
        )
    }
}

export default LandingSlider;