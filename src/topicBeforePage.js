import {fetchIndexData} from './services'
import React, { Component } from 'react';
import './App.css';
import {HashRouter, Link} from 'react-router-dom'

class Topic extends Component{
    constructor(){
        super();
        this.state={
          data:[]
        }
      }
      componentDidMount(){
        fetchIndexData().then((res)=>{
          this.setState({
            data : res.data
          })
        });
      }
      render() {

        return (
          <HashRouter>
            <div className="container">
              <Main data={this.state.data}/>
            </div>
          </HashRouter>
        );
      }
}
  class Main extends Component {
    render(){
      let list = this.props.data.map((element,index) => {
        return <li key={index}><Link to={`/details/${element.id}`}>{index+1}、{element.title}</Link></li>;
      });
      return (
        <div className="main">
              {/* {JSON.stringify(this.props.data,null,4)} */}
              {/* <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(this.props.data, null, 2) }} /> */}        
              <ul className="main-list">
                {list}
              </ul>
        </div>
      );
    }
  }
  export default Topic