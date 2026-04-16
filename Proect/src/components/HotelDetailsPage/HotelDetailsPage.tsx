import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import "./HotelDetailsPage.css";
import { hotelService } from "../../api/hotels/hotelService"; 
import type { Hotel } from "../../api/hotels/types"; 

const HotelDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
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
    fetchHotel();
  }, [id]);

  if (loading) return <div className="loading-screen">読み込み中...</div>;
  if (!hotel) return <div className="error-screen">Hotel not found</div>;

  return (
    <div className="hotel-page-wrapper">
      <button className="back-arrow-fixed" onClick={() => navigate(-1)}>
         ❮
      </button>

      <div className="content-layout">
        <main className="main-content">
          <div className="glass-card slider-section">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImg}
                src={hotel.images[currentImg]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="main-slider-img"
              />
            </AnimatePresence>
            <div className="slider-nav">
              <button onClick={() => setCurrentImg(prev => prev === 0 ? hotel.images.length-1 : prev-1)}>❮</button>
              <span>{currentImg + 1} / {hotel.images.length}</span>
              <button onClick={() => setCurrentImg(prev => prev === hotel.images.length-1 ? 0 : prev+1)}>❯</button>
            </div>
          </div>

          <div className="glass-card info-section">
            <h1>{hotel.name}</h1>
            <div className="location-line">
              <FaMapMarkerAlt /> {hotel.location}
            </div>
            <div className="description-text">
              <h3>About this place</h3>
              <p>{hotel.fullDescription}</p>
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
            <button className="main-register-button"
            onClick={() => navigate(`/book/${hotel.id}`)}>
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
