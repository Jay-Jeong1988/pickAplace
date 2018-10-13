import React, {Component} from 'react';
import { Evaluation } from '../../lib/requests';
import $ from 'jquery';
import './RestaurantResultPage.css';

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
        Evaluation.request_ten(options, 20, type).then( data => {
            this.setState({
                restaurants: data
            })
        })

    }

    render() {
        const { restaurants } = this.state;

        return (
            <main className="RestaurantResultPage wrapper">
                <ol className="results">
                    {
                        restaurants.map( (restaurant,i) => {
                            return restaurant ? (
                                <li key={i} className="list-item">
                                    <div className="list-content">
                                        <div className="logo">
                                            {
                                                restaurant.imgUrl ?
                                                <img src={restaurant.imgUrl} style={{width: '50px', height: '50px'}} alt="restaurant_image"/>
                                                :
                                                <div style={{width: '50px', height: '50px'}}></div>
                                            }
                                        </div>
                                        <h2 className="title">{restaurant.name.charAt(0).toUpperCase() + restaurant.name.slice(1)}</h2>
                                        <div className="detail"></div>
                                    </div>
                                </li>
                            )
                            :
                            ''
                        })
                    }
                </ol>
            </main>
        )
    }
}

export default RestaurantResultPage;