import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, NavLink, Redirect, Switch} from 'react-router-dom';
import Header from './header';
import bench_png from '../img/workbench.png';
import msg_png from '../img/messages.png';
import arch_png from '../img/archive.png';
import Workbench from '../bench/workbench';
import BenchContainer from '../bench/benchContainer';
import Statistics from '../stat/statistics';
import Message from '../msg/message';

class Home extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="home-container">
                <Router>
                    <Switch>
                        <Route path='/bench' component={BenchContainer}/>
                        <Route path='/stat' component={Statistics}/>
                        <Route path='/msg' component={Message}/>
                        <Route path='/' render={()=>(
                            <div className="home-main">
                                <Header />
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
                        )} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Home;