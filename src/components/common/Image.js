import React from "react";

const Image = ({ src, name, className = "photo" }) => {
  return <img src={src} alt={name} className={className} />;
};

export default Image;
