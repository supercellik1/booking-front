import React, { useState } from "react";
import { motion } from "framer-motion";
import "./HotelCard.css";
import { FaHeart, FaStar } from "react-icons/fa";
import type { Hotel } from "../../../api/hotels/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

type Props = {
  hotel: Hotel;
};

const HotelCard: React.FC<Props> = ({ hotel }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 
  
  const poster = hotel.images?.[0];
  const [isLiked, setIsLiked] = useState(false);

  const handleDetailClick = () => {
    if (isAuthenticated) {
      navigate(`/hotel/${hotel.id}`);
    } else {
      alert("Пожалуйста, войдите в аккаунт, чтобы просмотреть детали");
      navigate("/login");
    }
  };

  return (
    <motion.article
      className="hotel-card"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="hotel-poster"
        style={{ backgroundImage: `url(${poster})` }}
      >
        <div className="hotel-poster__overlay" />

        <div className="hotel-meta">
          <div className="hotel-title-row">
            <h3 className="hotel-title">{hotel.name}</h3>

            <div className="hotel-rating">
              <FaStar />
              <span>{hotel.rating}</span>
            </div>
          </div>

          <p className="hotel-desc">{hotel.description}</p>
          
          <button 
            type="button"
            className="hotel-cta" 
            onClick={handleDetailClick}
          >
            Смотреть подробнее
          </button>
        </div>

        <button
          className={`hotel-like-btn ${isLiked ? "is-liked" : ""}`}
          type="button"
          aria-label={isLiked ? "Убрать из избранного" : "Добавить в избранное"}
          onClick={(e) => {
            e.stopPropagation(); 
            setIsLiked((prev) => !prev);
          }}
        >
          <FaHeart />
        </button>
      </div>
    </motion.article>
  );
};

export default HotelCard;
