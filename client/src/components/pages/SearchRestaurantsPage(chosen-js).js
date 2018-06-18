import React, { Component } from 'react';
import RestaurantsSelect from '../RestaurantsSelect';

class SearchRestaurantsPage extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        return (
            <main className="SearchRestaurantsPage" style={{textAlign: 'center'}}>
                <RestaurantsSelect />
            </main>
        )
    }
}

export default SearchRestaurantsPage;