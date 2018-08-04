import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import SearchRestaurantsPage from './components/pages/SearchRestaurantsPage';
import EvalRestaurantsPage from './components/pages/EvalRestaurantPage';
import LookUpRestaurantsPage from './components/pages/LookUpRestaurantsPage';
import CreateRestaurantPage from './components/pages/CreateRestaurantPage';
import Navbar from './components/Navbar';
import jwtDecode from 'jwt-decode';
import HomePage from './components/pages/HomePage';
import { User } from './lib/requests';
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

  guestSignIn = () => {
    const login = {
      email: 'admin@admin.com',
      password: 'admin'
    }
    User.signIn(login).then( res => {
      if(!res.errors) {
          localStorage.setItem('jwt', res.jwt);
          this.saveUser();
      }else{
          this.setState({
              errors: res.errors
          })
      }
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
        <Navbar user={this.state.user} signOut={this.signOut} guestSignIn={this.guestSignIn}/>
          <Route path="/" exact component={HomePage}/>
          <Route path="/sign_up" render={ props => <SignUpPage {...props} onSignUp={this.saveUser} /> }/>
    <Route path="/sign_in" render={ props => <SignInPage {...props} onSignIn={this.saveUser} /> }/>
          <Route path="/search_rests" exact component={SearchRestaurantsPage} />
          <Route path="/eval_rest/:id" exact component={EvalRestaurantsPage} />
          <Route path="/restaurants" exact component={LookUpRestaurantsPage} />
          <Route path="/add_restaurant" exact component={CreateRestaurantPage} />
        </div>
      </Router>
    );
  }
}

export default App;
