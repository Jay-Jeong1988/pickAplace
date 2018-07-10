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
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  state = {
    response: '',
    user: null
  };

  componentDidMount() {
  //   this.callApi()
  //     .then( res => this.setState({ response: res.express }))
  //     .catch( err => console.log(err));
  // }

  // callApi = async() => {
  //   const response = await fetch('/hello-world');
  //   const body = await response.json();

  //   if ( response.status !== 200 ) throw Error(body.message);

  //   return body;                //ANOTHER WAY TO MAKE ASYNC FUNCTION EXAMPLE
  // };
    
    this.saveUser();
  }

  saveUser = () => {
    const jwt = localStorage.getItem('jwt');
    if( jwt ){
      const payload = jwtDecode(jwt);

      this.setState({
        response: '',
        user: payload
      })
    }

  }

  signOut = () => {
    if( localStorage.getItem('jwt') ){
      localStorage.removeItem('jwt');

      this.setState({
        response: '',
        user: null
      })
    }
  }


  render() {
    return (
      <Router>
        <div className="App">
        <Navbar user={this.state.user} signOut={this.signOut}/>
          <Route path="/" exact render={ res => <h1>Hi</h1>}/>
          <Route path="/sign_up" render={ props => <SignUpPage {...props} onSignUp={this.saveUser} /> }/>
    <Route path="/sign_in" render={ props => <SignInPage {...props} onSignIn={this.saveUser} /> }/>
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
