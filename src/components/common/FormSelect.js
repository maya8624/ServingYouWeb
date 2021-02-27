import React from "react";

import ErrorMessage from "./ErrorMessage";
import Icon from "./Icon";

const FormSelect = ({ error, icon, items, onChange, name, title, value }) => {
  return (
    <>
      <div className="my-form-input">
        {icon && <Icon icon={icon} />}
        <h6>{title}</h6>
        <select id={name} name={name} onChange={onChange} value={value}>
          {items.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
      </div>
      <div>{error && <ErrorMessage error={error} />}</div>
    </>
  );
};

export default FormSelect;
