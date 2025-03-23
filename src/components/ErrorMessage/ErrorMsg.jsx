import React from "react";
import "./ErrorMsg.css"; // Import the CSS file

const ErrorMsg = ({ children }) => {
  return (
    <div className="error-message">
      {children}
    </div>
  );
};

export default ErrorMsg;
