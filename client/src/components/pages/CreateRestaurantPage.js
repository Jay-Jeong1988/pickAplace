import React, { Component } from 'react';
import { Restaurant } from '../../lib/requests';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chosen from '../Chosen';
import AddressAutoComplete from '../AddressAutoComplete';

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

            <main className="CreateRestaurantPage container mx-auto" style={{margin: '30px'}}>
                <form onSubmit={this.createRestaurant} className="mx-auto" style={{width: '60%'}}>
                    <div className="form-group">
                        <label className="form-control" htmlFor="name"><h3>Restaurant Name</h3>
                            <input className="form-control" type='text' name="name"/>
                        </label>
                    </div>
                    <div className="form-group text-center">
                        <Chosen placeholder="select restaurant type" className="Chosen-select" name="type" onChange={ value => console.log(value) } >
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
                        <label className="form-control" htmlFor="address"><h3>Restaurant Address</h3>
                            <AddressAutoComplete name="address" className="form-control" />
                        </label>
                    </div>
                        <label className="form-control" htmlFor="phone_number"><h3>Restaurant Phone Number</h3>
                            <input className="form-control" type='text' name="phone_number"/>
                        </label>
                    <div className="form-group">
                        <label className="form-control" htmlFor="website_url"><h3>Restaurant Website Url</h3>
                            <input className="form-control" type='text' name="website_url"/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="form-control" htmlFor="imgUrl"><h3>Restaurant Logo Url</h3>
                            <input className="form-control" type='text' name="imgUrl"/>
                        </label>
                    </div>

                    <input className="form-control btn btn-outline-success" type='submit' value="Add restaurant" />
                </form>
            </main>
        )
    }
}

export default CreateRestaurantPage;