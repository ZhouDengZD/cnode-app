import React, { Component } from 'react';
import './App.css';
class PageButton extends Component {

    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        // this.handleKeyPress =this.handleKeyPress(this); 
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleLimitChange = this.handleLimitChange.bind(this);
        this.goPage = this.goPage.bind(this);

        this.state = {
            value:1
        }
       
        // this.setNext=this.setNext.bind(this);
        // this.setUp=this.setUp.bind(this);

        //法二：不定义state,并修改下面的setNext()、setUp()
        // this.state={
        //     page:this.props.page //存储当前页页码
        // }
    }

    // 注意：父组件状态的改变不会同步改变子组件的状态。
    // 将父组件Topic的page状态与当前组件page状态同步的方法。法一：
    // UNSAFE_componentWillReceiveProps(nextProps){
    //     if(this.props.page !== nextProps.page){
    //         this.setState({
    //             page: nextProps.page,
    //         });
    //     }
    // }
 
    //下一页
    // setNext(){
    //     //修改为：
    //     this.props.setPage(+this.props.page + 1); //+使字符串变为数字

    //     // this.setState({
    //     //     page: +this.state.page + 1 //点击下一页，当前页码+1
    //     // },function () {
    //     //     this.props.setPage(this.state.page);
    //     // })
    // }

    //上一页
    // setUp(){
    //     //修改为：
    //     if(this.props.page > 1){
    //         this.props.setPage(+this.props.page - 1);
    //     }


    //     // if(this.state.page > 1){
    //     //     this.setState({
    //     //         page: +this.state.page - 1 //点击上一页，当前页码-1
    //     //     },function () {
    //     //         this.props.setPage(this.state.page);
    //     //     })
    //     // }
    // }

    //点击按钮就调用父组件handlePageChange跳转到相应页面
    handlePageChange = (pageNumber) => {
        if(this.props.handlePageChange){
           
            this.props.handlePageChange({
                page: +pageNumber,
                limit: this.props.limit,
            });
        }
    }

    //limit修改后，调用父组件handlePageChange修改当前对应内容
    handleLimitChange = (params) => {
        const { page, limit } = { ...this.props, ...params};
       
        if(this.props.handlePageChange){
            this.props.handlePageChange({
                page,
                limit,
            });
        }
    }

    //输入框值改变时，改变this.state.value
    handleOnChange(e){
        if(e.target.value > 0){
            this.setState({
                value: e.target.value
            })
        }else{
            alert("请输入正确范围内的值！")
        }
        
    }
    //跳转到某页
    goPage(){
        if(this.state.value){
            this.handlePageChange( this.state.value );
            console.log("value is ", this.state.value);
        }
    }

    render() {
        const { page=1, limit=10, hasNext = true} = this.props; //当前页
        //hasNaxt用于判断是否还有下文
        const pageItemList = [];

        for(let i = Math.max(page - 3, 1); i< page; i++){
            pageItemList.push(<button className="button-item" onClick={()=>this.handlePageChange(i)} key={`${i}`}>{i}</button> );
        }

        pageItemList.push(<button className="button-item not-click" key={`${page}`}>{ page }</button>); //当前页
      
        if(hasNext){
            for(let i = page + 1; i <= page + 3; i++) {
                pageItemList.push( <button className="button-item" onClick={()=>this.handlePageChange(i)} key={`${i}`}>{i}</button> );
            }
        }
        
        return (
            <div className="change_page">
                {/* <span onClick={ this.setUp } >上一页</span> */}
                { page > 1 && 
                    <button className="button-item pre" onClick={()=>this.handlePageChange(+page - 1)}>
                        上一页
                    </button>
                }
                {pageItemList}
                { hasNext && 
                    <button className="button-item next" onClick={()=>this.handlePageChange(+page + 1)}>
                        下一页
                    </button>
                }
                 &nbsp;
                分页大小：
                <select value={`${limit}`} onChange={e=>this.handleLimitChange({limit: + e.target.value})} >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                </select>
                
                 &nbsp;
                跳转到：<input onChange={this.handleOnChange} type="number" />
                       <button className="go" onClick={this.goPage}> Go</button> 
                {/* <span onClick={ this.setNext }>下一页</span> */}
            </div>
        );
    }
}
export default PageButton