import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);
    }

    handleSubmit(e){
        e.preventDefault();
        const account = this.accountInput.value,
            password = this.passwordInput.value;
        let formData = new FormData();
        formData.append('account', account);
        formData.append('password', password);
        formData.append('loginTime', Date.now());
        fetch('http://10.10.60.47:3000/users/login', {
            method:'post',
            body:formData,
            mode:'cors',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(function(res){
            console.log(res);
        });
    }

    render(){
        return (
            <div className="login-form">
                <div className="login-title"><h2>用户登录</h2></div>
                <form>
                    <div className="form-group">
                        <label>用户名</label>
                        <input type="text" required ref={(input) => this.accountInput = input}/>
                    </div>
                    <div className="form-group">
                        <label>密码</label>
                        <input type="password" required minLength='6' maxLength='12' size='12' ref={(input) => this.passwordInput = input}/>
                    </div>
                    <div className="form-group btn-group">
                        <button className='btn btn-success btn-lg' onClick={this.handleSubmit.bind(this)}>登录</button>
                        <Link to='/'>
                            <button className='btn btn-warning btn-lg'>放弃</button>
                        </Link>
                    </div>

                </form>
            </div>
        )
    }
}

export default Login;