import React from "react";

function SinglePost(props) {
  return (
    <div className="mt-5">
      <h5>{props.name}</h5>
      <span>{props.category}</span>
      <p className="mt-5">{props.text}</p>
    </div>
  );
}

export default SinglePost;
