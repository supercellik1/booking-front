import React from 'react';
import Header from '../components/HomePageComponents/Header/Header';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <div style={{ padding: "120px 20px", color: "white", textAlign: "center" }}>
        <h1>Личный кабинет</h1>
        <div className="profile-info" style={{ background: "#222", padding: "20px", borderRadius: "15px", display: "inline-block" }}>
          <p><strong>Имя:</strong> {user?.fullName || "Не указано"}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>ID пользователя:</strong> {user?.id}</p>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
