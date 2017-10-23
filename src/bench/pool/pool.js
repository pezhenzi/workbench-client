import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Icon } from 'antd';
/*reports数据只要通过props更新即可，
* 不必在这个子组件中使用state维护reports，
* 只要在父组件中将props与父组件的state绑定，再更新这个state即可实时渲染这个子组件。*/
class Pool extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    handleUse(e){
        this.props.onUse(e.target.title); //用原生的DOM元素，不能自定义特性，这里使用通用的title来标记每个按钮的id。
    }
    handleTop(e){
        this.props.onTop(e.target.title);
    }
    handleDrop(e){
        this.props.onDrop(e.target.title);
    }
    componentDidMount(){
        console.log(this.props);
    }

    render(){
        let used = this.props.used;
        let dropped = this.props.dropped;
        let topped = this.props.topped;
        if(this.props.reports){
            return (
                <div>
                    {this.props.reports.map((item,index) =>
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
            )
        } else{
            return <div><span>No data</span></div>
        }

    }
}

export default Pool;