import React, { useState,useEffect } from "react";
import Load from "./Load";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = ()=>{


  static propTypes = {
    pageSize : PropTypes.number,
    category : PropTypes.string,
    setProgress : PropTypes.func,
    country : PropTypes.string
  }
  

  constructor() {
    super();
    this.state = {
      loading: false,
      articles: [],
      page: 1,
      totalResults: 0,
    };
  }

  async updateNews(pageNo) {
    this.props.setProgress(10);
    this.setState({ loading: true });
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pageNo}&pageSize=${this.props.pageSize}`
    );
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      page: pageNo,
      loading: false,
    });
    this.props.setProgress(100);
  }

  fetchMoreData =async () => {
    this.setState({ loading: true });
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0cd67630af6747ff8cc488b160ee759b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    );
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      page: this.state.page + 1,
      loading: false,
    });
  };  

  async componentDidMount() {
    this.updateNews(this.state.page);
    document.title = `News24/7 - ${this.capitalizeFirstLetter(this.props.category)}`
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <>
        <h2 className="text-center" style={{marginTop : "70px"}}>
          NewMoneky - Top {this.props.category} Headlines
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
}

News.defaultProps = {
  pageSize: 8,
  country : "in",
  category : "general"
}


export default News;
