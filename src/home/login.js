import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="login-form">
                <p>Login Form</p>
            </div>
        )
    }
}

export default Login;