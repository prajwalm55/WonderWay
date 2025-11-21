import React from "react";
import "./ServicesCard.css";

const ServicesCard = ({ service, iconColor }) => {
  return (
    <div
      className="services-card 
                 w-full xs:w-5/6 sm:w-60 md:w-64 
                 h-60 sm:h-60 md:h-64 p-4 sm:p-5 rounded-3xl text-center 
                 bg-gradient-to-br from-black/30 via-black/20 to-black/40
                 backdrop-blur-md border border-green-700/20 
                 transition-all duration-300
                 flex flex-col justify-between items-center
                 hover:scale-105 hover:-translate-y-1"
    >
      <div className="border-overlay hover-border"></div>

      <div
        className="text-2xl xs:text-3xl sm:text-4xl mb-2 xs:mb-3 transition-transform duration-300 hover:scale-110"
        style={{ color: iconColor }}
      >
        {service.icon}
      </div>

      <h3 className="text-green-400 text-sm xs:text-base sm:text-lg font-semibold mb-2">
        {service.title}
      </h3>

      <p className="text-green-100 text-xs xs:text-sm sm:text-sm leading-relaxed">
        {service.description}
      </p>

      <div className="glow-line mt-3 xs:mt-4">
        <span className="animate-glowLine subtle-glow"></span>
      </div>
    </div>
  );
};

export default ServicesCard;
