import React, {Component} from 'react';
import {Link, Route, NavLink, Switch} from 'react-router-dom';
import { Icon } from 'antd';

export const Pencil = (props) => (
    <div className='widget'>
        <Icon type='edit' style={{color:'#333', fontSize:18}}/>
    </div>
);

export const Clip = (props) => (
    <div className='widget'>
        <Icon type='paper-clip' style={{color:'#333', fontSize:18}}/>
    </div>
);

export class PoolAction extends Component{
    constructor(props){
        super(props);
    }
    handleDrop(){
        this.props.drop(`it dropped!`);
    }
    handleTop(){
        this.props.top(`it on top!`);
    }
    handleUse(){
        this.props.use(`it be used!`);
    }
    render(){
        return (
            <div className="widget-action">
                <li onClick={this.handleDrop.bind(this)}>Drop</li>
                <li onClick={this.handleTop.bind(this)}>Top</li>
                <li onClick={this.handleUse.bind(this)}>Use</li>
            </div>
        )
    }
}