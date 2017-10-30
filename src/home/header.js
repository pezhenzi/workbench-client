import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'antd';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    handleLogin(e){
        this.props.handleLogin(`login`);
    }
    handleRegister(e){
        this.props.handleRegister(`register`);
    }

    render(){
        return (
            <header>
                <h1>This is common header</h1>
                <div className='log-btn'>
                    <Link to='/login' >
                        <li onClick={this.handleLogin.bind(this)}>登录</li>
                    </Link>
                    <Link to='/register'>
                        <li onClick={this.handleRegister.bind(this)}>注册</li>
                    </Link>

                </div>
            </header>
        )
    }
}

export default Header;