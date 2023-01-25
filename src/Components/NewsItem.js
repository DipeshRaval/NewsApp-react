import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, urlImage, urlNews } = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={
              urlImage
                ? urlImage
                : "https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1299,w_2309,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1674595371/GettyImages-1358641846-2_o0g0gg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text"> {description}</p>
            <a
              rel="noreferrer"
              href={urlNews}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
