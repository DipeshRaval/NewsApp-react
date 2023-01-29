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
    setLoading(true)
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`
    );
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);

    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setPage(pageNo);
    setLoading(false)

    props.setProgress(100);
  }

  const fetchMoreData = async () => {
    setLoading(true)
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0cd67630af6747ff8cc488b160ee759b&page=${page + 1}&pageSize=${props.pageSize}`
    );
    let parseData = await data.json();

    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
    setPage(page + 1);
    setLoading(false)
  }; 
  

  async function componentDidMount() {
    updateNews(page);
    // document.title = `News24/7 - ${capitalizeFirstLetter(props.category)}`
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

    return (
      <>
        <h2 className="text-center" style={{marginTop : "70px"}}>
          NewMoneky - Top {props.category} Headlines
        </h2>

        {loading ? <Load /> : ""}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Load />}
        >
          <div className="container">
            <div className="row my-3">
              {articles.map((ele) => {
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
