import React from 'react';
import { NavLink } from 'react-router-dom';

function LeftNavbar (props) {

    const { toggleMenu, toggleAbout } = props;

    return (
        <main className="LeftNavbar">
            <div className="content">
                <div className="controller">
                    <p>ENGLISH</p>
                    <div className="btn-close" onClick={toggleMenu}>CLOSE</div>
                </div>
                <div className="intro"><p onClick={toggleAbout}>About</p></div>
                {
                    props.user ?
                    [
                        <div key={1}><NavLink exact to="/search_rests" >Rate Restaurants</NavLink></div>,
                        <div key={2}><NavLink exact to="/add_restaurant" >Add Restaurant</NavLink></div>,
                        <div key={3}><NavLink exact to="/restaurants" >Look Up Restaurants</NavLink></div>,
                        <div key={4}><NavLink exact to="/" onClick={props.signOut} >Sign Out</NavLink></div>
                    ]
                    :
                    [   
                        <div key={1}><NavLink exact to="/sign_in" >Sign In</NavLink></div>,
                        <div key={2}><NavLink exact to="/sign_up" >Sign Up</NavLink></div>,
                        <div key={3}><NavLink exact to="/" onClick={props.guestSignIn} >Guest Sign In</NavLink></div>
                    ]
                
                }
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </main>
    )
}

export default LeftNavbar;