import React, { useEffect, useState } from "react";
import { hotelService } from "../../api/hotels/hotelService";
import { useAuth } from "../../context/AuthContext";
import "./MyBookingsList.css";

const MyBookingsList: React.FC = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (token) {
          const data = await hotelService.getUserBookings(token);
          setBookings(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token]);

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;

  return (
    <div className="bookings-page-wrapper">
      <div className="bookings-container">
        <h2 className="page-title">Мои Поездки</h2>
        {bookings.length === 0 ? (
          <div className="empty-state">
            <p className="no-bookings">У вас пока нет активных бронирований.</p>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map((b) => (

                <div key={b.id} className="booking-card-glass">
                    <div className="card-header">
                        <span className="hotel-label">{b.location}</span>
                            <h4 className="hotel-id-text">{b.hotelName || `Отель #${b.hotelId}`}</h4>
                            <div className="hotel-rating">⭐ {b.rating}</div>
                    </div>
                <div className="booking-details">
                <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <div>
                        <label>Заезд — Выезд</label>
                 <p>{new Date(b.checkIn).toLocaleDateString()} — {new Date(b.checkOut).toLocaleDateString()}</p>
                        </div>
                        </div>
                        <div className="detail-item">
                            <span className="detail-icon">👤</span>
                        <div>
                            <label>Количество гостей</label>
                            <p>{b.guests} чел.</p>
                        </div>
                    </div>
                </div>

                <div className="card-footer">
                    <span className="status-badge-active">Подтверждено</span>
                </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsList;
