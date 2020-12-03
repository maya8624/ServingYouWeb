import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({
  name,
  error,
  icon,
  onBlur,
  onChange,
  onFocus,
  style,
  title,
  type,
  value,
}) => {
  return (
    <>
      {/* <img src={wave} alt="" className="form-wave" />
      <div className="form-container">
        <div className="form-img">
          <img src={account} alt="" />
        </div>
        <div className="form-login-container"> */}
      <div className={style}>
        <div className="form-i">
          <i>
            <FontAwesomeIcon icon={icon} />
          </i>
        </div>
        <div className="div">
          <h5>{title}</h5>
          <input
            className="form-input"
            id={name}
            name={name}
            type={type}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {/* </div>
      </div> */}
    </>
  );
};

export default Input;
