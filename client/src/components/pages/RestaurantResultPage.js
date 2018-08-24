import React, {Component} from 'react';
import { Restaurant } from '../../lib/requests';

class RestaurantResultPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurants: []
        }
    }

    render() {

        return (
            <main className="RestaurantResultPage">
            
            </main>
        )
    }
}

export default RestaurantResultPage;