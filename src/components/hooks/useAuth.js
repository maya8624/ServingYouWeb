import { useContext } from "react";
//import jwtDecode from "jwt-decode";

import AuthContext from "../../context/AuthContext";
import authService from "../../services/authService";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = authToken;
    setUser(user);
    authService.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authService.removeToken();
  };
  return { logIn, logOut, user };
};

export default useAuth;
