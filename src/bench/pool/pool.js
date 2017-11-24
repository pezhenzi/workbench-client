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
        const {cardsList} = this.props;
        const value = cardsList.findIndex((item) => item.reportId === e.target.title);
        console.log(value);
        if(cardsList.length === 0){
            this.props.showEditorCreate();
            this.props.getCurrentReport(e.target.title);
            this.home.emit('use target report', {reportId:e.target.title});
        } else if(cardsList.length > 0 && value === -1){
            this.props.showEditorCreate();
            this.props.getCurrentReport(e.target.title);
            this.home.emit('use target report', {reportId:e.target.title});
        } else{
            alert(`该报题以被置入选题列表，不能重复操作。`);
        }
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