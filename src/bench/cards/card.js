import React, {Component} from 'react';
//import {Link, Route, NavLink, Switch} from 'react-router-dom';
import bgi from '../../img/circle.png';
import { Icon } from 'antd';
import {Pencil, Clip} from '../../widget';

class Card extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const {title, content, document, accessory, comments, progress} = this.props.data;
        return (
            <div className="card-wrap">
                <div className="card-item card-title">
                    <p>{title}</p>
                </div>
                <div className="card-item card-content">
                    <Pencil />
                    <p>{content}</p>
                </div>
                <div className="card-item card-members">
                    <span><img src={bgi} alt=""/>editor</span>
                    <span><img src={bgi} alt=""/>report</span>
                    <span><img src={bgi} alt=""/>report</span>
                    <span><img src={bgi} alt=""/>member</span>
                </div>
                <div className="card-item card-document">
                    <Pencil />
                    <p>{document}</p>
                </div>
                <div className="card-item card-accessory">
                    <Clip />
                    <p>{accessory}</p>
                    <ul>
                        <li><Icon type='star'/>image1.jpg</li>
                        <li><Icon type='star'/>image2.jpg</li>
                        <li><Icon type='star'/>image3.jpg</li>
                    </ul>
                </div>
                <div className="card-item card-comments">
                    <p>{comments}</p>
                </div>
                <div className="card-item card-progress">
                    <p>{progress}</p>
                </div>
            </div>
        )
    }
}

export default Card;