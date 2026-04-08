import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, AuthPage, HotelDetailsPage, AboutUsPage } from "./index"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/hotel/:id" element={<HotelDetailsPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;