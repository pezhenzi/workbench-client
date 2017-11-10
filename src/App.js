import React, { Component } from 'react';
import 'antd/dist/antd.css';
import HomeContainer from './home/homeContainer';
import './img/bootstrap/css/bootstrap.min.css';
import './img/font-awesome/css/font-awesome.min.css';
import './App.css';
import io from 'socket.io-client';

class App extends Component {
    constructor(props){
        super(props);
        this.home = io.connect('http://10.10.60.47:3000');
    }
    componentDidMount(){
        const that = this;
        this.home.on('new report from others', function(data){
            console.log(data);
            that.props.receiveReportSocket(data);
            const reportFormDataString = JSON.stringify(data);
            localStorage.setItem('reportDataFromSocket', reportFormDataString);
        });
    }
    render() {
      return (
          <div className='container'>
              <HomeContainer />
          </div>
      )
  }
}

export default App;