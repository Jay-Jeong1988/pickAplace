import React, { Component } from 'react';
import HomeModal from '../HomeModal';
import './HomePage.css';
import Places from '../Places';


class HomePage extends Component {

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
                <Places />
                <HomeModal />
            </main>
        )
    }
}


export default HomePage;