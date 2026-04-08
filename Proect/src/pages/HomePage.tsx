import React from "react";
import Header from "../components/HomePageComponents/Header/Header";
import Hero from "../components/HomePageComponents/Hero/Hero";
import CountrySection from "../components/HomePageComponents/CountrySection/CountrySection";
import Footer from "../components/HomePageComponents/Footer/Footer";
import japanBg from "../assets/images/japan.jpg";
import italyBg from "../assets/images/italy.jpg";
import franceBg from "../assets/images/france.jpg";

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
    <CountrySection 
        title="Japan 🇯🇵" 
        bgImage={japanBg}
        color="rgba(255, 77, 136, 0.8)"
    />

    <CountrySection 
        title="Italy 🇮🇹" 
        bgImage={italyBg}
        color="#ff7a3d"
    />

    <CountrySection 
        title="France 🇫🇷" 
        bgImage={franceBg}
        color="#4da6ff"
    />
      <Footer />
    </>
  );
};

export default HomePage;
