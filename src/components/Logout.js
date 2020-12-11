import React, { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import authService from "../services/authService";

function Logout(props) {
  useAuth().logOut();
  window.location = "/";

  // useEffect(() => {

  // }, []);

  return null;
}

export default Logout;
