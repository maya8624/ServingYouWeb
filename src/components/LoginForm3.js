import React, { useState } from "react";
import validate from "../utils/validate";
import Joi from "joi";
import wave from "../images/wave.svg";
import foodTruck from "../images/foodTruck.svg";
import account from "../images/account.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Form from "./common/form";

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

  const doSubmit = () => {
    try {
      console.log(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const [emailCss, setEmailCss] = useState();
  const [passwordCss, setPasswordCss] = useState();

  return (
    <>
      <img src={wave} alt="" className="form-wave" />
      <div className="form-container">
        <div className="form-img">
          <img src={account} alt="" />
        </div>
        <div className="form-login-container">
          <form className="form" onSubmit={handleSubmit}>
            <img className="form-foodTruck" src={foodTruck} alt="" />
            <h2>Log-in</h2>

            {Form.renderInput(
              "email",
              data,
              error,
              schema,
              "form-input-div one",
              "email"
            )}

            <div className={!emailCss ? "form-input-div one" : emailCss}>
              <div className="form-i">
                <i>
                  <FontAwesomeIcon icon={faUser} />
                </i>
              </div>
              <div className="div">
                <h5>Email</h5>
                <input
                  className="form-input"
                  name="email"
                  type="text"
                  onChange={handleChange}
                  onFocus={() => setEmailCss("form-input-div one focus")}
                  onBlur={() => setEmailCss("form-input-div one")}
                />
              </div>
            </div>
            <div
              className="text-danger"
              style={{
                position: "relative",
                textAlign: "right",

                fontSize: "12px",
                color: "#F44336",
              }}
            >
              {error && error["email"]}
            </div>
            <div className={!passwordCss ? "form-input-div two" : passwordCss}>
              <div className="form-i">
                <i>
                  <FontAwesomeIcon icon={faLock} />
                </i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  className="form-input"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onFocus={() => setPasswordCss("form-input-div two focus")}
                  onBlur={() => setPasswordCss("form-input-div two")}
                />
              </div>
            </div>
            <div
              style={{
                position: "relative",
                textAlign: "right",
                fontSize: "12px",
                color: "#F44336",
              }}
            >
              {error && error["password"]}
            </div>
            <input type="submit" className="form-btn" value="Login" />
            <a href="#">Forgot Password?</a>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
