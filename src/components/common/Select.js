import React from "react";

const Select = ({ items, onChange, name, title, value }) => {
  return (
    <div>
      <h6>{title}</h6>
      <select id={name} name={name} onChange={onChange} value={value}>
        {items.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
