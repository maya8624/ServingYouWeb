import "./App.css";
import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import About from "./components/About";
import AuthContext from "./context/AuthContext";
import authService from "./services/authService";
import BookingDetails from "./components/BookingDetails";
import BookingForm from "./components/BookingForm";
import Checkout from "./components/Checkout";
import Home from "./components/Home";
import MenuDetails from "./components/MenuDetails";
import Menus from "./components/Menus";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import Order from "./components/Order";
import OrderProvider from "./context/OrderContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import RegisterForm from "./components/RegisterForm";

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
          <Route path="/menus" component={Menus} />
          <ProtectedRoute path="/order" component={Order} />
          {/* <Route path="/order" component={Order} /> */}
          <Route path="/booking" component={BookingForm} />
          <Route path="/bookingDetails" component={BookingDetails} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </OrderProvider>
    </AuthContext.Provider>
  );
}
export default App;
