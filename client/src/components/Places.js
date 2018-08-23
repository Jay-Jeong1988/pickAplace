import React, {Component} from 'react';

class Places extends Component {

    constructor(props) {
        super(props);

        this.state = {
            places: {
                restaurant: {
                    video_url: '',
                    icon_url: ''
                },
                supermarket: {
                    video_url: '',
                    icon_url: ''
                },
                hairSalon: {
                    video_url: '',
                    icon_url: ''
                },
                sportsShop: {
                    video_url: '',
                    icon_url: ''
                },
                nutritionShop: {
                    video_url: '',
                    icon_url: ''
                }
            }
        }

    }

    componentDidMount() {
        this.setState({
            places: {
                restaurant: {
                    video_url: '/assets/videos/places/restaurant.mp4',
                    icon_url: ''
                },
                supermarket: {
                    video_url: '/assets/videos/places/supermarket.mp4',
                    icon_url: ''
                },
                hairSalon: {
                    video_url: '/assets/videos/places/salon.mp4',
                    icon_url: ''
                },
                sportsShop: {
                    video_url: '/assets/videos/places/sports_shop.mp4',
                    icon_url: ''
                },
                nutritionShop: {
                    video_url: '/assets/videos/places/nutrition_shop.mp4',
                    icon_url: ''
                }
            }
        })
    }
    
    playOnHover = (e) => {
        const container = e.currentTarget;
        const video = container.firstChild;
        if(!container.classList.contains('restaurant')) {
            container.lastChild.innerHTML = 'Soon!';
        }else{
            container.style.filter = 'none';
        }
        container.classList.remove('shrinkPlaces');
        container.classList.add('expandPlaces');
        video.play();
        video.muted = false;
    }

    pauseOnHover = (e) => {
        const container = e.currentTarget;
        const video = e.currentTarget.firstChild;
        container.style.filter = 'grayscale(100%)';
        container.lastChild.innerHTML = container.classList[1].charAt(0).toUpperCase() + container.classList[1].slice(1);
        container.classList.remove('expandPlaces');
        container.classList.add('shrinkPlaces');
        video.pause();
        video.muted = true;
    }

    render(){
        const { places } = this.state;

        return (
            <div className="Places wrapper">
                {
                    Object.keys(places).map( (placeName, i) => {
                        return (
                            <div key={i} className={ "place_container " + placeName } onMouseEnter={this.playOnHover} onMouseLeave={this.pauseOnHover} >
                                <video loop className="videos" id={ "video_" + placeName } ref="video">
                                    <source src={ places[placeName]['video_url'] } type="video/mp4"/>
                                </video>
                                <div className="placeTitle">{`${placeName.charAt(0).toUpperCase() + placeName.slice(1)}`}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Places;