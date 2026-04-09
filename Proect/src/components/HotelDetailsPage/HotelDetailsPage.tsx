import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import "./HotelDetailsPage.css"; // Исправил название импорта стиля

// Импортируем твои ассеты для примера
import hotel1 from "../../assets/images/testhotel2.jpg";
import hotel2 from "../../assets/images/testhotel2.jpg";
import hotel3 from "../../assets/images/testhotel3.jpg";

const HotelDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Заглушка данных. В будущем по id можно искать в массиве или делать API запрос
  const hotel = {
    name: "Sakura Ryokan Premium",
    rating: 9.2,
    location: "Kyoto, Japan, Higashiyama District",
    fullDescription: "Этот традиционный рёкан предлагает аутентичный японский опыт с татами, онсэнами и изысканной кухней кайсеки. Расположен в самом сердце исторического района, где каждый кирпич дышит историей старого Киото. Идеальное место для тех, кто ищет уединения и гармонии с природой.",
    images: [hotel1, hotel2, hotel3],
    // Ссылка на реальный фрейм гугл-карты (Киото)
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3268.1032332155755!2d135.77583627632617!3d34.99158336750059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600108d466ca9495%3A0x6a26759902621746!2sKiyomizu-dera!5e0!3m2!1sru!2sjp!4v1710345678901!5m2!1sru!2sjp"
  };

  return (
    <motion.div 
      className="details-container"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Кнопка назад в твоем стиле */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Назад к отелям
      </button>

      <section className="details-header">
        <div className="header-info">
          <motion.h1 
            initial={{ x: -20 }} 
            animate={{ x: 0 }}
          >
            {hotel.name}
          </motion.h1>
          <div className="rating-badge">
            <FaStar /> <span>{hotel.rating}</span>
          </div>
        </div>
        <p className="location-text">
          <FaMapMarkerAlt /> {hotel.location}
        </p>
      </section>

      <div className="details-grid">
        <div className="main-info-card shadow-glass">
          <div className="image-gallery">
             {hotel.images.map((img, i) => (
               <motion.div 
                 key={i} 
                 className={`gallery-img-wrapper img-${i}`}
                 whileHover={{ scale: 1.02 }}
               >
                 <img src={img} alt={`${hotel.name} view ${i}`} />
               </motion.div>
             ))}
          </div>
          
          <div className="description-section">
            <h3>Описание отеля</h3>
            <p>{hotel.fullDescription}</p>
            
            <div className="features-list">
               <span className="feature-tag">Бесплатный Wi-Fi</span>
               <span className="feature-tag">Завтрак включен</span>
               <span className="feature-tag">Традиционный Онсэн</span>
            </div>
          </div>
        </div>

        <aside className="sidebar-container">
          <div className="map-sidebar shadow-glass">
            <h3>Местоположение</h3>
            <div className="map-wrapper">
              <iframe 
                title="hotel-map"
                src={hotel.mapUrl}
                width="100%" 
                height="250" 
                style={{ border: 0, borderRadius: "15px" }} 
                allowFullScreen 
                loading="lazy" 
              />
            </div>
            <div className="price-info">
               <span className="price-label">Цена за ночь:</span>
               <span className="price-value">¥25,000</span>
            </div>
            <button className="book-btn">Забронировать сейчас</button>
          </div>
        </aside>
      </div>
    </motion.div>
  );
};

export default HotelDetailsPage;
