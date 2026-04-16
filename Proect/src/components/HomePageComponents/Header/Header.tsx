import React, { useState } from "react";
import "./Header.css";
import { FaUserCircle, FaHeart, FaSuitcaseRolling, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const logoImage = new URL("../../../assets/images/logo.png", import.meta.url).href;

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleAvatarClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setMenuOpen(!menuOpen);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <button className="site-logo" onClick={() => navigate("/")} type="button">
            <img src={logoImage} alt="Логотип" className="site-logo-image" />
          </button>

          <nav className="nav">
            <button className="nav-btn"><FaHeart /> Избранное</button>
            <button className="nav-btn" onClick={() => navigate("/my-bookings")}>
                <FaSuitcaseRolling /> Бронирования
            </button>
          </nav>
        </div>

        <div className="profile-section">
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </button>

          <div
            className="avatar"
            onClick={handleAvatarClick}
            role="button"
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            <FaUserCircle />
            {isAuthenticated && (
              <span className="user-dot" style={{
                position: 'absolute', bottom: 0, right: 0,
                width: '10px', height: '10px', background: '#00ff00',
                borderRadius: '50%', border: '2px solid #fff'
              }}></span>
            )}
          </div>

          {menuOpen && (
            <div className="dropdown">
              {isAuthenticated ? (
                <>
                  <div className="dropdown-item" onClick={() => { navigate("/profile"); setMenuOpen(false); }}>
                    Профиль ({user?.email})
                  </div>
                  <div className="dropdown-item">Мои поездки</div>
                  <div className="dropdown-item logout-btn" onClick={() => { logout(); setMenuOpen(false); }}>
                    Выйти
                  </div>
                </>
              ) : (
                <div className="dropdown-item" onClick={() => { navigate("/login"); setMenuOpen(false); }}>
                  Войти
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
