import React, { Component } from 'react';
import 'antd/dist/antd.css';
import HomeContainer from './home/homeContainer';
import './img/bootstrap/css/bootstrap.min.css';
import './img/font-awesome/css/font-awesome.min.css';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.testData);
        this.props.testDispatch();
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