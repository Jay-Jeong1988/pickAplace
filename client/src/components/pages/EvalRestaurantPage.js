import React, { Component } from 'react';
import { Evaluation } from '../../lib/requests';
import Modal from '../Modal';
import {Redirect} from 'react-router-dom';
import './EvalRestaurantPage.css';

class EvalRestaurantPage extends Component {

    constructor(props) {
        super(props);
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        this.state = {
            restaurant: restaurant,
            redirect: false
        }
        this.evaluate = this.evaluate.bind(this);
    }

    componentDidMount() {
        document.querySelector('.Navbar').style.height = '8.5vh';
    }

    evaluate( data ) {
        const restaurantId = this.props.match.params.id;
        const evaluation_score = {
            price: Math.round(data['price_score']),
            luxury: Math.round(data['luxury_score']),
            cozy: Math.round(data['cozy_score']),
            modern: Math.round(data['modern_score']),
            loud: Math.round(data['loud_score']),
            taste: Math.round(data['taste_score']),
            services: Math.round(data['services_score']),
            recurrence: Math.round(data['recurrence_score'])
        }
        Evaluation.create(restaurantId, evaluation_score).then( data => {
            console.log(data);
            alert('successfully evaluated');
            localStorage.removeItem('restaurant');
            document.getElementsByClassName('modal-backdrop')[0].remove();
            this.setState({
                ...this.state,
                redirect: true
            })
            // this.props.history.push('/search_rests');
        })

    }

    renderRedirect = () => {
        if(this.state.redirect) return <Redirect to='/search_rests'/>;
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

                <Modal id='modal' evaluate={this.evaluate} />
                {this.renderRedirect()}
            </main>

        )
    }
}

export default EvalRestaurantPage;