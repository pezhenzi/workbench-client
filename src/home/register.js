import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    handleSubmit(e){
        const registerData = {
            name:this.nameInput.value,
            account:this.accountInput.value,
            role:this.roleInput.value,
            password:this.passwordInput.value,
        };

        let data = new FormData();
        data.append('name',registerData.name);
        data.append('account',registerData.account);
        data.append('role',registerData.role);
        data.append('password',registerData.password);
        data.append('timestamp', Date.now());
        console.log(data.get('name'));
        fetch('http://10.10.60.47:3000/users/save-info', {
            method:'post',
            body:data,
        }).then(function(res){
            console.log(res);
        });
        this.props.handleSubmit(registerData);
    }

    render(){
        return (
            <div className="register-form">
                <div><h3>Register Form</h3></div>
                <form>
                    <div className="form-group">
                        <label>真实姓名</label>
                        <input type="text" required ref={(input) => this.nameInput = input}/>
                    </div>
                    <div className="form-group">
                        <label>用户名</label>
                        <input type="text" required ref={(input) => this.accountInput = input}/>
                    </div>
                    <div className="form-group">
                        <label>角色</label>
                        <select required ref={(input) => this.roleInput = input}>
                            <option value="admin">管理员</option>
                            <option value="editor">编辑</option>
                            <option selected value="journalist">记者</option>
                            <option value="reporter">报题者</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>密码</label>
                        <input type="password" required minLength='6' maxLength='12' size='12' ref={(input) => this.passwordInput = input}/>
                    </div>
                    <div className="form-group">
                        <label>确认密码</label>
                        <input type="password" required minLength='6' maxLength='12' size='12' ref={(input) => this.passwordAgainInput = input}/>
                    </div>
                    <div className="form-group btn-group">
                        <Link to={'/'}>
                            <button className='btn btn-success btn-lg' onClick={this.handleSubmit.bind(this)}>提交</button>
                        </Link>
                        <Link to='/'>
                            <button className='btn btn-warning btn-lg'>放弃</button>
                        </Link>
                    </div>

                </form>
            </div>
        )
    }
}

export default Register;