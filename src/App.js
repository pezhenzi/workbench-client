import React, { Component } from 'react';
import 'antd/dist/antd.css';
import Home from './home/home';
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
              <Home />
          </div>
      )
  }
}

export default App;