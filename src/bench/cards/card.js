import React, {Component} from 'react';
import bgi from '../../img/circle.png';
import { Icon } from 'antd';
import {Pencil, Clip} from '../../widget';

class Card extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const cardsList = this.props.cardsList;
        return (
            <div className="cards-board-inner">
                {cardsList ?
                    cardsList.map((item, index) => {
                        return (
                            <div className="card-wrap" key={index}>
                                <div className="card-item card-title">
                                    <p>{item.title}</p>
                                </div>
                                <div className="card-item card-content">
                                    <Pencil />
                                    <p>{item.content}</p>
                                </div>
                                <div className="card-item card-members">
                                    <span><img src={bgi} alt=""/>editor</span>
                                    <span><img src={bgi} alt=""/>report</span>
                                    <span><img src={bgi} alt=""/>report</span>
                                    <span><img src={bgi} alt=""/>member</span>
                                </div>
                                <div className="card-item card-document">
                                    <Pencil />
                                    <p>document</p>
                                </div>
                                <div className="card-item card-accessory">
                                    <Clip />
                                    <p>accessory</p>
                                    <ul>
                                        <li><Icon type='star'/>image1.jpg</li>
                                        <li><Icon type='star'/>image2.jpg</li>
                                        <li><Icon type='star'/>image3.jpg</li>
                                    </ul>
                                </div>
                                <div className="card-item card-comments">
                                    <p>comments</p>
                                </div>
                                <div className="card-item card-progress">
                                    <p>progress</p>
                                </div>
                            </div>
                        )
                    }) : <h3>No card</h3>}
            </div>
        )
    }
}

export default Card;