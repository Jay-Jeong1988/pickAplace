import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar(props) {


    return (
        <nav className="Navbar">
        {
            [
                <NavLink exact to="/" >🏡</NavLink>,
                <NavLink exact to="/sign_in" >Sign In</NavLink>,
                <NavLink exact to="/sign_up" >Sign Up</NavLink>,
                <NavLink exact to="/search_rests" >Rate Restaurants</NavLink>,
                <NavLink exact to="/add_restaurant" >Add Restaurant</NavLink>,
                <NavLink exact to="/restaurants" >Look Up Restaurants</NavLink>,
            ]
        }
        </nav>
    )
}

export default Navbar;
