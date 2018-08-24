import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
import About from './components/About';
import RestaurantResultPage from './components/pages/RestaurantResultPage';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: '',
      user: null,
      isTransitionOver: false,
    }

    this.menu_bar = false;
    this.about = false;
  }

  componentDidMount() {
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
      email: 'guest@idealio.com',
      password: 'asdfasdf'
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
    const about = document.querySelector('.About');
    
    if( this.menu_bar ){
      app.style.transform = null;
      app.classList.remove('coverApp');
      about.style.display = null;
      this.menu_bar = false;
      this.about = false;
    }else {
      app.style.transform = 'translateX(300px)';
      app.classList.add('coverApp');
      this.menu_bar = true;
    }
  }

  hideMenu = (e) => {
    const app = document.querySelector('.App');
    const about = document.querySelector('.About');

    if( e.target.classList.contains('coverApp') ){
      app.style.transform = null;
      app.classList.remove('coverApp');
      about.style.display = 'none';
      this.menu_bar = false;
      this.about = false;
    }else{
      for(let el of document.querySelectorAll('a')){
        if( e.target === el ){
          app.style.transform = null;
          app.classList.remove('coverApp');
          about.style.display = 'none';
          this.menu_bar = false;
          this.about = false;
        }
      }
    }
  }
  
  toggleAbout = () => {
    const about = document.querySelector('.About');

    if( this.about ){
      about.classList.remove('show')
      setTimeout(() => {about.style.display = 'none'}, 500);
      this.about = false;
    }else {
      about.style.display = 'block'
      setTimeout(() => {about.classList.add('show')}, 100);
      this.about = true;
    }
  }

  redirectToHome = (e) => {
      e.preventDefault();
      const landingSlider = document.querySelector('.LandingSlider');
      const landingImages = document.querySelectorAll('.slides > div');
      const navbar = document.querySelector('.Navbar');
      const places = document.querySelector('.Places').children;
      const placeTitles = document.querySelectorAll('.placeTitle');
      
      landingSlider.classList.add('erase');
      for(let node of landingImages){
          node.parentNode.style.display = 'block';
          node.classList.add('erase');
      }
      navbar.classList.add('showNavbar');

      for(let i = 1; i <= places.length; i++){
        setTimeout(() => {
          places[i-1].classList.add('shrinkPlaces');
          placeTitles[i-1].classList.add('show');
          if(i >= places.length -2){
            this.setState({
              ...this.state,
              isTransitionOver: true
            })
          }
        }, i * 800)
      }

      setTimeout(function() {
          landingSlider.remove();
      }, 2000);
  }

  render() {
    return (
      <Router>
        <div className="App" onClick={this.hideMenu}>  
          <About />
          <Navbar user={this.state.user} toggleMenu={this.toggleMenu}/>
          <div className="routes">
            <LeftNavbar user={this.state.user} toggleAbout={this.toggleAbout} toggleMenu={this.toggleMenu} signOut={this.signOut} guestSignIn={this.guestSignIn}/>
            <Route path="/" exact render={ props => <HomePage {...props} redirectToHome={this.redirectToHome} isTransitionOver={this.state.isTransitionOver} /> }/>
            <Route path="/sign_up" render={ props => <SignUpPage {...props} onSignUp={this.saveUser} /> }/>
            <Route path="/sign_in" render={ props => <SignInPage {...props} onSignIn={this.saveUser} /> }/>
            <Route path="/search_rests" exact component={SearchRestaurantsPage} />
            <Route path="/eval_rest/:id" exact component={EvalRestaurantsPage} />
            <Route path="/restaurants" exact component={LookUpRestaurantsPage} />
            <Route path="/add_restaurant" exact component={CreateRestaurantPage} />
            <Route path="/restaurant_result/:options" exact component={RestaurantResultPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
