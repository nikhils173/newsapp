import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const  [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
const fetchMoreData = async() => { 
        setPage(page + 1)
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f73af1786ffb407898a4feda2758ca75&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url)
        console.log(url)
        let parseData = await data.json()
         setArticles(articles.concat(parseData.articles))
         setTotalResults(parseData.totalResults)
        
    }
      
const updateNews = async() => {
    props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f73af1786ffb407898a4feda2758ca75&page=${page}&pageSize=${props.pageSize}`;
    {setLoading(true)};
    let data = await fetch(url)
    let parseData = await data.json()
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    props.setProgress(100);
}
useEffect(() => {
    updateNews()
    document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`
}, [])


// handleNextClick = async() =>{
// //     if(!this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)){
// //         let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f73af1786ffb407898a4feda2758ca75&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
// //         {this.setState({loading:true})};
// //         let data = await fetch(url)
// //         let parseData = await data.json()
// //         this.setState({
// //             page:this.state.page +1,
// //             articles:parseData.articles,
// //             loading:false
// //         })
// // }
// this.setState({page:this.state.page + 1})
// this.updateNews()
// }
// handlePrevClick =async() =>{
//     // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f73af1786ffb407898a4feda2758ca75&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
//     // {this.setState({loading:true})};

//     // let data = await fetch(url)
//     // let parseData = await data.json()
//     // this.setState({
//     //     page:this.state.page -1,
//     //     articles:parseData.articles,
//     //     loading:false
//     // })
//     this.setState({page:this.state.page - 1})
//     this.updateNews()
// }

   {
    return (
      <>
        <h1 className='text-center' style={{margin:'35px 0px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1> 
        {loading && <Spinner /> }
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
            <div className="container">
                <div className="row">
                    { articles.map((ele) => {
                    return <div className="col-md-4" key={ele.url}> 
                            <NewsItem   title={ele.title?ele.title.slice(0,45):""}
                            description={ele.description?ele.description.slice(0,88):""}
                            imageUrl={ele.urlToImage} name={ele.source.name} newsUrl={ele.url} author={ele.author} publishedAt={new Date(ele.publishedAt).toGMTString() }/>
                        </div>
                    })} 
                    
                
                </div>  
            </div>
             

        </InfiniteScroll>
        
        {/* <div className="container d-flex justify-content-between">
            <button disabled ={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled ={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>     */}
      </>
      

    )
   }
}



News.defaultProps ={
    country: 'in',
    pageSize:38,
    category:'general'
}
News.propTypes={
    country:propTypes.string,
    pageSize:propTypes.number
}

export default News