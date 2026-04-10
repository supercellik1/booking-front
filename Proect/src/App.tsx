import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, LoginScreen, RegisterScreen, HotelDetailsPage, AboutUsPage } from "./index"; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/hotel/:id" element={<HotelDetailsPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;