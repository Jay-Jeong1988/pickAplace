import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select';
import { Restaurant } from '../../lib/requests';


class SearchRestaurantPage extends Component {

    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            selectedOption: ''
        }
    }

    handleChange(selectedOption) {

        this.setState({ selectedOption });
        if(selectedOption) {
            console.log(`Selected: ${selectedOption.name}`);
        }
    }


    render() {
        const { selectedOption } = this.state;

        return (
            <main class="SearchRestaurantPage">
                <div style={{ textAlign: 'center' }}>
                    <Select 
                        name="restaurants"
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={['asdfasdf','asdgasdgasdg','dfs']}
                    />
                </div>
            </main>
        );
    }
}

export default SearchRestaurantPage;