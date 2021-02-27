import React from "react";

const Input = ({
  checked,
  className,
  disabled,
  id,
  min,
  max,
  name,
  onChange,
  onClick,
  type,
  value,
}) => {
  return (
    <input
      checked={checked}
      className={className}
      disabled={disabled}
      id={id}
      max={max}
      min={min}
      name={name}
      onClick={onClick}
      onChange={onChange}
      type={type}
      value={value}
    />
  );
};

export default Input;
