import React, {Component} from 'react';
import {Link, Route, NavLink, Switch} from 'react-router-dom';
import Header from '../home/header';
import { Menu, Icon, Button, Modal, Input, Upload, message, } from 'antd';
import Pool from './pool/pool';
import Flow from './pool/flow';
import Members from './pool/members';
import Card from './cards/card';
import io from 'socket.io-client';

function idGenerator(user,id){
    return id ? `${user}${Date.now()}${id}` : `${user}${Date.now()}`;
}

class Workbench extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardData:[],
            visible:false,
            reports:[],
            usedId:[],
        };
        this.home = io.connect('http://10.10.60.47:3000');  //在constructor中说明属性，要加this.
    }

    componentDidMount(){
        let that = this;
        console.log(this.props.testBenchData);
        console.log(this.props.title);
        this.props.testBenchDispatch();
        this.home.on('news', function(data){
            console.log(data);

        });
        this.home.emit('from react', {msg:`thi is one message come from react client.`});
        this.home.on('new report from others', function(data){
            console.log(data);
            that.setState((prevState)=>{
                return {
                    reports:[...prevState.reports, data],
                }
            });
        });
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = (e) => {
        let reportFormData = {
            title:this.titleInput.value,
            content:this.contentInput.value,
            author:`someone`,
            reportId:idGenerator('libai'),
        };
        this.home.emit('add report', reportFormData);
        this.setState((prevState,props)=>{
            return {
                visible: false,
                reports:[...prevState.reports, reportFormData],
            }
        }, ()=>{console.log(this.state.reports);});

        this.props.testAddReport(reportFormData);
        this.reportForm.reset();
    };
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
        this.reportForm.reset();
    };
    handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]:value,
        });
    };

    //选取目标项目，将其添加到卡片列表中。
    handleOnUse(id){
        const usedReports = this.state.reports;
        let targetReport = usedReports.filter((item) => {
            //开始这里打算使用find方法，传入id作为参数，报错为id不是函数。
            //find方法的参数其实是一个函数，指定一个查询条件，不是一个字面量。
            //所以这里用indexOf方法更合适。
            //======!!!此处亦可用find或findIndex方法，参见下面的handleOnTop函数。
            return Object.values(item).indexOf(id) !== -1;
        });
        if(this.state.usedId.indexOf(id) === -1){
            this.setState((prevState, props) => {
                return {
                    cardData:[...prevState.cardData, ...targetReport],
                    usedId:[...prevState.usedId, id],
                };
            },()=>{console.log(this.state.cardData)});
        } else{
            alert(`This report has used!`);
        }

    }
    //将目标项目置顶。注意，这里用数组的findIndex方法找到数组的元素中包含参数id值的那个元素的索引。此方法比filter方法更简洁。
    handleOnTop(id){
        let targetReportIndex = this.state.reports.findIndex((item,i) => item.reportId === id);
        let targetReport = this.state.reports[targetReportIndex];
        this.setState((prevState) => {
            prevState.reports.splice(targetReportIndex, 1);
            return {
                reports:[targetReport, ...prevState.reports],
            }
        }, ()=>{console.log(this.state.reports)})
    }
    //从reports列表中删除目标项目
    handleOnDrop(id){
        let targetReportIndex = this.state.reports.findIndex((item,i) => item.reportId === id);
        this.setState((prevState) => {
            prevState.reports.splice(targetReportIndex, 1);
            return {
                reports:[...prevState.reports],
            }
        })
    }
    render(){
        const { TextArea } = Input;
        const props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <div>
                <Header/>
                <div className="header-btn-group">
                    <Button ghost onClick={this.showModal}>我要报题</Button>
                    <Button ghost>归档区</Button>
                    <Button ghost>拖延区</Button>
                </div>

                {/*用户填写报题信息的对话框*/}
                <Modal
                    title="填写详细报题信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    className='report-modal'
                    width='50%'
                >
                    <div className="report-from-wrap">
                        <form ref={(form) => this.reportForm = form}>
                            <div className='report-modal-input-wrap'>
                                <div className='report-modal-input-label'><p>标题</p></div>
                                <div className="report-modal-input">
                                    <input type="text" name='title' required
                                           ref={(input) => this.titleInput = input}
                                    />
                                </div>
                            </div>
                            <div className='report-modal-input-wrap'>
                                <div className='report-modal-input-label'><p>内容</p></div>
                                <div className="form-group report-modal-input">
                                    <textarea rows="8" required name='content'
                                              ref={(textarea) => this.contentInput = textarea}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>

                <div className="bench-main">
                    {/*选题池、操作流和成员列表*/}
                    <div className="pool-container">
                        <Menu mode="horizontal">
                            <Menu.Item key="mail">
                                <NavLink to='/bench/pool'><Icon type="database" />pool</NavLink>
                            </Menu.Item>
                            <Menu.Item key="app">
                                <NavLink to='/bench/flow'><Icon type="flag" />flow</NavLink>
                            </Menu.Item>
                            <Menu.Item key="user">
                                <NavLink to='/bench/members'><Icon type="user" />members</NavLink>
                            </Menu.Item>
                        </Menu>
                        {/*注意在react-router中向Route要渲染的子组件传递props的方法。*/}
                        <Route path='/bench/pool'
                               component={() => <Pool
                                   reports={this.state.reports}
                                   onUse={this.handleOnUse.bind(this)}
                                   onTop={this.handleOnTop.bind(this)}
                                   onDrop={this.handleOnDrop.bind(this)}

                               />} />
                        <Route path='/bench/flow' component={Flow}/>
                        <Route path='/bench/members' component={Members}/>
                    </div>

                    {/*处理题目的卡片工作区*/}
                    <div className="cards-board">
                        {this.state.cardData.map((item,index) => {
                            return <Card data={item} key={index}/>;
                        })}
                    </div>
                </div>
                <Link className="return-home" to="/">{this.props.title}</Link>
            </div>
        )
    }
}

export default Workbench;