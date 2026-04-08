import React from "react";
import "./Hero.css";
import japanVideo from "../../../assets/video/japan.mp4";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">

      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={japanVideo} type="video/mp4" />
      </video>
      <div className="hero-content" id="logo">
          🌸 Presidential Royal Booking Carolina Reaper Six-Seven V12 911 Carbon GT3 RS Edition
          <p>Сайт по бронированию отелей</p>
           <button className="about-btn"onClick={() => navigate("/about")}>
          <span>О нас</span>
          <div className="btn-overlay"></div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
