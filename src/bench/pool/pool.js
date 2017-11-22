import React, {Component} from 'react';
import {Icon, Button, Modal} from 'antd';
import io from 'socket.io-client';
/*reports数据只要通过props更新即可，
* 不必在这个子组件中使用state维护reports，
* 只要在父组件中将props与父组件的state绑定，再更新这个state即可实时渲染这个子组件。*/
class Pool extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
        this.home = io.connect('http://10.10.60.47:3000');
    }
    componentDidMount(){
        //
    }
    handleUse(e){
        //用原生的DOM元素，不能自定义特性，这里使用通用的title来标记每个按钮的id。
        this.props.showEditorCreate();
        this.props.useTargetReport(e.target.title, this.props.reportsData);
        this.peops.getCurrentReport(e.target.reportId);
        this.home.emit('use target report', {reportId:e.target.title});
    }
    handleTop(e){
        this.props.topTargetReport(e.target.title);
        this.home.emit('top target report', {reportId:e.target.title});
    }
    handleDrop(e){
        this.props.dropTargetReport(e.target.title);
        this.home.emit('drop target report', {reportId:e.target.title});
    }

    render(){
        if(this.props.reportsData){
            return (
                <div style={{display:this.props.display}}>
                    {this.props.reportsData.map((item,index) =>
                        <div className='pool-block' key={index}>
                            <div className="widget-action">
                                <li title={item.reportId} onClick={this.handleDrop.bind(this)}>Drop</li>
                                <li title={item.reportId} onClick={this.handleTop.bind(this)}>Top</li>
                                <li title={item.reportId} onClick={this.handleUse.bind(this)}>Use</li>
                            </div>
                            <div><b>{item.title}</b></div>
                            <div>{item.content}</div>
                            <div><Icon type='user'/><i>{item.author}</i></div>
                        </div>
                    )}
                </div>
            );
        } else{
            return (<div>no data</div>);
        }
    }
}

export default Pool;