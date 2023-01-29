import React, { useState,useEffect } from "react";
import Load from "./Load";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=>{

  let [loading, setLoading] = useState(false);
  let [articles, setArticles] = useState([]);
  let [page, setPage] = useState(1);
  let [totalResults, setTotalResults] = useState(0);
 

  async function updateNews(pageNo) {
    props.setProgress(10);
    this.setState({ loading: true });
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`
    );
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      page: pageNo,
      loading: false,
    });
    props.setProgress(100);
  }

  fetchMoreData =async () => {
    this.setState({ loading: true });
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0cd67630af6747ff8cc488b160ee759b&page=${this.state.page + 1}&pageSize=${props.pageSize}`
    );
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      page: this.state.page + 1,
      loading: false,
    });
  }; 
  

  async function componentDidMount() {
    updateNews(this.state.page);
    // document.title = `News24/7 - ${this.capitalizeFirstLetter(props.category)}`
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

    return (
      <>
        <h2 className="text-center" style={{marginTop : "70px"}}>
          NewMoneky - Top {props.category} Headlines
        </h2>

        {this.state.loading ? <Load /> : ""}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Load />}
        >
          <div className="container">
            <div className="row my-3">
              {this.state.articles.map((ele) => {
                return (
                  <div key={ele.url} className="col-md-4 mb-3">
                    <NewsItem
                      title={ele.title ? ele.title : ""}
                      description={ele.description ? ele.description : ""}
                      urlNews={ele.url}
                      urlImage={ele.urlToImage}
                      source={ele.source.name ? ele.source.name : "Unknown"}
                      date={ele.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  
}

News.defaultProps = {
  pageSize: 8,
  country : "in",
  category : "general"
}

News.propTypes = {
  pageSize : PropTypes.number,
  category : PropTypes.string,
  setProgress : PropTypes.func,
  country : PropTypes.string
}


export default News;
