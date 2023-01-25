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
    };
  }

  previosData = async () => {
    console.log(this.state.page);
    this.setState({ loading: true });
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=0cd67630af6747ff8cc488b160ee759b&pageSize=${
        this.props.pageSize
      }&page=${this.state.page - 1}`
    );

    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };

  nextData = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 8))) {
      console.log(this.state.page);
      this.setState({ loading: true });
      let data = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=0cd67630af6747ff8cc488b160ee759b&pageSize=${
          this.props.pageSize
        }&page=${this.state.page + 1}`
      );

      let parseData = await data.json();
      this.setState({
        articles: parseData.articles,
        page: this.state.page + 1,
        loading: false,
      });
    }
  };

  async componentDidMount() {
    this.setState({ loading: true });
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=0cd67630af6747ff8cc488b160ee759b&pageSize=${this.props.pageSize}`
    );
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center my-3">
          NewMoneky - Get the latest news Free here
        </h2>

        {this.state.loading ? <Load /> : ""}
        {!this.state.loading && (
          <div className="row my-3">
            {this.state.articles.map((ele) => {
              return (
                <div key={ele.url} className="col-md-4 mb-2">
                  <NewsItem
                    title={ele.title ? ele.title : ""}
                    description={ele.description ? ele.description : ""}
                    urlNews={ele.url}
                    urlImage={ele.urlToImage}
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
            onClick={this.previosData}
            className="btn btn-dark"
          >
            &larr; Previos
          </button>
          <button
            type="button"
            onClick={this.nextData}
            className="btn btn-dark"
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 8)
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
