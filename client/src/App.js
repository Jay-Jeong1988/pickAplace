import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import SearchRestaurantsPage from './components/pages/SearchRestaurantsPage(chosen-js)';
import EvalRestaurantsPage from './components/pages/EvalRestaurantPage';

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


  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact render={ res => <h1>Hi</h1>}/>
          <Route path="/sign_up" exact component={SignUpPage} />
          <Route path="/sign_in" exact component={SignInPage} />
          <Route path="/search_rests" exact component={SearchRestaurantsPage} />
          <Route path="/eval_rest/:id" exact component={EvalRestaurantsPage} />
        </div>
      </Router>
    );
  }
}

export default App;
