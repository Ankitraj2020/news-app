import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps ={
    country:'in',
    pageSize:8,
    category:'general'
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
   
    constructor(props){
        super(props);
        console.log("hello i am a constructor from news component");
        this.state ={
            articles:[],
            loading: true,
            page:1,
            totalResults:0

        }
        document.title = `${this.props.category} -NewsMonkey`;

    }
    async updateNews(){
      this.props.setProgress(10);
      let url  =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=646d1897844d444a9be8d2d7436a98d9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json()
      this.props.setProgress(50);
      console.log(parsedData);
      this.setState({articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false,
      
    })
    this.props.setProgress(100);
    }

    async componentDidMount(){
       this.updateNews();
    }
    handlePrevclick=async ()=>{
     /* let url  =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=646d1897844d444a9be8d2d7436a98d9&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        
    


      this.setState({
        articles:parsedData.articles,
        page:this.state.page - 1,
        loading:false
      })*/
       await this.setState({page:this.state.page-1})
      this.updateNews();
    }

    

    handleNextclick=async ()=>{
     /*if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){


     
      let url  =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=646d1897844d444a9be8d2d7436a98d9&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json()
        
        
    


      this.setState({
        articles:parsedData.articles,
        page:this.state.page + 1,
        loading:false
      })
     
      

    }*/
    await this.setState({page:this.state.page+1})
    this.updateNews();
    }

    fetchMoreData = async () => {
      await this.setState({page:this.state.page+1})
      const url  =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=646d1897844d444a9be8d2d7436a98d9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
      
      
    })
     

    };

  render() {

    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'35px 0px'}} >NewsMonkey - Top Headlines from {this.props.category}</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
       
        <div className="row">
        {(this.state.articles) &&this.state.articles.map((element)=>{
            return <div className="col-md-4" key= {element.url}>
            <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} aurhor={element.author} date={element.publishedAt} />
       </div>
        })}
         
       </div>
       </div>
       </InfiniteScroll>
       
       
      </div>
    )
  }
}


export default News
