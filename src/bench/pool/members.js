import React, {Component} from 'react';
import member1 from '../../img/member1.jpg';
import member2 from '../../img/member2.jpg';
import member3 from '../../img/member3.jpg';
import member4 from '../../img/member4.jpg';

class Members extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div className='members-container'>
                <div className="member-block">
                    <div><img src={member1} alt=""/></div>
                    <div><i>甄泽</i></div>
                </div>
                <div className="member-block">
                    <div><img src={member2} alt=""/></div>
                    <div><i>梁克</i></div>
                </div>
                <div className="member-block">
                    <div><img src={member3} alt=""/></div>
                    <div><i>蓝莓</i></div>
                </div>
                <div className="member-block">
                    <div><img src={member4} alt=""/></div>
                    <div><i>蔡佳</i></div>
                </div>
                <div className="member-block">
                    <div><img style={{borderColor:'#eee'}} src={member1} alt=""/></div>
                    <div><i>黄振</i></div>
                </div>
            </div>
        )
    }
}

export default Members;