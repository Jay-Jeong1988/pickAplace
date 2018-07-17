import React, { Component } from 'react';
import { Evaluation } from '../../lib/requests';
import Modal from '../Modal';

class EvalRestaurantPage extends Component {

    constructor(props) {
        super(props);
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        this.state = {
            restaurant: restaurant
        }
        this.evaluate = this.evaluate.bind(this);
    }

    evaluate(e) {
        e.preventDefault();
        const restaurantId = this.props.match.params.id;
        const formData = new FormData(e.currentTarget);
        const isTrueSet = ( formData.get('recurrence') === 'true' );
        const evaluation_score = {
            price: formData.get('price'),
            luxury: formData.get('luxury'),
            cozy: formData.get('cozy'),
            modern: formData.get('modern'),
            loud: formData.get('loud'),
            taste: formData.get('taste'),
            services: formData.get('services'),
            recurrence: isTrueSet
        }
        // for(let entry of formData.entries()){
        //     console.log(`${entry[0]}: ${entry[1]}`)
        // }
        Evaluation.create(restaurantId, evaluation_score).then( data => {
            console.log(data);
            alert('successfully evaluated');
            localStorage.removeItem('restaurant');
            this.props.history.push('/search_rests');
        })

    }

    render() {
        const { restaurant } = this.state;

        return (
            <main className="EvalRestaurantPage container">
                <div className="restaurant_" >
                    <img src={restaurant.imgUrl} alt="brand_logo"/>
                    <h5>{restaurant.type} restaurant</h5>
                    <h5>{restaurant.address}</h5>
                    <h5>{restaurant["phone number"]}</h5>
                    <h5>{restaurant.website_url}</h5>
                </div>

                <Modal evaluate={this.evaluate}/>
                
            </main>

        )
    }
}

export default EvalRestaurantPage;