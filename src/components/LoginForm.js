import React, { useState } from "react";
import FormInput from "./common/FormInput";
import validate from "../utils/validate";
import authService from "../services/authService";
import useAuth from "./hooks/useAuth";

import Joi from "joi";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import wave from "../images/wave.svg";
import foodTruck from "../images/foodTruck.svg";
import account from "../images/account.svg";

function LoginForm(props) {
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
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)
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

    doSubmit();
  };

  // const logIn = (authToken) => {
  //   const user = authToken; //jwtDecode(authToken);
  //   setUser(user);
  //   authService.storeToken(authToken);
  // };

  const doSubmit = () => {
    try {
      const result = authService.logIn(data.email, data.password);

      if (!result) return setLoginFailed(true);
      setLoginFailed(false);

      // store user info in to local storage

      auth.logIn(result.email + "jwt123"); // jwt token

      // console.log(props);

      // const { state } = props.location;
      // window.location = state ? state.from.pathname : "/";

      window.location = "/";

      console.log("result", result);
    } catch (ex) {
      console.log(ex);
    }
  };
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  return (
    // <img src={wave} alt="" className="form-wave" />
    <div className="val-login-container">
      <div className="val-div">
        <form className="val-form" onSubmit={handleSubmit}>
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
          <input type="submit" className="val-btn" value="Login" />
          <a href="#">Forgot Password?</a>
        </form>

        {loginFailed && <h2>email or password is not correct</h2>}
      </div>
    </div>
  );
}

export default LoginForm;
