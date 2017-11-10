import React, {Component} from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import Header from './header';
import bench_png from '../img/workbench.png';
import msg_png from '../img/messages.png';
import arch_png from '../img/archive.png';
import BenchContainer from '../bench/benchContainer';
import Statistics from '../stat/statistics';
import Message from '../msg/message';
import Login from './login';
import Register from './register';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
        //console.log(this.props.test);
        this.props.getReports();
    }
    handleLogin(data){
        console.log(data);
    }
    handleRegister(data){
        console.log(data);
    }
    handleSubmit(data){
        console.log(data);
    }
    //TODO:render the component.
    render(){
        return (
            <div className="home-container">
                <Router>
                    <Switch>
                        <Route path='/bench' component={BenchContainer}/>
                        <Route path='/stat' component={Statistics}/>
                        <Route path='/msg' component={Message}/>
                        <Route path='/login' component={() => <Login getToken={this.props.getToken} />}/>
                        <Route path='/register' component={() => <Register handleSubmit={this.handleSubmit}/>}/>
                        <Route path='/' render={()=>this.props.token ? (
                            <div className="home-main">
                                <Header
                                    handleLogin={this.handleLogin}
                                    handleRegister={this.handleRegister}
                                    name={this.props.name}
                                    account={this.props.account}
                                    token={this.props.token}
                                    role={this.props.role}
                                    logout={this.props.logout}
                                />
                                <div className="doors-container">
                                    <NavLink to='/bench' className='home-door'>
                                        <div>
                                            <img src={bench_png} alt='Workbench'/>
                                            <div className="line"></div>
                                            <div className="door-name">
                                                <h1>工作台</h1>
                                            </div>
                                        </div>
                                    </NavLink>
                                    <NavLink to='/stat' className='home-door'>
                                        <div>
                                            <img src={msg_png} alt='Messages'/>
                                            <div className="line"></div>
                                            <div className="door-name">
                                                <h1>消息</h1>
                                            </div>
                                        </div>
                                    </NavLink>
                                    <NavLink to='/msg' className='home-door'>
                                        <div>
                                            <img src={arch_png} alt='Archive'/>
                                            <div className="line"></div>
                                            <div className="door-name">
                                                <h1>统计</h1>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        ) : (<div>
                            <Header
                                handleLogin={this.handleLogin}
                                handleRegister={this.handleRegister}
                                name={this.props.name}
                                account={this.props.account}
                                token={this.props.token}
                                role={this.props.role}
                                logout={this.props.logout}
                            />
                            <h1>请先登录，如果还没有账号请先注册。</h1></div>)} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Home;