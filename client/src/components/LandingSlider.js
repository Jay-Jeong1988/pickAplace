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
            interval_count: 0
        }
    }

    componentDidMount() {
        
        // let i = 0;
        // const updateEveryOneSecond = setInterval( () => {
        //     this.setState({
        //         ...this.state,
        //         interval_count: i++
        //     })
        // }, 1000);

        // const slickNextId = setInterval( () => {
        //     this.slider.slickNext();
        // }, 5100);

        const site_name = document.querySelector('#site-name');
        site_name.classList.add('show');
    }
    
    componentDidUpdate() {
        
        // const currentSlide = document.querySelector('.slick-current');
        // currentSlide.firstChild.firstChild.firstChild.style.transform = 'scale(1, 1)';
    }

    render() {
        const settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 5000,
            swipe: false,
            fade: true,
            pauseOnHover: false,
            arrows: false,
            cssEase: 'cubic-bezier(.68, 0, .42, 1)',
        };
        const { slide_urls } = this.state;

        return (
            <main className="LandingSlider">
                <div id="site-name">
                    <span className="c1" style={{transitionDelay: '500ms'}}>I</span>
                    <span className="c2" style={{transitionDelay: '700ms'}}>d</span>
                    <span className="c3" style={{transitionDelay: '100ms'}}>e</span>
                    <span className="c4" style={{transitionDelay: '300ms'}}>a</span>
                    <span className="c5" style={{transitionDelay: '400ms'}}>l</span>
                    <span className="c6" style={{transitionDelay: '800ms'}}>i</span>
                    <span className="c7" style={{transitionDelay: '1500ms'}}>o</span>
                </div>
                <Slider ref={slider => (this.slider = slider)} {...settings} className="slide-container">
                    {
                        slide_urls.map( (url, i) => {
                            return url ? (
                                <div key={i} className="slides">
                                    <div style={{ backgroundImage: `url(${url})` }}></div>
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

export default LandingSlider;