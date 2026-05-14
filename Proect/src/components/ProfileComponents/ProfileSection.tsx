import React from "react";
import { motion } from "framer-motion";
import "./ProfileSection.css";
import { useAuth } from "../../context/AuthContext";
import { FaUserCircle, FaEnvelope, FaIdBadge, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const ProfileSection: React.FC = () => {
  const { user } = useAuth();
  const fullName = user?.fullName || "Не указано";
  const email = user?.email || "Не указано";
  const userId = user?.id ?? "—";
  const rawRole = ((user as { role?: string } | undefined)?.role || "traveler").toLowerCase();
  const roleLabel =
    rawRole === "admin"
      ? "Админ"
      : rawRole === "manager"
        ? "Менеджер"
        : "Путешественник";

  const navigate = useNavigate();
  console.log("user", user);
  return (
    <div className="profile-page">
      <motion.div
        className="profile-card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="profile-top">
          <div className="avatar-wrap">
            <FaUserCircle className="avatar-icon" />
          </div>

          <div className="user-main">
            <h1>{fullName}</h1>
            <span className={`role-badge ${rawRole === "admin" ? "admin" : "traveler"}`}>
              {rawRole === "admin" ? <FaShieldAlt /> : <FaUserCircle />}
              {roleLabel}
            </span>
          </div>
        </div>

        <div className="profile-info-grid">
          <div className="info-item">
            <div className="info-label">
              <FaEnvelope />
              Email
            </div>
            <div className="info-value">{email}</div>
          </div>

          <div className="info-item">
            <div className="info-label">
              <FaIdBadge />
              ID
            </div>
            <div className="info-value">{userId}</div>
          </div>

          <div className="info-item">
            <div className="info-label">
              <FaShieldAlt />
              Роль
            </div>
            <div className="info-value">{roleLabel}</div>
          </div>

          <div className="info-item">
            <div className="info-label">
              <FaUserCircle />
              Имя
            </div>
            <div className="info-value">{fullName}</div>
          </div>
        </div>

        {rawRole === "admin" && (
          <div style={{ marginTop: 24 }}>
            <button
              className="admin-panel-btn"
              onClick={() => navigate("/admin")}
              style={{ backgroundColor: "#ad213b", color: "white" }}
            >
              Админ-панель
            </button>
          </div>
        )}

                {(rawRole === "admin" || rawRole === "manager") && (
          <div style={{ marginTop: 24 }}>
            <button
              className="add-hotel-btn"
              onClick={() => navigate("/hotel/add")} 
              style={{ backgroundColor: "#1ba94b", color: "white", marginBottom: 10 }}
            >
              Добавить отель
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileSection;