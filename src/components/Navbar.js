import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.png";

class Navbar extends Component {
  state = {
    isMenuShown: false,
  };

  handleToggle = () => {
    this.setState({ isMenuShown: !this.state.isMenuShown });
  };

  render() {
    return (
      <nav className="navbar bg-light navbar-light navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Serving You" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            onClick={this.handleToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={
              this.state.isMenuShown
                ? "navbar-collapse"
                : "collapse navbar-collapse"
            }
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
                <Link to="/order" className="nav-link">
                  My Order
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
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
