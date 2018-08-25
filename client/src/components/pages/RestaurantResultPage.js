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
        const params = this.props.match.params.options.split(',');
        let type = params.splice(0, 1)[0]
        type = type.charAt(0).toUpperCase() + type.slice(1);
        const options = params.slice(1);
        
        if( options.includes('hygiene') ) options[options.indexOf('hygiene')] = 'luxury';
        Restaurant.request_ten(options, 20, type).then( data => {
            this.setState({
                restuarants: data
            })
        })

    }

    render() {

        return (
            <main className="RestaurantResultPage">
                
            </main>
        )
    }
}

export default RestaurantResultPage;