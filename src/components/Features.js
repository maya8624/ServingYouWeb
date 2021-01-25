import React from "react";
import {
  faUtensils,
  faCarrot,
  faSignal,
  faPhone,
  faMapMarker,
  faPhoneSquare,
  faEnvelopeOpen,
  faGlobe,
  faMapMarkerAlt,
  faMobileAlt,
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
          <h5>
            <a href="/MenuList">Order Online</a>
          </h5>
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
          <h5>
            <a href="">Fresh Ingredients</a>
          </h5>
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
          <h5>
            <a href="/booking">Online Booking</a>
          </h5>
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
