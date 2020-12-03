import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";

import About from "./pages/About";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Order from "./pages/Order";
import MenuList from "./components/MenuList";
import BookingForm from "./components/BookingForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/about" component={About} />
        <Route exact path="/menuList" component={MenuList}></Route>
        <Route path="/orrder" component={Order}></Route>
        <Route path="/booking" component={BookingForm}></Route>
        <Route path="/login" component={LoginForm}></Route>
        <Route path="/register" component={RegisterForm}></Route>
        <Route component={Error}></Route>
      </Switch>
    </>
  );
}
export default App;
