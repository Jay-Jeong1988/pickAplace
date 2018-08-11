import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar(props) {

    function upCase( name ){
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    const { user, toggleMenu } = props;
    const first_name = user ? upCase( user.jwt.first_name ) : '';

    
    return (
        <nav className="Navbar">
            <div>
                <div id="nav-toggle" onClick={toggleMenu} >&#9776;</div>
            </div>

            <div>
                <a href="/">
                    <h1 id="logo">Idealio</h1>
                </a>
            </div>

            <div className="signIn">
                {
                    user ?
                    <h6>{ first_name }</h6>
                    :
                    <NavLink exact to="/sign_in" >Sign In</NavLink>
                }
            </div>
        </nav>
    )
}

export default Navbar;
