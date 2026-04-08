import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./CountrySection.css";
import HotelCard from "../HotelCard/HotelCard";

const testhotel1 = new URL("../../../assets/images/testotel.jpg", import.meta.url).href;
const testhotel2 = new URL("../../../assets/images/testhotel2.jpg", import.meta.url).href;
const testhotel3 = new URL("../../../assets/images/testhotel3.jpg", import.meta.url).href;

type Hotel = {
  name: string;
  rating: number;
  description: string;
  images: string[]; 
};

type Props = {
  title: string;
  bgImage: string;
  color: string;
  titleColor?: string;
};

const CountrySection: React.FC<Props> = ({ title, bgImage, color, titleColor }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const hotels: Hotel[] = [
    {
      name: "Sakura Ryokan",
      rating: 9.2,
      description: "Традиционный японский рёкан с видом на сакуру и онсэнами.",
      images: [testhotel1, testhotel2, testhotel3],
    },
    {
      name: "Kyoto Night Hotel",
      rating: 8.8,
      description: "Киберпанк отель в центре ночного Киото.",
      images: [testhotel1, testhotel2, testhotel3],
    },
    {
      name: "Mount Fuji View Inn",
      rating: 9.6,
      description: "Вид на Фудзи и японские сады.",
      images: [testhotel1, testhotel2, testhotel3],
    },
  ];

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const row = scrollRef.current;
    if (!row) return;

    isDraggingRef.current = true;
    startXRef.current = e.pageX - row.offsetLeft;
    scrollLeftRef.current = row.scrollLeft;
    row.classList.add("is-dragging");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return;

    e.preventDefault();
    const row = scrollRef.current;
    const x = e.pageX - row.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    row.scrollLeft = scrollLeftRef.current - walk;
  };

  const stopDragging = () => {
    if (!scrollRef.current) return;

    isDraggingRef.current = false;
    scrollRef.current.classList.remove("is-dragging");
  };

  const scrollCards = (direction: "left" | "right") => {
    const row = scrollRef.current;
    if (!row) return;

    const firstCard = row.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 28 : row.clientWidth * 0.9;

    row.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="country-section"
      style={
        {
          "--accent-bg": color,
          "--accent-title": titleColor ?? color,
        } as React.CSSProperties
      }
    >
      <div className="bg-image" style={{ backgroundImage: `url(${bgImage})` }} />

      <motion.h2
        className="country-title"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>

      <div className="scroll-wrapper">
        <div className="scroll-controls" aria-label="Управление прокруткой отелей">
          <button
            type="button"
            className="scroll-btn"
            onClick={() => scrollCards("left")}
            aria-label="Прокрутить влево"
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            className="scroll-btn"
            onClick={() => scrollCards("right")}
            aria-label="Прокрутить вправо"
          >
            <FaChevronRight />
          </button>
        </div>

        <motion.div
          className="hotel-row"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onDragStart={(e) => e.preventDefault()}
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {hotels.map((hotel, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <HotelCard hotel={hotel} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CountrySection;
