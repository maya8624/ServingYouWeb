import "./App.css";
import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import About from "./pages/About";
import AuthContext from "./context/authContext";
import Booking from "./components/Booking";
import Checkout from "./components/Checkout";
import Home from "./pages/Home";
import MenuDetails from "./components/MenuDetails";
import Menus from "./components/Menus";
//import NavBar from "./components/NavBar";
import NavBar from "./components/NavBar2";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import Order from "./components/Order";
import RegisterForm from "./components/RegisterForm";

import authService from "./services/authService";
import OrderProvider from "./context/OrderContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = authService.getUser();
    if (user) setUser(user);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OrderProvider>
        <NavBar />
        <Switch>
          <Route path="/menuDetails/:id" component={MenuDetails} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/about" component={About} />
          <Route path="/menuList" component={Menus}></Route>
          <Route path="/order" component={Order}></Route>
          <Route path="/booking" component={Booking}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home}></Route>
          <Redirect to="/not-found" />
        </Switch>
      </OrderProvider>
    </AuthContext.Provider>
  );
}
export default App;
