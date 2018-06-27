import React, { Component } from 'react';
import { Restaurant } from '../../lib/requests';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chosen from '../Chosen';

class CreateRestaurantPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurant_types: null
        }
        this.createRestaurant = this.createRestaurant.bind(this);
    }

    componentDidMount(){
        Restaurant.types().then( data => {
            this.setState({
                restaurant_types: data
            })
        })

    }

    createRestaurant() {


    }


    render(){
        const {restaurant_types} = this.state;

        if(!restaurant_types) return null;

        return (

            <main className="CreateRestaurantPage">
                <form onSubmit={this.createRestaurant} className="container">
                    <div className="form-group">
                        <label htmlFor="name">Restaurant Name
                            <input className="form-control" type='text' name="name"/>
                        </label>
                    </div>
                    <div className="form-group">
                        <Chosen placeholder="Select type" className="Chosen-select" name="type" onChange={ value => console.log(value) } >
                            <option></option>
                            {   
                                restaurant_types.map( data => {
                                    return data ?
                                    (
                                        <option key={restaurant_types.indexOf(data)}>
                                            { data.type.charAt(0).toUpperCase() + data.type.slice(1) }
                                        </option>
                                    )
                                    :
                                    null
                                })
                            }
                        </Chosen>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Restaurant Address
                            <input className="form-control" type='text' name="address"/>
                        </label>
                    </div>
                        <label htmlFor="phone_number">Restaurant Phone Number
                            <input className="form-control" type='text' name="phone_number"/>
                        </label>
                    <div className="form-group">
                        <label htmlFor="website_url">Restaurant Website Url
                            <input className="form-control" type='text' name="website_url"/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="imgUrl">Restaurant Logo Url
                            <input className="form-control" type='text' name="imgUrl"/>
                        </label>
                    </div>

                    <input type='submit' value="Add restaurant" />
                </form>
            </main>
        )
    }
}

export default CreateRestaurantPage;