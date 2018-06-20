import React, { Component } from 'react';


class EvalRestaurantPage extends Component {

    constructor(props) {
        super(props);
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        this.state = {
            restaurant: restaurant
        }
    }

    render() {
        const { restaurant } = this.state;

        return (
            <main className="EvalRestaurantPage">

                <p>{restaurant.name}</p>
            </main>

        )
    }
}

export default EvalRestaurantPage;