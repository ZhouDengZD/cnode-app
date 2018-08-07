import {fetchDetailData} from './services'
import React, { Component } from 'react'
import './App.css';

class DetailPage extends Component {
    constructor(){
      super();
      this.state={
        data:{},
        comment:[]
      }
    }
    componentDidMount(){
      let id = this.props.match.params.id; //获取文章对应的id     

      fetchDetailData(id).then((res)=>{
        this.setState({
            data : res.data,
            comment : res.data.replies
        })
        console.log("res is:",res);
        console.log("data is:",res.data);
      });
      
    }
    render(){
      
      let list = this.state.comment.map((element)=>{
        return (
          <div className="comment-list">
              <img src={element.author.avatar_url} alt="userPhoto"/>
              <div className="comment-list-content">
                <div className="comment-list-title">{element.author.loginname} </div>
                <div key={element.id} dangerouslySetInnerHTML={{__html: element.content}}></div>
              </div> 
          </div>  
        );
      })

      return (
        <div className="detail-wrap">
          <div className="details">
            <div className="title">{this.state.data.title}</div>
            <div id="content" dangerouslySetInnerHTML={{__html: this.state.data.content}}>
            </div>
            <Back />
          </div>
          <div className="comment">
            <div className="comment-sum">共{this.state.data.reply_count}回复</div>
            {list}
        </div>
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