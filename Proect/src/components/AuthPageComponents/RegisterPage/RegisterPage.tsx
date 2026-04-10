import React from 'react';
import { motion } from 'framer-motion';
import './RegisterPage.css';
import { useNavigate } from "react-router-dom";
import loginAnimeArt from '../../../assets/images/devushka_tsvetok_plate_876877_1920x1080.jpg';


const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

  return (
    <motion.div 
      className="register-card"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <button className="back-arrow" onClick={() => navigate('/')}>
        <motion.span 
          whileHover={{ x: -4 }} 
          transition={{ type: "spring", stiffness: 400 }}
        >
          ❮
        </motion.span>
        </button>

      <div className="register-form-section">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          登録 <br />
          <span>Create Account</span>
        </motion.h1>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input type="text" placeholder="Full Name" required />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Email Address" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Create Password" required />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.03, backgroundColor: "#ff85a2" }}
            whileTap={{ scale: 0.97 }}
            className="register-button"
          >
            Join the Adventure
          </motion.button>
        </form>

        <div className="footer-links">
          <p>Already have an account? <span className="highlight" onClick={() => navigate("/login")} style={{ cursor: 'pointer' }}>
          Login here
        </span></p>
        </div>
      </div>

      <div className="register-image-section">
        <img 
          src={loginAnimeArt} 
          alt="Anime Register Art" 
          className="anime-art-image-reg" 
        />
        <div className="image-overlay"></div>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
