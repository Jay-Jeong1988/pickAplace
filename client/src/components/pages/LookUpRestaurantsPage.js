import React, {Component} from 'react';
import './LookUpRestaurantsPage.css';
import Graphics from '../Graphics';

class LookUpRestaurantsPage extends Component {

    componentDidMount() {
        document.querySelector('.Navbar').style.height = '8.5vh';
    }
    
    render() {

        return (
            <main className="LookUpRestaurantsPage">
                <Graphics />
            </main>
        )
    }
}

export default LookUpRestaurantsPage;