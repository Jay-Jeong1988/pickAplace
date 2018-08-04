import React, { Component } from 'react';
import { User } from '../../lib/requests';
import './SignInPage.css';

class SignInPage extends Component {

    constructor(props) {
        super(props)

        this.signIn = this.signIn.bind(this)
        this.state = {
            errors: []
        }
    }

    signIn(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const login = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        User.signIn(login).then( res => {
            if(!res.errors) {
                localStorage.setItem('jwt', res.jwt);
                this.props.onSignIn();
                this.props.history.push('/')
            }else{
                this.setState({
                    errors: res.errors
                })
            }
        })
    }

    render() {
        const { errors } = this.state;
        return (

            <main className='SignInPage'>
                <form onSubmit={this.signIn}>
                    {
                        errors.map( ( error, index) => {
                            return ( 
                                error ? 
                                <div className="mx-auto" key={index}>
                                    <p style={{color: 'red'}}>{error.unauthorized}</p>
                                </div>
                                :
                                ''
                            )
                        })
                    }
                    <div className="mx-auto form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" id='email' name="email"/>
                    </div>
                    <div className="mx-auto form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" id="password" name="password"/>
                    </div>
                    <div className="mx-auto form-group">
                        <input className="form-control btn btn-outline-success" type="submit" value="Sign In"/>
                    </div>
                </form>
            </main>
        )
    }
}

export default SignInPage;