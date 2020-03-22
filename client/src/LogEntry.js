import React from "react";
import StarRatings from "react-star-ratings";

const LogEntry = ({ entry }) => {
  return (
    <div className="card" style={{ width: "30rem", margin: "10% auto" }}>
      <img
        src={entry.image}
        style={{ height: "10rem" }}
        className="card-img-top"
        alt="..."
      ></img>
      <div className="card-body">
        <h5 className="card-title">{entry.title}</h5>
        <p className="card-text">{entry.description}</p>
        <p className="card-text">
          <em>{entry.comments}</em>
        </p>
        <div>
          <StarRatings
            rating={entry.rating}
            starRatedColor="red"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="3px"
            name="rating"
          />
        </div>
        <small>{new Date(entry.visitDate).toDateString()}</small>
      </div>
    </div>
  );
};

export default LogEntry;
