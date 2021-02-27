import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Joi from "joi";

import foodTruck from "../images/foodTruck.svg";
import {
  faCalendar,
  faMobile,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import AuthContext from "../context/AuthContext";
import FormInput from "./common/FormInput";
import FormSelect from "./common/FormSelect";
import validate from "../utils/validate";
import * as bookingService from "../services/bookingService";

function BookingForm() {
  const { user } = useContext(AuthContext);

  const schema = {
    firstname: Joi.string().required().min(2).label("Firstname"),
    lastname: Joi.string().required().min(2).label("Lastname"),
    mobile: Joi.number().required().min(10).label("Mobile"),
    dateBooked: Joi.string().required().label("Date"),
    timeBooked: Joi.string().required().label("Time"),
    numberinParty: Joi.number()
      .required()
      .min(1)
      .max(20)
      .label("Number in Party"),
  };

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    dateBooked: "",
    timeBooked: "18:00",
    numberinParty: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    dateBooked: "",
    timeBooked: "",
    numberinParty: "",
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

    submit();
  };

  const submit = async () => {
    try {
      data.dateBooked = new Date(
        data.dateBooked.split("/").reverse().join("-")
      ).toISOString();
      data.numberinParty = parseInt(data.numberinParty);

      const defaultValues = { method: 2, status: 0 };
      const booking = { ...data, ...defaultValues };
      console.log(booking);

      await bookingService.saveBooking(booking).then(function (response) {
        if (response.status === 201) window.location.href = "/bookingdetails";
      });
    } catch (error) {
      console.log("error in booking", error);
    }
  };

  const getDates = () => {
    const days = 10; // default 10 days
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

  if (!user)
    return (
      <div className="my-form-container m-5">
        <p>
          <span>Please log in to use Booking Service.</span>
        </p>
        <p className="text-center">
          <Link to="/login">Login</Link>
        </p>
      </div>
    );

  return (
    <div className="my-form-container">
      <div className="my-form-div">
        <form className="my-form-form" onSubmit={handleSubmit}>
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
            error={errors.mobile}
            icon={faMobile}
            type="text"
            value={data.mobile}
            onChange={handleChange}
          />
          <FormSelect
            name="dateBooked"
            icon={faCalendar}
            items={getDates()}
            onChange={handleChange}
            title="Date"
            error={errors.dateBooked}
            value={data.dateBooked}
          />
          <FormInput
            name="numberinParty"
            title="Number In Party"
            icon={faUserPlus}
            type="number"
            value={data.numberinParty}
            error={errors.numberinParty}
            onChange={handleChange}
          />

          <input type="submit" className="my-form-btn" value="Booking" />
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
