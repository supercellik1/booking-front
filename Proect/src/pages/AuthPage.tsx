import React from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginPage from '../components/AuthPageComponents/LoginPage/LoginPage';
import RegisterPage from '../components/AuthPageComponents/RegisterPage/RegisterPage';

export const LoginScreen: React.FC = () => {
  return (
    <div className="login-container"> 
      <AnimatePresence mode="wait">
      <LoginPage />
      </AnimatePresence>
    </div>
  );
};


export const RegisterScreen: React.FC = () => {
  return (
    <div className="login-container"> 
      <AnimatePresence mode="wait">
      <RegisterPage />
      </AnimatePresence>
    </div>
  );
};

  

