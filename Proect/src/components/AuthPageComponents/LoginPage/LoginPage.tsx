import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './LoginPage.css';
import loginAnimeArt from '../../../assets/images/devushka_tsvetok_plate_876877_1920x1080.jpg';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import { authService } from '../../../api/auth/authService';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const data = await authService.login(email, password);
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      setPassword('');
      if (!email.includes('@')) {
        setErrorMessage('❗ Email должен содержать символ @');
      } else {
        setErrorMessage('❗ Ошибка авторизации. Проверьте почту и пароль.');
      }

      console.error(err);
    }
  };

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

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          {errorMessage && <p className="login-error">{errorMessage}</p>}

          <motion.button whileTap={{ scale: 0.95 }} className="login-button" type="submit">
            Sign In
          </motion.button>
        </form>

        <div className="footer-links">
          <a href="#">Forgot password?</a>
          <p>
            Don't have an account?{' '}
            <span 
              className="highlight"
              onClick={() => navigate("/register")}
              style={{ cursor: 'pointer' }}
            >
              Join us
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;