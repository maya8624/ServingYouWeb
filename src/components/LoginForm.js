import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Joi from "joi";
import foodTruck from "../images/foodTruck.svg";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

import FormInput from "./common/FormInput";
import authService from "../services/authService";
import validate from "../utils/validate";
import useAuth from "./hooks/useAuth";

function LoginForm(props) {
  const auth = useAuth();
  const history = useHistory();
  const [loginFailed, setLoginFailed] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const schema = {
    email: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9-.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"))
      .label("Email")
      .messages({
        "string.pattern.base": "Invalid Email Format...",
      }),
    password: Joi.string()
      .required()
      .min(3)
      .label("Password")
      //.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)
      .messages({
        "string.pattern.base": "Invalid passsword format.",
      }),
  };

  const handleChange = ({ currentTarget: input }) => {
    const errorMessage = validate.validateProperty(
      input.name,
      input.value,
      schema
    );

    if (errorMessage) {
      setError((prevErrors) => {
        return { ...prevErrors, [input.name]: errorMessage };
      });
    } else {
      setError((prevErrors) => {
        return { ...prevErrors, [input.name]: "" };
      });
    }

    setData((prevData) => {
      return { ...prevData, [input.name]: input.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate.validateData(data, schema);
    setError(errors || {});
    if (errors) return;

    logIn();
  };

  const logIn = async () => {
    try {
      const result = await authService.logIn(
        data.email.trim(),
        data.password.trim()
      );

      if (!result) {
        return setLoginFailed(true);
      }

      setLoginFailed(false);

      // setUser() in context
      // temporarily:  jwt token will get from a server
      auth.logIn(result.email);

      // return to the previous page
      history.goBack();
    } catch (error) {
      console.log("Unable to add a user.", error);
    }
  };

  return (
    <>
      <div className="my-form-container">
        <div className="my-form-div">
          <form className="my-form" onSubmit={handleSubmit}>
            <img className="form-foodTruck" src={foodTruck} alt="" />
            <h2>Log-in</h2>
            <FormInput
              name="email"
              error={error.email}
              icon={faEnvelope}
              onChange={handleChange}
              title="Email"
              type="text"
              value={data.email}
            />
            <FormInput
              name="password"
              error={error.password}
              icon={faLock}
              onChange={handleChange}
              title="Password"
              type="password"
              value={data.password}
            />
            <input type="submit" className="my-form-btn" value="Login" />
            {/* <a href="#">Forgot Password?</a> */}
            <Link to="/register">Register</Link>
          </form>
        </div>
      </div>
      <div>{loginFailed && <h5>email or password is invalid</h5>}</div>
    </>
  );
}

export default LoginForm;
