import React, {Component} from 'react';
import { Icon } from 'antd';
import io from 'socket.io-client';
/*reports数据只要通过props更新即可，
* 不必在这个子组件中使用state维护reports，
* 只要在父组件中将props与父组件的state绑定，再更新这个state即可实时渲染这个子组件。*/
class Pool extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }
    componentDidMount(){
        //
    }
    handleUse(e){
        this.props.useTargetReport(e.target.title, this.props.reportsData); //用原生的DOM元素，不能自定义特性，这里使用通用的title来标记每个按钮的id。
    }
    handleTop(e){
        this.props.onTop(e.target.title);
    }
    handleDrop(e){
        this.props.onDrop(e.target.title);
    }

    componentWillUnmount(){
        //TODO:如何决定是否需要从localStorage恢复数据。
        //TODO:业务数据应该在数据库与socket之间同步，不要存储到local，否则会增加复杂度。
        //TODO:localStorage应该只存储用户信息，维持登录状态。以及记录应用的生命周期信息。
    /*当组件被卸载时，在localStorage中改变组件的状态属性 如poolStatus:unmounted,
    * 当组件挂载时，检查localStorage中的status属性，根据其值决定是否要将localStorage中的
    * localReports通过reducer加入到redux的store中。
    * 也就是说，组件挂载时，先检查其状态，再决定是否需要从localStorage恢复数据。*/
    }

    render(){
        if(this.props.reportsData){
            return (
                <div>
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