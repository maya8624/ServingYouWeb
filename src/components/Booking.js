import React, { useState } from "react";
import Joi from "joi";
import foodTruck from "../images/foodTruck.svg";

import {
  faCalendar,
  faMobile,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import * as bookingservice from "../services/bookingService";
import validate from "../utils/validate";
import FormInput from "./common/FormInput";
import Select from "./common/Select";

function BookingForm(props) {
  const schema = {
    firstname: Joi.string().required().min(2).label("Firstname"),
    lastname: Joi.string().required().min(2).label("Lastname"),
    mobile: Joi.number().required().min(10).label("Mobile"),
    date: Joi.string().required().label("Date"),
    time: Joi.string().required().label("Time"),
    numberInParty: Joi.number()
      .required()
      .min(1)
      .max(20)
      .label("Number in Party"),
  };

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    date: "",
    time: "",
    numberInParty: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    date: "",
    time: "",
    numberInParty: "",
  });

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
      const error = validate();
      if (error) console.log(error);

      //console.log(data);
      console.log(bookingservice.saveBooking(data));
    } catch (ex) {
      console.log("error", ex);
    }
  };

  const getDates = () => {
    const days = 10; // initial days
    const dates = [];
    const dt = new Date();

    for (let i = 1; i <= days; i++) {
      dt.setDate(dt.getDate() + 1);

      let dd = dt.getDate();
      let mm = dt.getMonth() + 1;
      let yyyy = dt.getFullYear();

      dates.push(`${dd}/${mm}/${yyyy}`);
    }

    return ["Select", ...dates];
  };

  return (
    <div className="val-login-container">
      <div className="val-div">
        <form className="val-form" onSubmit={handleSubmit}>
          <img className="form-foodTruck" src={foodTruck} alt="" />
          <FormInput
            name="firstname"
            title="First Name"
            icon={faUser}
            type="text"
            value={data.firstname}
            error={errors.firstname}
            onChange={handleChange}
          />
          <FormInput
            name="lastname"
            title="Last Name"
            icon={faUser}
            type="text"
            value={data.lastname}
            error={errors.lastname}
            onChange={handleChange}
          />
          <FormInput
            name="mobile"
            title="Mobile"
            icon={faMobile}
            type="text"
            value={data.mobile}
            error={errors.mobile}
            onChange={handleChange}
          />
          <Select
            name="date"
            error={errors["date"]}
            icon={faCalendar}
            items={getDates()}
            onChange={handleChange}
            title="Date"
            value={data.date}
          />
          <FormInput
            name="numberInParty"
            title="Number In Party"
            icon={faUserPlus}
            type="text"
            value={data.numberInParty}
            error={errors.numberInParty}
            onChange={handleChange}
          />

          <input type="submit" className="val-btn" value="Booking" />
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
