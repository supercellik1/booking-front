import React from 'react';
import { motion } from 'framer-motion';
import './LoginPage.css';
import loginAnimeArt from '../../../assets/images/devushka_tsvetok_plate_876877_1920x1080.jpg';
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

  return (
    <motion.div 
      className="login-card"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <button className="back-arrow" onClick={() => navigate('/')}>
  <motion.span 
    whileHover={{ x: -4 }} 
    transition={{ type: "spring", stiffness: 400 }}
  >
    ❮
  </motion.span>
</button>

      <div className="login-image-section">
        <img 
          src={loginAnimeArt} 
          alt="Anime Login Art" 
          className="anime-art-image" 
        />
      </div>

      <div className="login-form-section">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          ログイン <br />
          <span>Welcome Back</span>
        </motion.h1>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input type="text" placeholder="Username" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" required />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#ff85a2" }}
            whileTap={{ scale: 0.95 }}
            className="login-button"
            type="submit"
          >
            Sign In
          </motion.button>
        </form>

        <div className="footer-links">
          <a href="#">Forgot password?</a>
          <p>
            Don't have an account?{' '}
            <span 
          className="highlight" onClick={() => navigate("/register")} style={{ cursor: 'pointer' }}>
          Join us
        </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
