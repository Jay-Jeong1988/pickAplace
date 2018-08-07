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
                <div id="nav-toggle" onClick={toggleMenu} >&#9776;</div>
            </span>
            <NavLink exact to="/" ><h1>Idealio</h1></NavLink>
            <div className="signIn">
                {
                    user ?
                    <p id="user_name"><small>Signed in as</small> { first_name }</p>
                    :
                    <NavLink exact to="/sign_in" >Sign In</NavLink>
                }
            </div>
        </nav>
    )
}

export default Navbar;
