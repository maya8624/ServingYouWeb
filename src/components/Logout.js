import { useEffect } from "react";
import orderService from "../services/orderService";
import useAuth from "./hooks/useAuth";

function Logout(props) {
  const auth = useAuth();

  useEffect(() => {
    auth.logOut();
    orderService.removeAllItems();
    window.location = "/";
  });

  return null;
}

export default Logout;
