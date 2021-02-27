import React from "react";
import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
  faYoutubeSquare,
} from "@fortawesome/free-brands-svg-icons";

import Icon from "../components/common/Icon";
import colors from "../config/colors";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="row text-light text-center py-4 justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-6">
            <p className="pt-5">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
            </p>
            <ul className="social pt-3">
              <li>
                <a href="/">
                  <Icon color={colors.white} icon={faFacebookSquare} />
                </a>
              </li>
              <li>
                <a href="/" target="_self">
                  <Icon color={colors.white} icon={faTwitterSquare} />
                </a>
              </li>
              <li>
                <a href="/">
                  <Icon color={colors.white} icon={faInstagramSquare} />
                </a>
              </li>
              <li>
                <a href="/">
                  <Icon color={colors.white} icon={faYoutubeSquare} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="socket-container">
        <div>© Copyright 2021 Serving You</div>
        <div>|</div>
        <div>
          <a href="/">Privacy Policy</a>
        </div>
      </div>
    </>
  );
};

export default Footer;
