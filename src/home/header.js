import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'antd';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        console.log(this.props.name);
    }
    handleLogin(e){
        this.props.handleLogin(`login`);
    }
    handleRegister(e){
        this.props.handleRegister(`register`);
    }
    handleLogout(e){
        this.props.logout(this.props.token);
    }

    render(){
        return (
            <header>
                <h1>This is common header</h1>
                <div className='log-btn'>
                    <Link to={this.props.token ? '#' : '/login'} >
                        <li
                            onClick={this.props.token ? '' : this.handleLogin.bind(this)}
                        >
                            {this.props.name ? this.props.name : `登录`}
                        </li>
                    </Link>
                    <Link to={this.props.token ? '#' : '/register'}>
                        <li onClick={this.props.token ? this.handleLogout.bind(this) : this.handleRegister.bind(this)}>
                            {this.props.token ? `登出` : `注册`}
                        </li>
                    </Link>

                </div>
            </header>
        )
    }
}

export default Header;