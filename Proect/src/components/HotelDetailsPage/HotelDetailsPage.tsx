import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import "./HotelDetailsPage.css";
import { hotelService } from "../../api/hotels/hotelService";
import type { Hotel } from "../../api/hotels/types";

const fallbackImg = "/fallback-image.jpg";  

const HotelDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImg, setCurrentImg] = useState(0);
  const [imgError, setImgError] = useState(false);

  // Новые состояния для отзывов
  const [reviews, setReviews] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  const fetchReviews = async () => {
    if (!id) return;
    try {
      const data = await hotelService.getHotelReviews(id);
      setReviews(data);
    } catch (e) {
      console.error("Ошибка загрузки отзывов:", e);
    }
  };

  const fetchHotel = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await hotelService.getHotelById(id);
      setHotel(data);
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotel();
    fetchReviews();
  }, [id]);

  useEffect(() => setImgError(false), [currentImg, hotel]);

  const handleSendReview = async () => {
    if (!newComment.trim() || !token || !id) return;
    try {
      await hotelService.postReview(token, {
        hotelId: Number(id),
        rating: newRating,
        comment: newComment
      });
      setNewComment("");
      setNewRating(5);
      fetchReviews(); // Перезагружаем список после отправки
    } catch (e) {
      alert("Не удалось отправить отзыв");
    }
  };

  if (loading) return <div className="loading-screen">読み込み中...</div>;
  if (!hotel) return <div className="error-screen">Hotel not found</div>;

  const images = hotel.images && hotel.images.length > 0 ? hotel.images : [fallbackImg];
  const mainImg = !imgError ? images[currentImg % images.length] : fallbackImg;

  return (
    <div className="hotel-page-wrapper">
      <button className="back-arrow-fixed" onClick={() => navigate(-1)}>
        ❮ Back
      </button>

      <div className="content-layout">
        <main className="main-content">
          <div className="glass-card slider-section" style={{ position: "relative" }}>
            <div className="main-slider-img-frame">
              <AnimatePresence mode="wait">
                <motion.img
                  key={mainImg + imgError}
                  src={mainImg}
                  alt={`Фото отеля ${hotel.name}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="main-slider-img"
                  draggable={false}
                  onError={() => setImgError(true)}
                />
              </AnimatePresence>
            </div>
            <div className="slider-nav">
              <button
                onClick={() => setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                disabled={images.length <= 1}
              >❮</button>
              <span>{(currentImg % images.length) + 1} / {images.length}</span>
              <button
                onClick={() => setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                disabled={images.length <= 1}
              >❯</button>
            </div>
          </div>

          <div className="glass-card info-section">
            <h1>{hotel.name}</h1>
            <div className="location-line">
              <FaMapMarkerAlt /> {hotel.location}
            </div>
            <div className="description-text">
              <h3>About this place</h3>
              <p className="full-desc">{hotel.fullDescription}</p>
            </div>
          </div>

          {/* НОВАЯ СЕКЦИЯ ОТЗЫВОВ */}
          <div className="glass-card reviews-section">
            <h3 className="section-title">Guest Reviews</h3>
            
            {isAuthenticated ? (
              <div className="add-review-container">
                <div className="review-stars-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar 
                      key={star}
                      onClick={() => setNewRating(star)}
                      color={star <= newRating ? "#ff5c8a" : "#ffe4e8"}
                      style={{ cursor: 'pointer', fontSize: '1.2rem', marginRight: '5px' }}
                    />
                  ))}
                  <span className="rating-label">{newRating} / 5</span>
                </div>
                <div className="review-input-wrapper">
                  <textarea 
                    placeholder="Tell us about your stay..." 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button className="send-review-btn" onClick={handleSendReview}>
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            ) : (
              <p className="login-prompt">Please log in to leave a review.</p>
            )}

            <div className="reviews-list">
              {reviews.length > 0 ? (
                reviews.map((rev) => (
                  <div key={rev.id} className="review-card">
                    <div className="review-header">
                      <span className="reviewer-name">{rev.userName}</span>
                      <div className="reviewer-rating">
                        <FaStar color="#ffb7c5" /> {rev.rating}
                      </div>
                    </div>
                    <p className="review-text">{rev.comment}</p>
                    <span className="review-date">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="no-reviews">No reviews yet. Be the first!</p>
              )}
            </div>
          </div>
        </main>

        <aside className="sidebar-content">
          <div className="glass-card booking-card">
            <div className="price-header">
              <span className="price-val">{hotel.price}</span>
              <span className="price-sub">/ per night</span>
            </div>
            <div className="rating-row">
              <FaStar color="#ffb7c5" /> {hotel.rating} Excellent
            </div>
            <button className="main-register-button" onClick={() => navigate(`/book/${hotel.id}`)}>
              Book Now
            </button>
          </div>

          <div className="glass-card map-card">
            <h3>Location</h3>
            <div className="map-holder">
              <iframe title="map" src={hotel.mapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HotelDetailsPage;
