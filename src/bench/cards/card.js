import React, {Component} from 'react';
import bgi from '../../img/circle.png';
import { Menu, Dropdown, Icon, Modal, Upload, Button } from 'antd';
import {Editor, EditorState} from 'draft-js';
import {Pencil, Clip} from '../../widget';

//TODO：数据持久化到服务端以及通过socket广播出去。
//TODO: 处理富文本编辑器。

class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible:{
                documentVisible:false,
                membersVisible:false,
                articleVisible:false,
                commentVisible:false,
                accessoryVisible:false,
            },
            showedModal:'',
            currentTitle:'',
            editorState:EditorState.createEmpty(),
        };
        this.menu = (
            <Menu>
                <Menu.Item key="0">
                    <div title='members' onClick={this.showModal.bind(this)}>
                        <span title='members'><Icon title='members' type="user-add" /></span>
                        <span title='members'>邀请成员</span>
                    </div>
                </Menu.Item>
                <Menu.Item key="1">
                    <div title='document' onClick={this.showModal.bind(this)}>
                        <span title='document'><Icon title='document' type="database" /></span>
                        <span title='document'>添加资料</span>
                    </div>
                </Menu.Item>
                <Menu.Item key="2">
                    <div title='accessory' onClick={this.showModal.bind(this)}>
                        <span title='accessory'><Icon title='accessory' type="file-add" /></span>
                        <span title='accessory'>上传附件</span>
                    </div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">
                    <div title='comment' onClick={this.showModal.bind(this)}>
                        <span title='comment'><Icon title='comment' type="coffee" /></span>
                        <span title='comment'>写评论</span>
                    </div>
                </Menu.Item>
                <Menu.Item key="4">
                    <div title='article' onClick={this.showModal.bind(this)}>
                        <span title='article'><Icon title='article' type="file-text" /></span>
                        <span title='article'>上传稿件</span>
                    </div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="5">
                    <div onClick={this.handleCompleteCard.bind(this)}>
                        <span><Icon type="check-circle" /></span>
                        <span>选题完成</span>
                    </div>
                </Menu.Item>
                <Menu.Item key="6">
                    <div onClick={this.handleHangupCard.bind(this)}>
                        <span><Icon type="clock-circle" /></span>
                        <span>放进拖延区</span>
                    </div>
                </Menu.Item>
                <Menu.Item key="7">
                    <div onClick={this.handleDropCard.bind(this)}>
                        <span><Icon type="close-circle" /></span>
                        <span>丢弃卡片</span>
                    </div>
                </Menu.Item>
            </Menu>
        );
        this.handleUpload = this.handleUpload.bind(this);
        this.onChange = (editorState) => this.setState({editorState});
    }
    getCurrentCardData(e){
        const index = e.currentTarget.getAttribute('data-cardIndex');
        const data = this.props.cardsList[index];
        this.props.getCurrentCard(data);
    }
    showModal(e){
        const title = e.target.title;
        this.setState({
            visible:{[`${title}Visible`]:true},
            showedModal:`${title}Visible`,
            currentTitle:title,
        })
    }
    handleOk(){
        const title = this.state.currentTitle;
        const cardId = this.props.currentCard.cardId;

        if(title === 'accessory'){
            this.setState({
                visible:{[`${this.state.showedModal}`]:false},
                showedModal:'',
            });
            this[`${title}Form`].reset();
        } else{
            const formData = {
                title:this[`${title}TitleInput`] ? this[`${title}TitleInput`].value : '',
                content:this[`${title}ContentInput`].value,
            };

            switch(title){
                case 'document':
                    this.props.addDocument(cardId, formData);
                    break;
                case 'comment':
                    this.props.addComment(cardId, formData);
                    break;
                case 'members':
                    this.props.addMembers(cardId, formData);
                    break;
                case 'article':
                    this.props.addArticle(cardId, formData);
            }
        }

        this.setState({
            visible:{[`${this.state.showedModal}`]:false},
            showedModal:'',
        });
        this[`${title}Form`].reset();
    }
    handleCancel(){
        const title = this.state.currentTitle;
        this.setState({
            visible:{[`${this.state.showedModal}`]:false},
            showedModal:'',
        });
        this[`${title}Form`].reset();
    }
    handleCompleteCard(){
        const cardId = this.props.currentCard.cardId;
        this.props.completeCard(cardId);
    }
    handleHangupCard(e){
        const cardId = this.props.currentCard.cardId;
        this.props.hangupCard(cardId);
    }
    handleDropCard(e){
        const cardId = this.props.currentCard.cardId;
        this.props.dropCard(cardId);
    }
    handleUpload(e){
        e.preventDefault();
        const that = this;
        const cardId = this.props.currentCard.cardId;
        const input = this.uploadInput;
        let data = new FormData();
        //向FormData添加多个文件时，必须用循环的方式逐个添加，而不能直接添加一个包含多个文件的数组。
        for(let i=0; i<input.files.length; i++){
            data.append(`file${i}`, input.files[i]);
        }

        data.append('cardId', cardId);
        fetch('http://10.10.60.47:3000/card/upload-file',
            {
                method: 'POST',
                body: data,
            }
        ).then(function(res){
            return res.json();
        }).then(function(res){
            console.log(res);
            that.props.addAccessory(cardId, res);
        });
    }
    render(){
        const cardsList = this.props.cardsList;

        return (
            <div className="cards-board-inner">
                {cardsList ?
                    cardsList.map((item, index) => {
                        return (
                            <div className="card-wrap" key={index}>
                                <div className="card-item card-title">
                                    <p>{item.title}</p>
                                    <div className="dropdown">
                                        <Dropdown overlay={this.menu} trigger={['click']}>
                                            <a style={{color:'#fe9'}} href="#"
                                               id={index}
                                               data-cardIndex={index}
                                               onClick={this.getCurrentCardData.bind(this)}>
                                                <Icon type="ellipsis" />
                                            </a>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="card-item card-content">
                                    <Pencil />
                                    <p>{item.content}</p>
                                </div>
                                <div className="card-item card-members">
                                    <span><img src={bgi} alt=""/>editor</span>
                                    <span><img src={bgi} alt=""/>report</span>
                                    <span><img src={bgi} alt=""/>report</span>
                                    <span><img src={bgi} alt=""/>member</span>
                                </div>
                                <div className="card-item card-document">
                                    <Pencil />
                                    {/*error:Objects are not valid as a React child.
                                      *里是p标签内的doc是个对象造成的。
                                      *必须是string，使用doc.content就可以了。*/}
                                    <label>资料</label>
                                    {item.documents
                                        ? <div>{item.documents.map((doc, index) => <p key={index}>{doc.content}</p>)}</div>
                                        : <p>No document</p>}
                                </div>
                                <div className="card-item card-accessory">
                                    <Clip />
                                    <p>accessory</p>
                                    <ul>
                                        <li><Icon type='star'/>image1.jpg</li>
                                        <li><Icon type='star'/>image2.jpg</li>
                                        <li><Icon type='star'/>image3.jpg</li>
                                        <li><Icon type='star'/>image1.jpg</li>
                                        <li><Icon type='star'/>image2.jpg</li>
                                        <li><Icon type='star'/>image3.jpg</li>
                                    </ul>
                                </div>
                                <div className="card-item card-comments">
                                    <label>评论</label>
                                    {item.comments
                                        ? <div>{item.comments.map((comment, index) => <p key={index}>{comment.content}</p>)}</div>
                                        : <p>No comment</p>}
                                </div>
                                <div className="card-item card-progress">
                                    <p>progress</p>
                                </div>
                            </div>
                        )
                    }) : <h3>No card</h3>}
                <Modal
                    title="填写新增资料的内容"
                    visible={this.state.visible.documentVisible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    closable={false}
                    className='report-modal'
                    width='50%'
                >
                    <div className="report-from-wrap">
                        <form ref={(form) => this.documentForm = form}>
                            <div className='report-modal-input-wrap'>
                                <div className='report-modal-input-label'><p>标题</p></div>
                                <div className="report-modal-input">
                                    <input type="text" name='title' required
                                           ref={(input) => this.documentTitleInput = input}
                                    />
                                </div>
                            </div>
                            <div className='report-modal-input-wrap'>
                                <div className='report-modal-input-label'><p>内容</p></div>
                                <div className="form-group report-modal-input">
                                    <textarea rows="8" required name='content'
                                              ref={(textarea) => this.documentContentInput = textarea}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
                <Modal
                    title="邀请成员参与此选题"
                    visible={this.state.visible.membersVisible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    closable={false}
                    className='report-modal'
                    width='50%'
                >
                    <h2>选择在线成员参与此选题</h2>
                </Modal>
                <Modal
                    title="上传附件"
                    visible={this.state.visible.accessoryVisible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    closable={false}
                    className='report-modal'
                    width='50%'
                >
                    <h3>从本地上传选题相关的文件，包括图片、音频和视频</h3>
                    <div className="report-from-wrap">
                        <form
                            ref={(form) => this.accessoryForm = form}
                            encType="multipart/form-data"
                            onSubmit={this.handleUpload}
                        >
                            <div className='report-modal-input-wrap'>
                                <div className='report-modal-input-label'><p>请选择文件</p></div>
                                <div className="form-group report-modal-input">
                                    <input type="file" ref={(input) => this.uploadInput = input} multiple='multiple'/>
                                </div>
                                <div className="form-group report-modal-input">
                                    <input type="submit" value="Submit" className="btn btn-primary"/>
                                </div>
                            </div>
                        </form>
                    </div>

                </Modal>
                <Modal
                    title="发表评论"
                    visible={this.state.visible.commentVisible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    closable={false}
                    className='report-modal'
                    width='50%'
                >
                    <div className="report-from-wrap">
                        <form ref={(form) => this.commentForm = form}>
                            <div className='report-modal-input-wrap'>
                                <div className='report-modal-input-label'><p>说点啥吧</p></div>
                                <div className="form-group report-modal-input">
                                    <textarea rows="8" required
                                              ref={(textarea) => this.commentContentInput = textarea}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
                <Modal
                    title="上传稿件"
                    visible={this.state.visible.articleVisible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    closable={false}
                    className='report-modal'
                    width='50%'
                >
                    <h2>如果选题的稿件已经完成，请在此处上传。</h2>
                    <Editor editorState={this.state.editorState} onChange={this.onChange} />
                </Modal>
            </div>
        )
    }
}

export default Card;