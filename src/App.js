import React, { Component } from 'react';
import header from './head.png';
import './App.css';
import {HashRouter,Switch, Route, Redirect} from 'react-router-dom'
import DetailPage from './detail'
import Topic from './topic'

class App extends Component {
  render(){
    return (
      <HashRouter>
        <div >
          <Header/>
          <Switch> 
            <Route path="/details/:id" component={DetailPage}></Route>
            <Route path="/topics" component={Topic}></Route>
            <Redirect exact path="/" to="/topics"/>
          </Switch> 
        </div> 
      </HashRouter>
    );
  }
}
class Header extends Component {
  render(){
    return (
      <div className="header">
        <img src={header} alt='header'/>
      </div>
    );
  }
}

export default App;
