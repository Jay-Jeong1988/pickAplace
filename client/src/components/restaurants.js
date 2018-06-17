import React from 'react';
import { Restaurant } from './lib/requests';

function Restaurants(props) {

    return (
        <select className="Chosen-select" onChange={ value => console.log(value) }>
            {
                Restaurants.forEach( restaurant => {
                    <option>{ restaurant.name }</option>
                })
            }
        </select>
    );
}

