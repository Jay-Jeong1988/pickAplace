import React, { Component } from 'react';
import { User } from '../../lib/requests';
import './SignUpPage.css';

const google = window.google;

class SignUpPage extends Component {

    constructor(props) {
        super(props);
        
        this.createUser = this.createUser.bind(this);
        this.state = {
            errors: []
        }

    }

    componentDidMount() {
        this.autoComplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
    }

    
    createUser(event){
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const newUser = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            password: formData.get('password'),
            password_confirmation: formData.get('password_confirmation'),
            address: formData.get('address')
        }
       

        User.create(newUser).then( res => {
            if(!res.errors){
                localStorage.setItem('jwt', res.jwt);
                this.props.onSignUp();
                this.props.history.push('/');
            }else {
                console.log(res.errors);
                this.setState({
                    errors: res.errors
                })
            }
        })
        
    }

    preventEnterKey = (event) => {
        if( event.which === 13 ) event.preventDefault();
      }

    render() {

        const { errors } = this.state
        return (

            <main className="SignUpPage">
                <form onSubmit={this.createUser}>

                    <div className="form-group mx-auto">
                        <label htmlFor="first_name">First Name</label>
                        <input className="form-control" id="first_name" name="first_name" />
                    {
                        errors.map( (error, index) => {
                            return (error.param === 'first_name') ?
                            <p key={index}>{ error.msg }</p>
                            :
                            ''
                        })
                    }
                    </div>

                    <div className="form-group mx-auto">
                        <label htmlFor="last_name">Last Name</label>
                        <input className="form-control" id="last_name" name="last_name"/>
                    {
                        errors.map( (error, index) => {
                            return (error.param === 'last_name') ?
                            <p key={index}>{ error.msg }</p>
                            :
                            ''
                        })
                    }
                    </div>

                    <div className="form-group mx-auto">
                        <label htmlFor='email'>Email</label>
                        <input className="form-control" type='email' name="email" id="email"/>
                    {
                        errors.map( (error, index) => {
                            return (error.param === 'email') ?
                            <p key={index}>{ error.msg }</p>
                            :
                            ''
                        })
                    }
                    </div>

                    <div className="form-group mx-auto">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type='password' id='password' name='password'/>
                    {
                        errors.map( (error, index) => {
                            return (error.param === 'password') ?
                            <p key={index}>{ error.msg }</p>
                            :
                            ''
                        })
                    }
                    </div>
                    
                    <div className="form-group mx-auto">
                        <label htmlFor="password_confirmation">Password Confirmation</label>
                        <input className="form-control" type="password" id="password_confirmation" name="password_confirmation"/>
                    {
                        errors.map( (error, index) => {
                            return (error.param === 'password_confirmation') ?
                            <p key={index}>{ error.msg }</p>
                            :
                            ''
                        })
                    }
                    </div>
                    
                    <div className="form-group mx-auto">
                        <label htmlFor="autocomplete">Address</label>
                        <input className="form-control" type="address" id="autocomplete" name="address" onKeyDown={this.preventEnterKey}/>
                    {
                        errors.map( (error, index) => {
                            return (error.param === 'address') ?
                            <p key={index}>{ error.msg }</p>
                            :
                            ''
                        })
                    }
                    </div>

                    <div className="form-group mx-auto">
                        <input className="form-control btn btn-outline-success" type='submit' value="Sign Up"/>
                    </div>

                </form>
            </main>

        )
    }
}

export default SignUpPage;