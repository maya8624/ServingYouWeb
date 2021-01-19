import React, { useState } from "react";
import Joi from "joi";
import validate from "../utils/validate";
import foodTruck from "../images/foodTruck.svg";
import FormInput from "./common/FormInput";

import {
  faLock,
  faMobile,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

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
    <div className="val-login-container">
      <div className="val-div">
        <form className="val-form" onSubmit={handleSubmit}>
          <img className="form-foodTruck" src={foodTruck} alt="" />
          <h2>Register</h2>
          <FormInput
            error={errors.firstname}
            icon={faUser}
            onChange={handleChange}
            name="firstname"
            title="First Name"
            type="text"
            value={data.firstname}
          />
          <FormInput
            error={errors.lastname}
            icon={faUser}
            name="lastname"
            onChange={handleChange}
            title="Last Name"
            type="text"
            value={data.lastname}
          />
          <FormInput
            error={errors.mobile}
            icon={faMobile}
            name="mobile"
            onChange={handleChange}
            title="Mobile"
            type="text"
            value={data.mobile}
          />
          <FormInput
            error={errors.email}
            icon={faEnvelope}
            name="email"
            onChange={handleChange}
            title="Email"
            type="text"
            value={data.email}
          />
          <FormInput
            error={errors.password}
            icon={faLock}
            name="password"
            onChange={handleChange}
            title="Password"
            type="password"
            value={data.password}
          />
          <input type="submit" className="val-btn" value="Register" />
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
