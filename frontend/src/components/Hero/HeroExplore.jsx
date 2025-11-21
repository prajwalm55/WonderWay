import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroExplore.css";

// Background Layers
import back1 from "../../assets/images/bac1.png";
import back2 from "../../assets/images/bac2.png";
import back2_2 from "../../assets/images/bac2.2.png";
import back3 from "../../assets/images/bac3.png";
import back4 from "../../assets/images/bac4.png";

// SearchBar
import SearchBar from "../../shared/searchBar/SearchBar";

const HeroExplore = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-wrapper relative w-full h-screen overflow-hidden pt-20 md:pt-24 flex flex-col justify-center">
      {/* Background Layers */}
      <img src={back4} alt="Sky" className="back-layer back4" />
      <img src={back3} alt="Mountains" className="back-layer back3" />
      <img src={back2_2} alt="Distant Trees" className="back-layer back2_2" />

      {/* Glowing INDIA Title */}
      <div className="title relative text-center z-[5] flex flex-col items-center justify-center">
        <div className="sun-glow"></div>
        <h3
          className="sub-title drop-shadow-lg font-bold"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#dfeae0ff",
          }}
        >
          Discover Incredible Places
        </h3>

        <h1 className="main-title motion-rise text-white">INDIA</h1>
      </div>

     {/* Info Paragraph */}
<div className="info-wrap w-full flex justify-center z-[20] px-4 mt-6">
  <p
    className="text-sm md:text-base w-4/5 text-center animate-info"
    style={{
      fontFamily: "'Lora', serif",
      color: "#e3f7e3",
    }}
  >
    India is a land of diverse landscapes, vibrant culture, and timeless
    heritage. From the snow-covered Himalayas to the golden sands of
    Rajasthan, experience the magic, mystery, and majesty of this
    incredible land.
  </p>
</div>

      {/* SearchBar */}
      <div className="w-full flex justify-center z-[20] px-4 mt-10">
        <div className="max-w-2xl w-full flex justify-center">
          <SearchBar />
        </div>
      </div>

      {/* Foreground Trees */}
      <img src={back2} alt="Closer Trees" className="back-layer back2 z-[6]" />
      <img src={back1} alt="Front Trees" className="back-layer back1 z-[10]" />
    </div>
  );
};

export default HeroExplore;
