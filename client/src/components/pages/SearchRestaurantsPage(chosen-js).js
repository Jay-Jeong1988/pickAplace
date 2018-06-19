import React, { Component } from 'react';
import Chosen from '../Chosen';
import { Restaurant } from '../../lib/requests';
import { Button } from 'reactstrap';

class SearchRestaurantsPage extends Component {

    constructor(props) {

        super(props);
        this.state = {
            restaurants: null
        }
    }

    componentDidMount() {
        const restaurants = Restaurant.all()
        restaurants.then( rests => {
            this.setState({
                restaurants: rests
            })
        })
    }

    render() {
        const { restaurants } = this.state;

        if( !restaurants ) return null;

        return (
            <main className="SearchRestaurantsPage" style={{textAlign: 'center'}}>
                <form className="evalRestaurant" onSubmit={this.redirectToEvalPage}>
                    <Chosen className="Chosen-select" onChange={ value => console.log(value) }>
                        <option></option>
                        {    
                            restaurants.map( restaurant => {

                                return restaurant ?
                                    ( 
                                    <option key={restaurant.id} style={{backgroundImage: `url(${restaurant.imgUrl})`, backgroundSize: '18px', backgroundPosition: '97%', backgroundRepeat: 'no-repeat'}}>
                                        { `${restaurant.name.charAt(0).toUpperCase() + restaurant.name.slice(1)}`}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        {restaurant.address}
                                    </option> 
                                    )
                                    :
                                    null
                            })

                        }
                    </Chosen>
                    <Button color='danger'><input type="submit" value="Want to evaluate the restaurant?"/></Button>
                </form>
            </main>
        );
    }
}


export default SearchRestaurantsPage;