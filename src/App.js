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
    componentWillMount(){
        this.props.getInitialReports();
    }
    componentDidMount(){
        const that = this;
        this.home.on('new report from others', function(data){
            console.log(data);
            that.props.receiveReportSocket(data);
        });
        this.home.on('use one report', function(data){
            console.log(data);
            that.props.useOneReport(data.reportId, that.props.oldReports);
        });
        this.home.on('top one report', (data) => {
            that.props.topOneReport(data.reportId);
        });
        this.home.on('drop one report', (data) => {
            that.props.dropOneReport(data.reportId);
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