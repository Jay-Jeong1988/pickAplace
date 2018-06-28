import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const google = window.google;



class AddressAutoComplete extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.initialState()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
    this.autoComplete = null;
  }

  componentDidMount() {
    this.autoComplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
    this.autoComplete.addListener('place_changed', this.handlePlaceSelect);

  }

  initialState() {

    return {
      name: '',
      street_address: '',
      city: '',
      state: '',
      country: '',
      zip_code: '',
      googleMapLink: ''
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    this.clearForm();
  }

  handlePlaceSelect(){
    let addressObject = this.autoComplete.getPlace();
    let address = addressObject.address_components;
   
    console.log(address)
    function extractAddressData( component, inputType) {
      for( let property of component ){
        for( let type of property.types ) {
          for( let t of inputType ){
            if( type === t ) return property;
          }
        }
      }
      return '';
    }

    function returnLongName( addressData ){
      if(addressData) return addressData.long_name;
      else return addressData;
    }

    this.setState({
      name: addressObject.name,
      street_address: `${returnLongName(extractAddressData( address, ['street_number','sublocality_level_2']))} - ${returnLongName(extractAddressData( address, ['street_name', 'route', 'sublocality_level_1']))}`,
      city: returnLongName(extractAddressData( address, ['locality'])),
      state: returnLongName(extractAddressData( address, ['administrative_area_level_1'])),
      country: returnLongName(extractAddressData( address, ['country'])),
      zip_code:  returnLongName(extractAddressData( address, ['postal_code'])),
      googleMapLink: addressObject.url
    })
  }



  render() {
    return(
      <main className="AddressAutoComplete container">
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
          <input id="autocomplete"
            className="input-field form-control"
            ref="input"
            type="text"
            />
          </div>

          <div className="form-group">
            <input 
              className="form-control"
              name="street_address"
              value={this.state.street_address}
              placeholder="Street Address"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input 
              name="city"
              className="form-control"
              value={this.state.city}
              placeholder="City"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input
              name="state"
              className="form-control"
              value={this.state.state}
              placeholder="State"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input
              name="country"
              className="form-control"
              value={this.state.country}
              placeholder="Country"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input 
              name="zip_code"
              className="form-control"
              value={this.state.zip_code}
              placeholder="Zipcode"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
            type="submit"
            className="btn btn-outline-success form-control" 
            value="Submit"
            onSubmit={this.handleSubmit}
            />
          </div>
        </form>
      </main>
    )
  }

}

export default AddressAutoComplete;