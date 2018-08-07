import React from 'react';
import { NavLink } from 'react-router-dom';

function LeftNavbar (props) {

    const { toggleMenu } = props;

    return (
        <main className="LeftNavbar">
            <div className="content">
                <div className="controller">
                    <p>ENGLISH</p>
                    <div className="btn-close" onClick={toggleMenu}>CLOSE</div>
                </div>
                <div className="intro">
                    <h1>Idealio</h1>
                    <p>&nbsp; helps you find the best restaurants perfectly matched to your own preferences.</p>
                </div>
                <div className="links">
                    {
                        props.user ?
                        [
                            <NavLink key={2} exact to="/search_rests" >Rate Restaurants</NavLink>,
                            <NavLink key={3} exact to="/add_restaurant" >Add Restaurant</NavLink>,
                            <NavLink key={4} exact to="/restaurants" >Look Up Restaurants</NavLink>,
                            <NavLink key={7} exact to="/" onClick={props.signOut} >Sign Out</NavLink>
                        ]
                        :
                        [   
                            <NavLink key={5} exact to="/sign_in" >Sign In</NavLink>,
                            <NavLink key={6} exact to="/sign_up" >Sign Up</NavLink>,
                            <a href="#" key={4} onClick={props.guestSignIn} >Guest Sign In</a>
                        ]
                    
                    }
                </div>
            </div>
        </main>
    )
}

export default LeftNavbar;