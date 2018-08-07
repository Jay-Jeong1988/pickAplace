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
import LeftNavbar from './components/LeftNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: '',
      user: null
    }

    this.menu_bar = false;
  }

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

  toggleMenu = () => {
    const app = document.querySelector('.App');
    const closeButton = document.querySelector('.LeftNavbar > .content > .controller > button');
    
    if( this.menu_bar ){
      app.style.transform = 'translateX(0)';
      app.classList.remove('coverApp');
      this.menu_bar = false;
    }else {
      app.style.transform = 'translateX(300px)';
      app.classList.add('coverApp');
      this.menu_bar = true;
    }
  }

  hideMenu = (e) => {
    const app = document.querySelector('.App');

    if( e.target.classList.contains('coverApp') ){
      app.style.transform = 'translate(0)';
      app.classList.remove('coverApp');
      this.menu_bar = false;
    }
  }
    

  render() {
    return (
      <Router>
        <div className="App" onClick={this.hideMenu}>
        <Navbar user={this.state.user} toggleMenu={this.toggleMenu}/>
        <LeftNavbar user={this.state.user} toggleMenu={this.toggleMenu} signOut={this.signOut} guestSignIn={this.guestSignIn}/>
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
