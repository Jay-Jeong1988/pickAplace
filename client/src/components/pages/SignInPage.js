import React, { Component } from 'react';
import { User } from '../../lib/requests';

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
                this.props.history('/')
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
                                <div key={index}>
                                    <p style={{color: 'red'}}>{error.unauthorized}</p>
                                </div>
                                :
                                ''
                            )
                        })
                    }
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id='email' name="email"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password"/>
                    </div>
                    <div>
                        <input type="submit" value="Sign In"/>
                    </div>
                </form>
            </main>
        )
    }
}

export default SignInPage;