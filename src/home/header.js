import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'antd';

class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <header>
                <h1>This is common header</h1>
            </header>
        )
    }
}

export default Header;