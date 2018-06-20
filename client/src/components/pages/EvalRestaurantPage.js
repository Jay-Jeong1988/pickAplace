import React, { Component } from 'react';


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
        const formData = new FormData(e.currentTarget);
        console.log(formData.entries())
        e.currentTarget.reset()
        alert('successfully evaluated');
        this.props.history.push('/search_rests');

    }

    render() {
        const { restaurant } = this.state;

        return (
            <main className="EvalRestaurantPage">
                <div className="restaurant_" >
                    <img src={restaurant.imgUrl}/>
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
                        <label><input type="radio" name="recurrence"/>yes</label>
                    </div>
                    <div>
                        <label><input type="radio" name="recurrence"/>no</label>
                    </div>

                    <input className="btn btn-primary" type="submit" value="Done"/>
                </form>
            </main>

        )
    }
}

export default EvalRestaurantPage;