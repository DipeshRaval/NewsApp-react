import React, { Component } from "react";
import Load from "./Load";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
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
    this.setState({ loading: true });
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0cd67630af6747ff8cc488b160ee759b&page=${pageNo}&pageSize=${this.props.pageSize}`
    );
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      page: pageNo,
      loading: false,
    });
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
      <div className="container">
        <h2 className="text-center my-3">
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
      </div>
    );
  }
}

export default News;
