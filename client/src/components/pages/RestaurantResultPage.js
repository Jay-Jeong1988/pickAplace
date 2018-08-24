import React, {Component} from 'react';
import { Restaurant } from '../../lib/requests';
import $ from 'jquery';

class RestaurantResultPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurants: []
        }
    }

    componentDidMount(){
        document.querySelector('.Navbar').style.height = '8.5vh';
        if( $('.modal-backdrop') ) $('.modal-backdrop').remove(); 
        const options = this.props.match.params.options.split(',');
        console.log(options)

    }

    render() {

        return (
            <main className="RestaurantResultPage">
                
            </main>
        )
    }
}

export default RestaurantResultPage;