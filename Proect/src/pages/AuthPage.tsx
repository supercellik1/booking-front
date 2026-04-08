import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginPage from '../components/AuthPageComponents/LoginPage/LoginPage';
import RegisterPage from '../components/AuthPageComponents/RegisterPage/RegisterPage';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-container"> {/* Общий контейнер с сакурой */}
      <AnimatePresence mode="wait">
        {isLogin ? (
          <LoginPage key="login" onSwitch={() => setIsLogin(false)} />
        ) : (
          <RegisterPage key="register" onSwitch={() => setIsLogin(true)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
