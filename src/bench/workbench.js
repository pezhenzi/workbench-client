import React, {Component} from 'react';
import {Link, Route, NavLink} from 'react-router-dom';
import HeaderContainer from '../home/headerContainer';
import { Menu, Icon, Button, Modal} from 'antd';
import PoolContainer from './pool/poolContainer';
import Flow from './pool/flow';
import Members from './pool/members';
import CardContainer from './cards/cardContainer';
import io from 'socket.io-client';

function idGenerator(user,id){
    return id ? `${user}${Date.now()}${id}` : `${user}${Date.now()}`;
}

class Workbench extends Component{
    constructor(props){
        super(props);
        this.state = {
            reportModalVisible:false,
            reports:[],
            usedId:[],
            poolDisplay:'block',
            flowDisplay:'none',
            membersDisplay:'none',
        };
        this.home = io.connect('http://10.10.60.47:3000');  //在constructor中声明属性，要加this.
    }

    componentDidMount(){
        console.log(this.props.cardsList);
    }
    showModal = () => {
        this.setState({
            reportModalVisible: true,
        });
    };
    handleOk = (e) => {
        const author = localStorage.user_account || this.props.account || `佚名`;
        let reportFormData = {
            title:this.titleInput.value,
            content:this.contentInput.value,
            author:author,
            reportId:idGenerator(author),
            status:'new',
        };
        this.home.emit('add report', reportFormData);
        this.setState({reportModalVisible: false});
        this.reportForm.reset();
    };
    handleCancel = (e) => {
        this.setState({
            reportModalVisible: false,
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
    handleMenuClick(e){
        console.log(e.key);
        if(e.key === 'pool'){
            this.setState({poolDisplay:'block', flowDisplay:'none', membersDisplay:'none'});
        } else if(e.key === 'flow'){
            this.setState({flowDisplay:'block', poolDisplay:'none', membersDisplay:'none'});
        } else if(e.key === 'members'){
            this.setState({membersDisplay:'block', flowDisplay:'none', poolDisplay:'none'});
        }
    }
    handleEditorOk(e){
        this.props.hiddenEditorCreateModal();
        //TODO:处理card表单
        const cardId = idGenerator(this.props.account);
        let formData = new FormData();
        formData.append('cardId', cardId);
        formData.append('title', this.cardTitleInput.value);
        formData.append('content', this.cardContentInput.value);
        formData.append('author', this.props.currentReport.author);
        formData.append('editor', this.props.name);
        formData.append('editorIdea', this.cardIdeaInput.value);
        formData.append('journalist', this.inviteInput.value);
        formData.append('createTime', Date.now());
        fetch('http://10.10.60.47:3000/card/save-card', {
            method:post,
            body:formData,
            mode:'cors',
        }).then((response) => response.json()).then((response) => console.log(response));
        this.props.addNewCard(formData);
        this.home.emit('add new card', {cardData:formData});
        this.cardForm.reset();
    }
    handleEditorCancel(e){
        this.props.hiddenEditorCreateModal();
        this.cardForm.reset();
    }
    //TODO:新建卡片时，责编编辑内容；卡片active时，其他人添加资料或附件；文章编辑和上传；责编控制项目进度。
    render(){
        const currentReport = this.props.currentReport;
        return (
            <div>
                <HeaderContainer />
                <div className="header-btn-group">
                    <Button ghost onClick={this.showModal}>我要报题</Button>
                    <Button ghost>归档区</Button>
                    <Button ghost>拖延区</Button>
                </div>

                {/*用户填写报题信息的对话框*/}
                <Modal
                    title="填写详细报题信息"
                    visible={this.state.reportModalVisible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    closable={false}
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
                <Modal
                    title="责编填写卡片基本信息"
                    visible={this.props.editorCreateModalVisible}
                    onOk={this.handleEditorOk.bind(this)}
                    onCancel={this.handleEditorCancel.bind(this)}
                    closable={false}
                    className='editor-modal'
                    width='50%'
                >
                    <h3>责编创建卡片，并完善信息。</h3>
                    <div className="report-from-wrap">
                        <form ref={(form) => this.cardForm = form}>
                            <div className='report-modal-input-wrap'>
                                <div className='report-modal-input-label'><p>标题</p></div>
                                <div className="report-modal-input">
                                    <input type="text" required
                                           ref={(input) => this.cardTitleInput = input}
                                           value={currentReport.title}
                                    />
                                </div>
                            </div>
                            <div className='report-modal-input-wrap'>
                                <div className='report-modal-input-label'><p>内容</p></div>
                                <div className="form-group report-modal-input">
                                    <textarea rows="8" required
                                              ref={(textarea) => this.cardContentInput = textarea}
                                              value={currentReport.content}
                                    />
                                </div>
                            </div>
                            <div className='report-modal-input-wrap'>
                                <div className='report-modal-input-label'><p>报题人</p></div>
                                <div className="report-modal-input">
                                    <p>{currentReport.author}</p>
                                </div>
                            </div>
                            <div className='report-modal-input-wrap'>
                                <div className='report-modal-input-label'><p>项目要求</p></div>
                                <div className="form-group report-modal-input">
                                    <textarea rows="8" required
                                              ref={(textarea) => this.cardIdeaInput = textarea}
                                              placeholder='填写关于该选题的思路、要求、目标等内容。'
                                    />
                                </div>
                            </div>
                            <div className='report-modal-input-wrap'>
                                <div className='report-modal-input-label'><p>邀请记者</p></div>
                                <div className="report-modal-input">
                                    <select required ref={(input) => this.inviteInput = input} multiple={true}>
                                        <option value="attention">后面要从成员列表中读取数据并循环渲染</option>
                                        <option value="admin">李白</option>
                                        <option value="editor">杜甫</option>
                                        <option selected value="journalist">白居易</option>
                                        <option value="reporter">孟浩然</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>

                <div className="bench-main">
                    {/*选题池、操作流和成员列表*/}
                    <div className="pool-container">
                        <Menu mode="horizontal" defaultSelectedKeys={['pool']} onClick={this.handleMenuClick.bind(this)}>
                            <Menu.Item key="pool">
                                <li><Icon type="database" />pool</li>
                            </Menu.Item>
                            <Menu.Item key="flow">
                                <li><Icon type="flag" />flow</li>
                            </Menu.Item>
                            <Menu.Item key="members">
                                <li><Icon type="user" />members</li>
                            </Menu.Item>
                        </Menu>
                        {/*注意在react-router中向Route要渲染的子组件传递props的方法。render一个函数并返回带props的组件*/}
                        <PoolContainer display={this.state.poolDisplay} />
                        <Flow display={this.state.flowDisplay} />
                        <Members display={this.state.membersDisplay}/>

                    </div>

                    {/*处理题目的卡片工作区*/}
                    <div className="cards-board">
                        <CardContainer />
                    </div>
                </div>
                <Link className="return-home" to="/">返回主页</Link>
            </div>
        )
    }
}

export default Workbench;