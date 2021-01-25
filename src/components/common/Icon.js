import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ color, icon }) => {
  return <FontAwesomeIcon color={color} icon={icon} size="2x" />;
};

export default Icon;
