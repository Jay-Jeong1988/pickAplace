import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import SearchRestaurantsPage from './components/pages/SearchRestaurantsPage(chosen-js)';
import EvalRestaurantsPage from './components/pages/EvalRestaurantPage';
import Graphics from './components/Graphics';
import CreateRestaurantPage from './components/pages/CreateRestaurantPage';
import Navbar from './components/Navbar';
import jwtDecode from 'jwt-decode';

class App extends Component {

  state = {
    response: '',
    user: null
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

  onSignUp = () => {
    const jwt = localStorage.getItem('jwt');
    if( jwt ){
      const payload = jwtDecode(jwt);

      this.setState({
        response: '',
        user: payload
      })
    }

  }


  render() {
    return (
      <Router>
        <div className="App">
        <Navbar />
          <Route path="/" exact render={ res => <h1>Hi</h1>}/>
          <Route path="/sign_up" render={ props => <SignUpPage {...props} onSignUp={this.onSignUp} /> }/>
          <Route path="/sign_in" exact component={SignInPage} />
          <Route path="/search_rests" exact component={SearchRestaurantsPage} />
          <Route path="/eval_rest/:id" exact component={EvalRestaurantsPage} />
          <Route path="/restaurants" exact component={Graphics} />
          <Route path="/add_restaurant" exact component={CreateRestaurantPage} />
        </div>
      </Router>
    );
  }
}

export default App;
