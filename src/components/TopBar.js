import React from "react";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

import Icon from "./common/Icon";
import colors from "../config/colors";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="text-right">
        <div>
          <Icon color={colors.white} icon={faEnvelope} />
          <a href="mailto:webmaster@example.com">servingyou@domain.com.au</a>
        </div>
        <div>
          <Icon color={colors.white} icon={faPhone} />
          <a href="tel:+1800 000 000">Call us at 1800</a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
