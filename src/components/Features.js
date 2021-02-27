import React from "react";
import {
  faUtensils,
  faCarrot,
  faSignal,
} from "@fortawesome/free-solid-svg-icons";

import Icon from "../components/common/Icon";
import colors from "../config/colors";

const Features = ({ items }) => {
  return (
    <div className="container feature-container">
      <div className="feature-grid">
        <div className="feature-item">
          <span>
            <Icon color={colors.orange} icon={faUtensils} />
          </span>
          <h5>Order Online</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            accusantium deserunt nostrum dolorem non optio porro sequi harum
            dolorum! Dolor!
          </p>
        </div>
        <div className="feature-item">
          <span>
            <Icon color={colors.orange} icon={faCarrot} />
          </span>
          <h5>Fresh Ingredients</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            accusantium deserunt nostrum dolorem non optio porro sequi harum
            dolorum! Dolor!
          </p>
        </div>
        <div className="feature-item">
          <span>
            <Icon color={colors.orange} icon={faSignal} />
          </span>
          <h5>Online Booking</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            accusantium deserunt nostrum dolorem non optio porro sequi harum
            dolorum! Dolor!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
