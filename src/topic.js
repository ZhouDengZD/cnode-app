import {fetchIndexData} from './services'
import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom'

class Topic extends Component{
    constructor(){
        super();
        this.setPage=this.setPage.bind(this);
        this.state = {
            indexList:[],//当前渲染的页面数据
            data:[],  //总的数据
            current: 1, //当前页码
            pageSize:10, //每页显示的条数
            totalPage:0,//总页数
        };
      }

      componentDidMount(){
        // 获取数据并进行初始操作(因为fetchIndexData异步函数，所以会在最后执行)
        fetchIndexData().then((res)=>{
          const { pageSize } = this.state;  //解构赋值

          this.setState({
            data : res.data,
            totalPage : Math.ceil( res.data.length / pageSize), //拿到数据后计算总页数
            indexList : res.data.slice(0, pageSize),   
            //初始化首页的内容:注意此处必须用res.data才可以！因为this.state.data还没被重新设置
        })
        });
    }

    //根据页码重置当前内容
    setPage(pageNumber){  

      const { pageSize } = this.state;
      const startIndex = (pageNumber - 1) * pageSize;

      this.setState({
          indexList : this.state.data.slice(startIndex, startIndex + pageSize),
          //设置并获取当前页数据
      })
    }

      render() {
        return (
            <div className="container">
              <Main {...this.state} setPage={this.setPage}/>
            </div>
        );
      }
}

class Main extends Component { 

    render(){
      let list = this.props.indexList.map((element,index) => {

        return <li key={index} ><Link to={`/details/${element.id}`}>{index + 1}、{element.title}</Link></li>;
      });
      return (
        <div className="main">
              {/* {JSON.stringify(this.props.data,null,4)} */}
              {/* <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(this.props.data, null, 2) }} /> */}        
              <ul className="main-list">
                {list}
              </ul>
              <PageButton { ...this.props}/>
        </div>
      );
    }
  }
  //按钮组件
  class PageButton extends Component {

    constructor(props) {
        super(props);
        this.setNext=this.setNext.bind(this);
        this.setUp=this.setUp.bind(this);
        this.state={
            // value:0, //input的值
            current:this.props.current //存储当前页页码
        }
    }
 
    //下一页
    setNext(){
        if( this.state.current < this.props.totalPage){
            this.setState({
                current:this.state.current + 1 //点击下一页，当前页码+1
            },function () {
                this.props.setPage(this.state.current);
            })
        }
    }

    //上一页
    setUp(){
        if(this.state.current > 1){
            this.setState({
                current:this.state.current - 1 //点击上一页，当前页码-1
            },function () {
                this.props.setPage(this.state.current);
            })
        }
    }

    render() {
        return (
            <div className="change_page">
                <span onClick={ this.setUp } >上一页</span>
                <span>{ this.state.current }页/ { this.props.totalPage }页</span>
                {/* <input ref="input" value={this.state.value}/>
                <span onClick={()=>this.onChange}> Go</span> */}
                <span onClick={ this.setNext }>下一页</span>
            </div>
        );
    }
}
  export default Topic