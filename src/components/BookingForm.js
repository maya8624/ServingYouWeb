import React, { useState } from "react";
import Joi from "joi";
import FormInput from "./common/FormInput";
import validate from "../utils/validate";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import wave from "../images/bwave.svg";
import foodTruck from "../images/foodTruck.svg";
import booking from "../images/booking.svg";
import {
  faMobile,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import * as bookingservices from "../services/bookingServices";
import ErrorMessage from "./common/ErrorMessage";
import img from "../images/hamburger.jpg";
import logo from "../images/logo.png";

function BookingForm(props) {
  const [startDate, setStartDate] = useState();

  const addDays = (dt, days) => {
    return dt.setDate(dt.getDate() + days);
  };

  const setHours = (date, hours) => {
    date.setHours(hours);
    return date;
  };

  const setMinutes = (date, minutes) => {
    date.setMinutes(minutes);
    return date;
  };

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

  const defaultStyle = "form-input-div";
  const focusStyle = "form-input-div focus";

  const [firstNameStyle, setFirstNameStyle] = useState(defaultStyle);
  const [lastNameStyle, setLastNameStyle] = useState(defaultStyle);
  const [mobileStyle, setMobileStyle] = useState(defaultStyle);
  const [numberInPartyStyle, setNumberInPartyStyle] = useState(defaultStyle);

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
      console.log(bookingservices.saveBooking(data));
    } catch (ex) {
      console.log("error", ex);
    }
  };

  return (
    <>
      <img src={wave} alt="" className="form-wave" />
      <div className="form-container">
        <div className="form-img">
          <img src={booking} alt="" />
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

            <div className="b-wrap2">
              <label>Date</label>
              <DatePicker
                name="date"
                dateFormat="dd/MM/yyyy"
                timeFormat="HH:mm"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                maxDate={addDays(new Date(), 14)}
              />
              <span className="b-focus-input2"></span>
              {errors.date && <ErrorMessage error={errors.date} />}
            </div>
            <div className="b-wrap2">
              <label>Time</label>
              <select name="time" onChange={handleChange}>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
                <option value="18:00">18:00</option>
                <option value="18:30">18:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
              </select>
              <span className="b-focus-input2"></span>
              {errors.time && <ErrorMessage error={errors.time} />}
            </div>
            <FormInput
              name="numberInParty"
              title="Number In Party"
              icon={faUserPlus}
              type="text"
              style={numberInPartyStyle}
              value={data["numberInParty"]}
              error={errors["numberInParty"]}
              onChange={handleChange}
              onFocus={() => setNumberInPartyStyle(focusStyle)}
              onBlur={() =>
                setNumberInPartyStyle(
                  data["numberInParty"] ? focusStyle : defaultStyle
                )
              }
            />
            <input type="submit" className="form-btn" value="Booking" />
          </form>
        </div>
      </div>
    </>
  );
}

export default BookingForm;
