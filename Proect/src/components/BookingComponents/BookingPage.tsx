import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { hotelService } from "../../api/hotels/hotelService";
import { useAuth } from "../../context/AuthContext";
import "./BookingPage.css";

interface Props {
  hotelId: string;
}

const BookingForm: React.FC<Props> = ({ hotelId }) => {
  const navigate = useNavigate();
  const { token } = useAuth(); 
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    fullName: "",
    email: "",
    guests: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      alert("Вы должны быть авторизованы для бронирования");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await hotelService.bookHotel({ ...formData, hotelId }, token);
      
      alert("Успешно! Отель забронирован.");
      navigate("/"); 
    } catch (error) {
      console.error("Booking error:", error);
      alert("Ошибка при бронировании. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="glass-card booking-card-form"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3>Confirm Your Booking</h3>
      <form onSubmit={handleSubmit} className="booking-form-element">
        
        <div className="input-field">
          <label>Full Name</label>
          <input 
            type="text" 
            placeholder="John Doe" 
            required 
            value={formData.fullName}
            onChange={e => setFormData({...formData, fullName: e.target.value})} 
          />
        </div>

        <div className="input-field">
          <label>Email Address</label>
          <input 
            type="email" 
            placeholder="example@mail.com" 
            required 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})} 
          />
        </div>

        <div className="date-row">
          <div className="input-field">
            <label>Check-in</label>
            <input 
              type="date" 
              required 
              value={formData.checkIn}
              onChange={e => setFormData({...formData, checkIn: e.target.value})} 
            />
          </div>
          <div className="input-field">
            <label>Check-out</label>
            <input 
              type="date" 
              required 
              value={formData.checkOut}
              onChange={e => setFormData({...formData, checkOut: e.target.value})} 
            />
          </div>
        </div>

        <div className="input-field">
          <label>Number of Guests</label>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.guests || 1}
            onChange={e => {
                const val = parseInt(e.target.value, 10);
                setFormData({
                ...formData,
                guests: isNaN(val) ? 1 : val
                });
            }}
            />
        </div>

        <button 
          type="submit" 
          className="main-register-button" 
          disabled={loading}
        >
          {loading ? "Processing..." : "Book Now"}
        </button>
      </form>
    </motion.div>
  );
};

export default BookingForm;
