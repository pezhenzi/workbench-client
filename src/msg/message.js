import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HeaderContainer from '../home/headerContainer';
import ArticleEditor from '../bench/editor/articleEditor';

class Message extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        const styles = {
            position:'absolute',
            top:'160px',
            left:'20px',
            width:'65%',
            textAlign:'center',
        };
        return (
            <div style={{position:'relative'}}>
                <HeaderContainer />
                <h1>this is workbench</h1>
                <div style={styles}>
                    <ArticleEditor />
                </div>
                <Link className="return-home" to="/">Go Back</Link>
            </div>
        )
    }
}

export default Message;