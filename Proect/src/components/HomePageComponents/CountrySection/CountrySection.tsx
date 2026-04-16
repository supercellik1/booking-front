import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./CountrySection.css";
import HotelCard from "../HotelCard/HotelCard";
import { hotelService } from "../../../api/hotels/hotelService";  
import type { Hotel } from "../../../api/hotels/types";

type Props = {
  title: string;       // Для заголовка (например, "Japan 🇯🇵")
  countryName: string; // Для запроса в БД (например, "Japan")
  bgImage: string;
  color: string;
  titleColor?: string;
};

const CountrySection: React.FC<Props> = ({ title, countryName, bgImage, color, titleColor }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true);  
      try {
        const data = await hotelService.getHotelsByCountry(countryName);
        setHotels(data);
      } catch (error) {
        console.error("Ошибка загрузки отелей для страны " + countryName + ":", error);
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, [countryName]); 

  if (loading) {
    return (
      <section className="country-section section-loading">
        <div className="loader">Загрузка отелей {countryName}...</div>
      </section>
    );
  }

  return (
    <section 
      className="country-section" 
      style={{ 
        "--accent-bg": color, 
        "--accent-title": titleColor ?? color 
      } as React.CSSProperties}
    >
      <div className="bg-image" style={{ backgroundImage: `url(${bgImage})` }} />
      
      <motion.h2 
        className="country-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {title}
      </motion.h2>

      <div className="scroll-wrapper">
        <div className="scroll-controls">
          <button 
            className="scroll-btn" 
            onClick={() => scrollRef.current?.scrollBy({ left: -350, behavior: "smooth" })}
          >
            <FaChevronLeft />
          </button>
          <button 
            className="scroll-btn" 
            onClick={() => scrollRef.current?.scrollBy({ left: 350, behavior: "smooth" })}
          >
            <FaChevronRight />
          </button>
        </div>

        <motion.div 
          className="hotel-row" 
          ref={scrollRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <motion.div
                key={hotel.id}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <HotelCard hotel={hotel} />
              </motion.div>
            ))
          ) : (
            <p className="no-hotels">В данной стране отели пока не найдены.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CountrySection;
