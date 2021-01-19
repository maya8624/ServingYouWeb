import React from "react";

const Input = ({ id, name, min, max, onChange, type, value }) => {
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        id={id}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
