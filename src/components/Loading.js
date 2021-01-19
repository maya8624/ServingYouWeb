import React from "react";
import loading from "../images/loading.svg";

const Loading = () => {
  return (
    <div className="loading">
      <h4>loading...</h4>
      <img src={loading} />
    </div>
  );
};

export default Loading;
