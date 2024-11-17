import React from "react";
import "../../style/GuestUser.css";
import background from "../../assets/background1.png";

const GuestUserHomePage = () => {
  return (
    <div className="main-content">
      <div className="welcome-section">
        <h1>Chào mừng bạn đến với BK Printer</h1>
        <h2 className="highlight">Người dùng khách</h2>
      </div>
      <img src={background} alt="background" className="background" />
    </div>
  );
};

export default GuestUserHomePage;