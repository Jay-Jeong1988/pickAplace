import React, { Component } from 'react';
import { Evaluation } from '../../lib/requests';

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
        })
        // e.currentTarget.reset()
        // alert('successfully evaluated');
        // localStorage.removeItem('restaurant');
        // this.props.history.push('/search_rests');

    }

    render() {
        const { restaurant } = this.state;

        return (
            <main className="EvalRestaurantPage">
                <div className="restaurant_" >
                    <img src={restaurant.imgUrl} alt="brand_logo"/>
                    <h5>{restaurant.type} restaurant</h5>
                    <h5>{restaurant.address}</h5>
                    <h5>{restaurant["phone number"]}</h5>
                    <h5>{restaurant.website_url}</h5>
                </div>

                <form onSubmit={this.evaluate}>
                    <label>price<input type="number" name="price"/></label>
                    <label>luxury<input type="number" name="luxury"/></label>
                    <label>taste<input type="number" name="taste"/></label>
                    <label>cozy<input type="number" name="cozy"/></label>
                    <label>loud<input type="number" name="loud"/></label>
                    <label>modern<input type="number" name="modern"/></label>
                    <label>services<input type="number" name="services"/></label>
                    <h4> Do you think you will go to this restaurant again?</h4>
                    <div>
                        <label><input type="radio" name="recurrence" value="true"/>yes</label>
                    </div>
                    <div>
                        <label><input type="radio" name="recurrence" value="false"/>no</label>
                    </div>

                    <input className="btn btn-primary" type="submit" value="Done"/>
                </form>
            </main>

        )
    }
}

export default EvalRestaurantPage;