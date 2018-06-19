import React, { Component } from 'react';
import Chosen from '../Chosen';
import { Restaurant } from '../../lib/requests';

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
                <Chosen className="Chosen-select" onChange={ value => console.log(value) }>
                    {    
                        restaurants.map( restaurant => {

                            return restaurant ?
                                ( <option key={restaurant.id}>{ restaurant.name }</option> )
                                :
                                null
                        })

                    }
                </Chosen>
            </main>
        );
    }
}


export default SearchRestaurantsPage;