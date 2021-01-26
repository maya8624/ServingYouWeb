import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.png";
import AuthContext from "../context/authContext";
import OrderInfo from "./OrderInfo";

function NavBar2(props) {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  // const handleToggle = () => {
  //   setOpen(open ? false : true);
  // };
  // in useEffect ?
  // useEffect(() => {
  //   handleToggle();
  // }, []); <= puth sth change thing

  return (
    <nav className="navbar bg-light navbar-light navbar-expand-lg sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Serving You" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          onClick={() => setOpen(open ? false : true)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={open ? "navbar-collapse" : "collapse navbar-collapse"}
          id="navbarResponsive"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/menuList" className="nav-link">
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/booking" className="nav-link">
                Booking
              </Link>
            </li>
            <li className="nav-item">
              <Link to="contact" className="nav-link">
                Contact
              </Link>
            </li>
            {!user && (
              <>
                <li className="nav-item">
                  <Link to="login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
            {user && (
              <li className="nav-item">
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </li>
            )}
            <li className="cart-icon">
              <Link to="/order" className="nav-link">
                <OrderInfo />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar2;
