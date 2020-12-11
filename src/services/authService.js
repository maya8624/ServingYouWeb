import userService from "./userService";

const tokenkey = "token";

const logIn = (email, password) => {
  return userService.users.find(
    (u) => u.email === email && u.password === password
  );
};

const getUser = () => {
  try {
    const jwt = localStorage.getItem(tokenkey);
    return jwt; // jwtDecode(jwt)
  } catch (error) {
    return null;
  }
};

const storeToken = (authToken) => {
  try {
    localStorage.setItem(tokenkey, authToken);
  } catch (error) {
    console.log("Error while getting the auth token", error);
  }
};

const removeToken = () => {
  localStorage.removeItem(tokenkey);
};

export default { getUser, logIn, removeToken, storeToken };
