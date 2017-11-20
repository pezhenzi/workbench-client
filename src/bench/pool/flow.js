import React, {Component} from 'react';

class Flow extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div style={{display:this.props.display}}>
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