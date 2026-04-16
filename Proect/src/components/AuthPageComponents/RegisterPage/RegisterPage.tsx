import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './RegisterPage.css';
import { useNavigate } from "react-router-dom";
import loginAnimeArt from '../../../assets/images/devushka_tsvetok_plate_876877_1920x1080.jpg';
import { authService } from '../../../api/auth/authService';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register(email, password, fullName);
      alert("Account created! Please login.");
      navigate('/login');
    } catch (err) {
      alert("Registration failed");
    }
    };

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

         <form onSubmit={handleRegister}>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Full Name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Create Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="register-button">Join the Adventure</button>
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
