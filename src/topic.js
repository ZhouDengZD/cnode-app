import {fetchIndexData} from './services'
import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom'
import { Topic_TYPES } from './topicType';
import PageButton from './PageButton'

class Topic extends Component{
    constructor(){
        super();
        // this.setPage = this.setPage.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.state = {
            indexList:[],//当前渲染的页面数据
            page:1,
            limit:10, //每页显示的条数
            tab:Topic_TYPES[0].value  //ask
        };
      }

    componentDidMount(){
          const page = this.props.match.params.page || 1;
          const limit = this.props.match.params.limit || 10;
          const tab = this.props.match.params.tab || 'ask';
          this.fetchData({page,limit,tab});
    }
    
    //根据参数获取数据
    fetchData(params){
        const {tab,page,limit} = {...this.state, ...params};
    
        fetchIndexData({tab,page,limit}).then((res)=>{
          
              this.setState({
                indexList : res.data,
                tab, //ES6的新写法： tab:tab
                page,
                limit,
                });

                this.props.history.push(`/topics/${tab}/${page}/${limit}`); //将页面的路由信息同步到url

            //  console.log("接受到的数据为：",res.data)
            //  console.log({tab,page,limit});
        },(e)=>{
            window.alert('error'+e.message);
        });
    }

    //根据页码重置当前内容
    // setPage(pageNum){  
    //     this.setState({
    //        page: pageNum
    //     });
    //     this.fetchData({page:pageNum});
    // }

    //根据选择的类型改变当前内容
    handleFilterChange = (type) => {
        // this.setState({
        //     page: 1,
        //     tab:type
        // })
        // 不能在此处修改，应该在获取到数据后再改变，故而写进fetchData中
        this.fetchData({tab: type, page:1});
    }

    //根据page，limit获取内容
    handlePageChange({page,limit}){
        this.fetchData({page,limit});
    }

      render() {
        return (
            <div className="container">
              {/* <Main {...this.state} setPage={this.setPage} /> */}
                <Main {...this.state} handleFilterChange={this.handleFilterChange} handlePageChange={this.handlePageChange}/>
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
                {/* tab栏 */}
                <div className="filter">
                {
                    Topic_TYPES.map(
                        item => (
                            <div
                            className={"filter-item" + (this.props.tab === item.value ? ' active' : '') } 
                            key={`KEY_${item.value}`}
                            onClick = {() => this.props.handleFilterChange(item.value)}
                            >
                            {item.name}
                            </div>
                        )
                    )
                }
                </div>
              {/* {JSON.stringify(this.props.data,null,4)} */}
              {/* <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(this.props.data, null, 2) }} /> */}        
              <ul className="main-list">
                {list}
              </ul>
              <PageButton { ...this.props} handlePageChange={this.props.handlePageChange}/>
        </div>
      );
    }
  }
  //按钮组件

  export default Topic