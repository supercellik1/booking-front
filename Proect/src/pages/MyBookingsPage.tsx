import React from 'react';
import MyBookingsList from '../components/BookingComponents/MyBookingsList';
import Header from '../components/HomePageComponents/Header/Header';

const MyBookingsPage: React.FC = () => {
  return (
    <div className="main-layout">
      <Header />
      <div className="content-container" style={{ marginTop: '100px', padding: '0 20px' }}>
         <MyBookingsList />
      </div>
    </div>
  );
};

export default MyBookingsPage;
