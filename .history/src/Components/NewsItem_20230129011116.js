import React from "react";

export class NewsItem extends Component {
    let { title, description, urlImage, urlNews, source, date } = props;
    return (
      <div className="container">
        <div className="card" style={{ width: "18rem" }}>
          <div style={{
            display : "flex",
            position : "absolute",
            right : "0",
            justifyContent : "flex-end"
          }}>
            <span
              className="badge rounded-pill bg-danger"
              style={{ left: "90%" }}
            >
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
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
            <p className="card-text">
              <small className="text-muted">
                - By {source} updated at {new Date(date).toUTCString()}
              </small>
            </p>
            <a
              rel="noopener noreferrer"
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

export default NewsItem;
