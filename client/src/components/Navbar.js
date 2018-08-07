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
            <span>
                <a id="nav-toggle" href="#" onClick={toggleMenu} >&#9776;</a>
            </span>
            <NavLink exact to="/" ><h1>Idealio</h1></NavLink>
            {
                user ?
                <p id="user_name"><small>signed in as</small> { first_name }</p>
                :
                <p></p>
            }
        </nav>
    )
}

export default Navbar;
