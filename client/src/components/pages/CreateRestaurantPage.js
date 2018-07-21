import React, { Component } from 'react';
import { Restaurant } from '../../lib/requests';
import Chosen from '../Chosen';
import AddressAutoComplete from '../AddressAutoComplete';
import RenderRestaurantDetail from '../RenderRestaurantDetail';

class CreateRestaurantPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurant_types: null,
            photos: null
        }
        this.createRestaurant = this.createRestaurant.bind(this);
    }

    getPhotos =  dataFromAddressAutoComplete  => {
        this.setState({
            restaurant_types: this.state.restaurant_types,
            photos: dataFromAddressAutoComplete.photos,
            geometry: dataFromAddressAutoComplete.geometry,
            opening_hours: dataFromAddressAutoComplete.opening_hours,
            google_rating: dataFromAddressAutoComplete.google_rating
        })
    }

    componentDidMount(){

        Restaurant.types().then( data => {
            this.setState({
                restaurant_types: ['izakaya','french','chinese','korean','franchise','japanese','asian','dimsum','pho','vietnamese','spanish','brazilian','bistro','fine dining','trattoria','seafood','barbeque','fast food','pizzeria','greek','ramen','buffet','food court','steak house','all you can eat','food truck','mongolian', 'breakfast & brunch', 'hamburgers', 'italian']
            })
        })

    }

    createRestaurant(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const params = {
            name: formData.get('name'),
            type: formData.get('type'),
            address: `${formData.get('street_address')}, ${formData.get('city')}, ${formData.get('state')}, ${formData.get('country')}, ${formData.get('zip_code')}`,
            phone_number: formData.get('phone_number'),
            website_url: formData.get('website_url'),
            imgUrl: formData.get('imgUrl')
        }
      
        Restaurant.create(params).then( data => {
            console.log('successfully added a restaurant to database');
            console.log(data);
        })
        event.currentTarget.reset();
        

    }


    render(){
        const {restaurant_types} = this.state;
        const { photos, geometry, google_rating, opening_hours } = this.state;

        if(!restaurant_types) return null;
        
        return (
            
            <main className="CreateRestaurantPage">
                <div className="backgroundImage"></div>

                <RenderRestaurantDetail photos={photos} geometry={geometry} google_rating={google_rating} opening_hours={opening_hours} />

                <form onSubmit={this.createRestaurant} className="restaurant_form">
                    <div className="form-group">
                        <label className="form-control" htmlFor="name"><h3>Restaurant Name</h3>
                            <input className="form-control" type='text' name="name"/>
                        </label>
                    </div>
                    <div className="form-group text-center">
                        <Chosen w="100%" placeholder="select restaurant type" className="Chosen-select" name="type" onChange={ value => console.log(value) } >
                            <option></option>
                            {   
                                restaurant_types.map( data => {
                                    return data ?
                                    (
                                        <option key={restaurant_types.indexOf(data)}>
                                            { data.charAt(0).toUpperCase() + data.slice(1) }
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
                            <AddressAutoComplete callbackFromParent={this.getPhotos}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="form-control" htmlFor="imgUrl"><h3>Restaurant Logo Url</h3>
                            <input className="form-control" type='text' name="imgUrl"/>
                        </label>
                    </div>

                    <input className="form-control btn btn-outline-success submit" type='submit' value="Add restaurant" />
                </form>

            </main>
        )
    }
}

export default CreateRestaurantPage;