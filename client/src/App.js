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
import About from './components/About';
import LandingSlider from './components/LandingSlider';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: '',
      user: null
    }

    this.menu_bar = false;
    this.about = false;
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
        
        landingSlider.classList.add('erase');
        for(let node of landingImages){
            node.parentNode.style.display = 'block';
            node.classList.add('erase');
        }
        navbar.classList.add('showNavbar');

        setTimeout(function() {
            landingSlider.remove();
        }, 2000);
    }

  render() {
    return (
      <div className="App" onClick={this.hideMenu}>
        <LandingSlider redirectToHome={this.redirectToHome}/>
        <About />
        <Router>
          <div className="routes">
            <Navbar user={this.state.user} toggleMenu={this.toggleMenu}/>
            <LeftNavbar user={this.state.user} toggleAbout={this.toggleAbout} toggleMenu={this.toggleMenu} signOut={this.signOut} guestSignIn={this.guestSignIn}/>
            <Route path="/home" exact component={HomePage}/>
            <Route path="/sign_up" render={ props => <SignUpPage {...props} onSignUp={this.saveUser} /> }/>
            <Route path="/sign_in" render={ props => <SignInPage {...props} onSignIn={this.saveUser} /> }/>
            <Route path="/search_rests" exact component={SearchRestaurantsPage} />
            <Route path="/eval_rest/:id" exact component={EvalRestaurantsPage} />
            <Route path="/restaurants" exact component={LookUpRestaurantsPage} />
            <Route path="/add_restaurant" exact component={CreateRestaurantPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
