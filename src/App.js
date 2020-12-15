import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";

import About from "./pages/About";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Order from "./components/Order";
import MenuList from "./components/MenuList";
import BookingForm from "./components/BookingForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import RegisterForm from "./components/RegisterForm";
import AuthContext from "./context/authContext";
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
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/about" component={About} />
          <Route exact path="/menuList" component={MenuList}></Route>
          <Route path="/order" component={Order}></Route>
          <Route path="/booking" component={BookingForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route component={Error}></Route>
        </Switch>
      </OrderProvider>
    </AuthContext.Provider>
  );
}
export default App;
