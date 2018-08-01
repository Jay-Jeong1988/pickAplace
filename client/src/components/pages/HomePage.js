import React, { Component } from 'react';
import HomeModal from '../HomeModal';

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
                {/* <video autoPlay muted loop id="myVideo" ref="video">
                    <source src="/assets/videos/Video_Footage_Of_City.mp4" type="video/mp4"/>
                </video> */}
                <div className="content">
                    <h1>Idealio</h1>
                    <p>Idealio lets you look for the best restaurants based on your own search options</p>
                    
                    <button id="myBtn" onClick={this.myFunction} ref="button">Pause autoplay</button>
                </div>
                <HomeModal />
            </main>
        )
    }
}


export default HomePage;