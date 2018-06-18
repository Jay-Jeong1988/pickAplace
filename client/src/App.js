import React, { Component } from 'react';
import './App.css';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import SearchRestaurantsPage from './components/pages/SearchRestaurantsPage';
import Restaurants from './components/Restaurants';

class App extends Component {

  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then( res => this.setState({ response: res.express }))
      .catch( err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/hello-world');
    const body = await response.json();

    if ( response.status !== 200 ) throw Error(body.message);

    return body;
  };

  // callApi = function(){
  //   return fetch('/hello-world').then( res => res.json() );
  // }


  render() {
    return (
      <div className="App">
        <p className="App-intro">{this.state.response}</p>
        <SignUpPage />
        <SignInPage />
        <Restaurants />
      </div>
    );
  }
}

export default App;
