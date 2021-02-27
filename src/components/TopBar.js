import React from "react";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

import Icon from "./common/Icon";
import colors from "../config/colors";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div>
        <span className="mr-2">
          <Icon color={colors.white} icon={faEnvelope} />
        </span>
        <span className="mr-2">
          <a href="mailto:admin@servingyou.com">admin@weservingyou.com</a>
        </span>
        <span className="mr-2">
          <Icon color={colors.white} icon={faPhone} />
        </span>
        <span>
          <a href="tel:+1800 000 000">Call us at 1800</a>
        </span>
      </div>
    </div>
  );
};

export default TopBar;
