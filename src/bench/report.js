import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Icon } from 'antd';

class Report extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="report-container">
                <div className="report-background" />
                <div className="report-form">
                    <h3>请填写报题信息</h3>
                    <form action="">

                    </form>
                </div>

            </div>
        )
    }
}