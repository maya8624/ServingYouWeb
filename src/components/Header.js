import React from "react";

const Header = ({ children, defaultStyle }) => {
  return <header className={defaultStyle}>{children}</header>;
};

Header.defaultProps = {
  defaultStyle: "defaultBanner",
};

export default Header;
