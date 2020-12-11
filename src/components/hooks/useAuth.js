import { useContext } from "react";
import AuthContext from "../../context/authContext";
import authService from "../../services/authService";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  
  const logIn = (authToken) => {
    const user = authToken; //jwtDecode(authToken);
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
