import React from "react";
import "./AboutUsSection.css";
import aboutVideo from "../../assets/video/naruto.mp4";
import romanPhoto from "../../assets/images/roman.jpg";
import nikitaPhoto from "../../assets/images/nikita.jpg";

const AboutUsSection: React.FC = () => {
  return (
    <main className="aboutus">
      <div className="aboutus-bg">
        <video autoPlay loop muted playsInline>
          <source src={aboutVideo} type="video/mp4" />
        </video>
      </div>

      {/* нижняя панель с карточками */}
      <section className="creators-dock" aria-label="Создатели проекта">
        <div className="aboutus-creators">
          <article className="creator-card">
            <div className="creator-avatar">
              <img src={romanPhoto} alt="Советов Роман" />
            </div>

            <h3 className="creator-title">Советов Роман</h3>
            <div className="creator-role">Site Developer</div>
            <p className="creator-subtitle">
              SI-243 · Технический Университет Молдовы
            </p>

            <a
              className="creator-link"
              href="https://github.com/supercellik1"
              target="_blank"
              rel="noreferrer"
            >
              GitHub: supercellik1
            </a>
          </article>

          <article className="creator-card">
            <div className="creator-avatar">
              <img src={nikitaPhoto} alt="Панасенко Никита" />
            </div>

            <h3 className="creator-title">Панасенко Никита</h3>
            <div className="creator-role">Site Developer</div>
            <p className="creator-subtitle">
              SI-243 · Технический Университет Молдовы
            </p>

            <a
              className="creator-link"
              href="https://github.com/AIVdarksunVIA"
              target="_blank"
              rel="noreferrer"
            >
              GitHub: AIVdarksunVIA
            </a>
          </article>
        </div>
      </section>
    </main>
  );
};

export default AboutUsSection;