import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../home/header';

class Message extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div>
                <Header/>
                <h1>this is workbench</h1>
                <Link className="return-home" to="/">Go Back</Link>
            </div>
        )
    }
}

export default Message;