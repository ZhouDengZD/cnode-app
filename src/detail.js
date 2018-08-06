import {fetchDetailData} from './services'
import React, { Component } from 'react'
import './App.css';

class DetailPage extends Component {
    constructor(){
      super();
      this.state={
        data:{},
      }
    }
    componentDidMount(){
      let id = this.props.match.params.id; //获取文章对应的id     

      fetchDetailData(id).then((res)=>{
        this.setState({
            data : res.data,
        })
      });
    }
    render(){
      return (
          <div className="details">
            <div className="title">{this.state.data.title}</div>
            <div id="content" dangerouslySetInnerHTML={{__html: this.state.data.content}}>
            </div>
            <Back />
          </div>
      );
    }
  }
class Back extends Component{
  handleBack(e){
    e.preventDefault();
    window.history.back();
  }
  render(){
    return (
        <div className="backToList" onClick={this.handleBack.bind(this)}>回到列表</div>
    );
  }
}
export default DetailPage