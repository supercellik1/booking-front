import React from "react";
import Header from "../components/HomePageComponents/Header/Header";
import Footer from "../components/HomePageComponents/Footer/Footer";
import FavouriteComponents from "../components/FavouritesComponents/FavouritesComponents";

const FavouritePage: React.FC = () => {
  return (
    <>
      <Header />
      <FavouriteComponents />
    </>
  );
};

export default FavouritePage;
