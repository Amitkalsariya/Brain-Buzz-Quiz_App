import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-space">
      <Link to="/" className="title">
        🧠 Brain <span>Buzz</span> ⚡
      </Link>
      </div>
      {/* <hr className="divider" /> */}
    </div>
  );
};

export default Header;
