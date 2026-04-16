import React from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BookingForm from '../components/BookingComponents/BookingPage.tsx';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="login-container"> 
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {id && <BookingForm hotelId={id} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BookingPage;
