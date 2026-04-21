import React from 'react';
import Header from '../components/HomePageComponents/Header/Header';
import { useAuth } from '../context/AuthContext';
import ProfileSection from '../components/ProfileComponents/ProfileSection';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <ProfileSection />
    </>
  );
};

export default ProfilePage;
