import http from "./httpService";
import { awsApiUrl } from "../config.json";
import funcs from "../utils/funcs";

const tokenKey = "authToken";

async function logIn(email, password) {
  try {
    const { data } = await http.get(`${awsApiUrl}/member/${email}`);
    const checkPassword = funcs.checkPassword(password, data.Password);

    if (!data || checkPassword) {
      return false;
    }

    const returnData = {
      email: data.Email,
      firstName: data.FirstName,
    };
    return returnData;
  } catch (error) {
    console.log("An error has occurred during fetching user data.", error);
  }
}

const getUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwt; // jwtDecode(jwt)
  } catch (error) {
    console.log("An error has occurred during getting an token.", error);
    return null;
  }
};

const storeToken = (authToken) => {
  try {
    localStorage.setItem(tokenKey, authToken);
  } catch (error) {
    console.log("Error while getting the auth token.", error);
  }
};

const removeToken = () => {
  localStorage.removeItem(tokenKey);
};

const authService = {
  getUser,
  logIn,
  removeToken,
  storeToken,
};

export default authService;
