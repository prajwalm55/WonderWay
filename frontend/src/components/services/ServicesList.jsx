import React from "react";
import ServicesCard from "./ServicesCard";
import { MdHotel, MdRestaurant } from "react-icons/md";
import { FaPlaneDeparture, FaUmbrellaBeach } from "react-icons/fa";
import { IoMdBus } from "react-icons/io";

const ServicesList = () => {
  const services = [
    { title: "Adventure Tours", description: "Explore thrilling destinations with our guided adventure tours.", icon: <IoMdBus /> },
    { title: "Travel Planning", description: "Let us handle the details! We plan, you enjoy your dream vacation.", icon: <FaPlaneDeparture /> },
    { title: "Luxury Stays", description: "Relax in world-class resorts and comfortable premium accommodations.", icon: <MdHotel /> },
    { title: "Beach Holidays", description: "Relax and unwind on the world's most beautiful beaches.", icon: <FaUmbrellaBeach /> },
    { title: "Gourmet Dining", description: "Savor world-class cuisine at curated restaurants.", icon: <MdRestaurant /> },
  ];

  return (
    <div className="services-container 
                    grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 
                    gap-x-2 gap-y-4 sm:gap-6 mt-4 mb-8 justify-items-center">
      {services.slice(0, 4).map((service, index) => (
        <ServicesCard key={index} service={service} iconColor="#00e676" />
      ))}
    </div>
  );
};

export default ServicesList;
