import React from "react";
import ErrorMessage from "./ErrorMessage";
import Icon from "./Icon";

const FormInput = ({ name, error, icon, onChange, title, type, value }) => {
  return (
    <>
      <div className="my-form-input">
        <Icon icon={icon} />
        <h6>{title}</h6>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
      <ErrorMessage error={error} />
    </>
  );
};

export default FormInput;
