import React, { useState, useEffect } from "react"; // Добавили useEffect
import { motion } from "framer-motion";
import "./HotelCard.css";
import { FaHeart, FaStar } from "react-icons/fa";
import type { Hotel } from "../../../api/hotels/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

type Props = {
  hotel: Hotel;
  isInitiallyLiked?: boolean;
  onRemove?: (id: number) => void;
};

const HotelCard: React.FC<Props> = ({ hotel, isInitiallyLiked = false, onRemove }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth(); 
  
  const poster = hotel.images?.[0];
  
  const [isLiked, setIsLiked] = useState(isInitiallyLiked);

  useEffect(() => {
    setIsLiked(isInitiallyLiked);
  }, [isInitiallyLiked]);

  const toggleLike = async () => {
    if (!isAuthenticated || !user) {
      navigate("/login");
      return;
    }

    const method = isLiked ? "DELETE" : "POST";
    const url = `http://localhost:5172/api/Favorites?userId=${user.id}&hotelId=${hotel.id}`;

    try {
      const response = await fetch(url, { method });
      if (response.ok) {
        if (isLiked && onRemove) {
          onRemove(hotel.id);
        } else {
          setIsLiked(!isLiked);
        }
      }
    } catch (err) {
      console.error("Ошибка при связи с БД:", err);
    }
  };

  const handleDetailClick = () => {
    if (isAuthenticated) {
      navigate(`/hotel/${hotel.id}`);
    } else {
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
          onClick={(e) => {
            e.stopPropagation();
            toggleLike();
          }}
        >
          <FaHeart />
        </button>
      </div>
    </motion.article>
  );
};

export default HotelCard;
