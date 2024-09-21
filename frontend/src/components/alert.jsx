import React, { useState } from "react";
import "./alert.css";
import { usePassword } from "../context/backend";

const Alert = () => {
  
  let { alert, setalert } = usePassword();

  const closeAlert = () => {
    setalert(null);
  };

  return (
    alert && (
      <div className={`alert alert-${alert.type}`}>
        <span className="closebtn" onClick={closeAlert}>
          &times;
        </span>
        {alert.message}
      </div>
    )
  );
};

export default Alert;
