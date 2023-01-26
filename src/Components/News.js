import React, { Component } from "react";
import Load from "./Load";
import NewsItem from "./NewsItem";

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

  async componentDidMount() {
    this.updateNews(this.state.page);
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center my-3">
          NewMoneky - Top {this.props.category} Headlines
        </h2>

        {this.state.loading ? <Load /> : ""}
        {!this.state.loading && (
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
        )}

        <div className="d-flex justify-content-between my-3">
          <button
            disabled={this.state.page === 1}
            type="button"
            onClick={() => {
              this.updateNews(this.state.page - 1);
            }}
            className="btn btn-dark"
          >
            &larr; Previos
          </button>
          <button
            type="button"
            onClick={() => {
              this.updateNews(this.state.page + 1);
            }}
            className="btn btn-dark"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
