import React, { Component } from 'react';
import { User } from '../../lib/requests';

class SignInPage extends Component {

    constructor(props) {
        super(props)

        this.signIn = this.signIn.bind(this)
        
    }

    signIn(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const login = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        User.signIn(login).then( res => {
            if(res.status === 200) {
                this.props.history('/')
            }else{
                console.log(res.errors)
            }
        })
    }

    render() {

        return (

            <main className='SignInPage'>
                <form onSubmit={this.signIn}>
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