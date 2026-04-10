import React, { useState } from "react";
import "./Header.css";
import { FaUserCircle, FaHeart, FaSuitcaseRolling, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const logoImage = new URL("../../../assets/images/logo.png", import.meta.url).href;

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <button
            className="site-logo"
            onClick={() => {
              navigate("/");
            }}
            aria-label="Перейти на главную"
            type="button"
          >
            <img src={logoImage} alt="Логотип сайта" className="site-logo-image" />
          </button>

          <nav className="nav">
            <button className="nav-btn">
              <FaHeart />
              Избранное
            </button>

            <button className="nav-btn">
              <FaSuitcaseRolling />
              Бронирования
            </button>
          </nav>
        </div>

        <div className="profile-section">

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>

          <div
            className="avatar"
            onClick={() => {
               navigate("/login");
            }}
            role="button"
            aria-label="Перейти на страницу аутентификации"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate("/login");
              }
            }}
          >
            <FaUserCircle />
          </div>

          {menuOpen && (
            <div className="dropdown">
              <div className="dropdown-item">Профиль</div>
              <div className="dropdown-item">Мои поездки</div>
              <div className="dropdown-item">Настройки</div>
              <div className="dropdown-item logout">Выйти</div>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};

export default Header;
