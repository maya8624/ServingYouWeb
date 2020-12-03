import React, { useState } from "react";
import FormInput from "./common/FormInput";
import validate from "../utils/validate";
import wave from "../images/rwave.svg";
import foodTruck from "../images/foodTruck.svg";
import register from "../images/register.svg";
import {
  faLock,
  faMobile,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Joi from "joi";

function RegisterForm(props) {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    password: "",
  });

  const defaultStyle = "form-input-div";
  const focusStyle = "form-input-div focus";

  const [firstNameStyle, setFirstNameStyle] = useState(defaultStyle);
  const [lastNameStyle, setLastNameStyle] = useState(defaultStyle);
  const [mobileStyle, setMobileStyle] = useState(defaultStyle);
  const [emailStyle, setEmailStyle] = useState(defaultStyle);
  const [passwordStyle, setPasswordStyle] = useState(defaultStyle);

  const schema = {
    firstname: Joi.string().required().label("Firstname"),
    lastname: Joi.string().required().label("Lastname"),
    mobile: Joi.string().required().label("Mobile"),
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
      setErrors((prevErrors) => {
        return { ...prevErrors, [input.name]: errorMessage };
      });
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, [input.name]: "" };
      });
    }

    setData((prevData) => {
      return { ...prevData, [input.name]: input.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorResult = validate.validateData(data, schema);
    setErrors(errorResult || {});
    if (errorResult) return;

    doSubmit();
  };

  const doSubmit = () => {
    try {
      console.log(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <img src={wave} alt="" className="form-wave" />
      <div className="form-container">
        <div className="form-img">
          <img src={register} alt="" />
        </div>
        <div className="form-login-container">
          <form className="form" onSubmit={handleSubmit}>
            <img className="form-foodTruck" src={foodTruck} alt="" />
            <FormInput
              name="firstname"
              title="First Name"
              icon={faUser}
              type="text"
              style={firstNameStyle}
              value={data["firstname"]}
              error={errors["firstname"]}
              onChange={handleChange}
              onFocus={() => setFirstNameStyle(focusStyle)}
              onBlur={() =>
                setFirstNameStyle(data["firstname"] ? focusStyle : defaultStyle)
              }
            />
            <FormInput
              name="lastname"
              title="Last Name"
              icon={faUser}
              type="text"
              style={lastNameStyle}
              value={data["lastname"]}
              error={errors["lastname"]}
              onChange={handleChange}
              onFocus={() => setLastNameStyle(focusStyle)}
              onBlur={() =>
                setLastNameStyle(data["lastname"] ? focusStyle : defaultStyle)
              }
            />
            <FormInput
              name="mobile"
              title="Mobile"
              icon={faMobile}
              type="text"
              style={mobileStyle}
              value={data["mobile"]}
              error={errors["mobile"]}
              onChange={handleChange}
              onFocus={() => setMobileStyle(focusStyle)}
              onBlur={() =>
                setMobileStyle(data["mobile"] ? focusStyle : defaultStyle)
              }
            />
            <FormInput
              name="email"
              title="Email"
              icon={faEnvelope}
              type="text"
              style={emailStyle}
              value={data["email"]}
              error={errors["email"]}
              onChange={handleChange}
              onFocus={() => setEmailStyle(focusStyle)}
              onBlur={() =>
                setEmailStyle(data["email"] ? focusStyle : defaultStyle)
              }
            />
            <FormInput
              name="password"
              title="Password"
              icon={faLock}
              type="password"
              style={passwordStyle}
              value={data["password"]}
              error={errors["password"]}
              onChange={handleChange}
              onFocus={() => setPasswordStyle(focusStyle)}
              onBlur={() =>
                setPasswordStyle(data["password"] ? focusStyle : defaultStyle)
              }
            />
            <input type="submit" className="form-btn" value="Register" />
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
