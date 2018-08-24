import React, { Component } from 'react';
import HomeModal from '../HomeModal';
import './HomePage.css';
import Places from '../Places';
import LandingSlider from '../LandingSlider';


class HomePage extends Component {

    constructor(props){
        super(props);
    }

    myFunction = (e) => {
        e.preventDefault();
        var video = this.refs.video;

        // Get the button
        var btn = this.refs.button;

        // Pause and play the video, and change the button text
        if (video.paused) {
            video.play();
            btn.innerHTML = "Pause autoplay";
        } else {
            video.pause();
            btn.innerHTML = "Resume";
        }
    }
    render(){
        
        return (
            <main className="HomePage">
                <LandingSlider redirectToHome={this.props.redirectToHome}/>
                <Places isTransitionOver={this.props.isTransitionOver}/>
                <HomeModal />
            </main>
        )
    }
}


export default HomePage;