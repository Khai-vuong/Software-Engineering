import React from "react";
import "../../src/style/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src="/logobku.png" alt="BK Printer" className="logo" />
        <span>BK Printer</span>
      </div>
      <nav className="header-nav">
        <a href="#home">Trang chủ</a>
        <a href="#support">Hỗ trợ</a>
        <div className="dropdown">
          <a href="#guest" className="active">Khách</a>
          <div className="dropdown-content">
            <a href="#logout">Đăng xuất</a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;