import React, { useEffect, useState, useRef } from "react";
import HotelCard from "../HomePageComponents/HotelCard/HotelCard";
import { useAuth } from "../../context/AuthContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./FavouriteComponents.css";

const FavouriteComponents: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleRemove = (id: number) => {
    setFavorites((prev) => prev.filter((h: any) => h.id !== id));
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated || !user?.id) return;
      try {
        const response = await fetch(`http://localhost:5172/api/Favorites/${user.id}/details`);
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        }
      } catch (error) {
        console.error("Ошибка загрузки избранного:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [user, isAuthenticated]);

  if (!isAuthenticated) return <div className="fav-message">Пожалуйста, войдите в аккаунт</div>;
  if (loading) return <div className="fav-message">Загрузка...</div>;

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h2 className="favorites-title">Мои избранные отели</h2>
        {favorites.length > 0 && (
          <div className="fav-controls">
            <button className="fav-btn" onClick={() => scroll("left")}>
              <FaChevronLeft />
            </button>
            <button className="fav-btn" onClick={() => scroll("right")}>
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {favorites.length > 0 ? (
        <div className="favorites-scroll-wrapper" ref={scrollRef}>
          <div className="favorites-flex-row">
            {favorites.map((hotel: any) => (
              <div className="fav-card-item" key={hotel.id}>
                <HotelCard 
                  hotel={hotel} 
                  isInitiallyLiked={true}
                  onRemove={handleRemove} 
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="fav-message">У вас пока нет избранных отелей.</p>
      )}
    </div>
  );
};

export default FavouriteComponents;
