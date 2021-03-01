import React, { useState } from "react";
import Joi from "joi";

import foodTruck from "../images/foodTruck.svg";
import {
  faLock,
  faMobile,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import FormInput from "./common/FormInput";
import Loading from "./common/Loading";
import useAuth from "./hooks/useAuth";

import memberService from "../services/memberService";
import validate from "../utils/validate";

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [registerFailed, setRegisterFailed] = useState(false);
  const auth = useAuth();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
  });

  const schema = {
    firstName: Joi.string().required().label("Firstname"),
    lastName: Joi.string().required().label("Lastname"),
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

    register();
  };

  const register = async () => {
    try {
      setLoading(true);

      // check the email already exists
      const member = await memberService.getMember(data.email);

      if (member) {
        setLoading(false);
        alert("The same email already exists.");
        return;
      }

      // save new member
      const result = await memberService.register(data);

      if (!result === 201) {
        setLoading(false);
        setRegisterFailed(true);
        return null;
      } else {
        // temporarily:  jwt token from a server
        const authData = {
          emai: data.email,
          firstName: data.firstName,
        };  

        auth.logIn(authData.email);

        window.location = "/";
      }
    } catch (error) {
      console.log("Unable to register a new member.", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="my-form-container">
        <div className="my-form-div">
          <form className="my-form" onSubmit={handleSubmit}>
            <img className="form-foodTruck" src={foodTruck} alt="" />
            <h2>Register</h2>
            <FormInput
              error={errors.firstName}
              icon={faUser}
              onChange={handleChange}
              name="firstName"
              title="First Name"
              type="text"
              value={data.firstName}
            />
            <FormInput
              error={errors.lastName}
              icon={faUser}
              name="lastName"
              onChange={handleChange}
              title="Last Name"
              type="text"
              value={data.lastName}
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
            <input type="submit" className="my-form-btn" value="Register" />
          </form>
        </div>
      </div>
      <div>{registerFailed && <h5>Unexpected error has occurred.</h5>}</div>
    </>
  );
}

export default RegisterForm;
