import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Flow extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <div className='flow-block'>
                    <div><time>{new Date().toLocaleTimeString()}</time></div>
                    <div><i>some member</i> do something,this is a recorder.</div>
                </div>
                <div className='flow-block'>
                    <div><time>{new Date().toLocaleTimeString()}</time></div>
                    <div><i>some member</i> do something,this is a recorder.</div>
                </div>
                <div className='flow-block'>
                    <div><time>{new Date().toLocaleTimeString()}</time></div>
                    <div><i>some member</i> do something,this is a recorder.</div>
                </div>
                <div className='flow-block'>
                    <div><time>{new Date().toLocaleTimeString()}</time></div>
                    <div><i>some member</i> do something,this is a recorder.</div>
                </div>
                <div className='flow-block'>
                    <div><time>{new Date().toLocaleTimeString()}</time></div>
                    <div><i>some member</i> do something,this is a recorder.</div>
                </div>
                <div className='flow-block'>
                    <div><time>{new Date().toLocaleTimeString()}</time></div>
                    <div><i>some member</i> do something,this is a recorder.</div>
                </div>
            </div>
        )
    }
}

export default Flow;