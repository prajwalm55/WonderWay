import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import HeroExplore from "../components/Hero/HeroExplore";
import ServicesList from "../components/services/ServicesList";
import FeaturedTourList from "../components/featruredTour/FeaturedTourList";
import FaqList from "../components/Faq/FaqList";
import Testimonials from "../components/Testimonials/Testimonials";
import ImagesGallery from "../components/Gallery/Gallery";
import back4 from "../assets/images/bac4.png";

const HEADER_HEIGHT = 80;
const FOOTER_HEIGHT = 200;

const Home = ({ galleryScrollRef }) => {
  const [scrollY, setScrollY] = useState(0);
  const galleryRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY * 0.2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (galleryScrollRef) {
      galleryScrollRef.current = () => {
        galleryRef.current?.scrollIntoView({ behavior: "smooth" });
      };
    }
  }, [galleryScrollRef]);

  const premiumBackground = {
    background:
      "linear-gradient(145deg, rgba(0,41,31,1), rgba(0,77,47,1), rgba(0,50,35,1))",
    marginTop: "-3px",
    minHeight: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
    position: "relative",
    overflow: "hidden",
  };

  const topFogStyle = {
    background:
      "linear-gradient(to bottom, rgba(0,41,31,0.9), rgba(0,60,40,0.6), rgba(0,77,47,0.3), rgba(0,77,47,0))",
    filter: "blur(2px)",
    opacity: 0.8,
  };

  const fixedBgStyle = {
    backgroundImage: `url(${back4})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    opacity: 0.15,
    filter: "blur(1px)",
  };

  const overlayStyle = {
    background: "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.35))",
    backdropFilter: "blur(2px)",
  };

  const headingStyle = {
    fontFamily: "'Cinzel', serif",
    color: "#e3f7e3",
    lineHeight: "1.2",
  };

  return (
    <div
      style={{
        minHeight: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeroExplore />

      <section
        className="flex flex-col justify-center items-center text-center px-6 md:px-12 py-8"
        style={premiumBackground}
      >
        <div
          className="absolute top-0 left-0 w-full h-16 z-20 pointer-events-none"
          style={topFogStyle}
        ></div>
        <div className="absolute inset-0 z-0" style={fixedBgStyle}></div>
        <div className="absolute inset-0 z-0" style={overlayStyle}></div>

        <div className="text-center mb-4 relative z-20">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-6 text-center"
            style={headingStyle}
          >
            Our <span style={{ color: "#00a86b" }}>Premium Services</span>
          </h2>
          <p
            className="mt-2 text-base md:text-lg lg:text-xl max-w-2xl mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#e3f7e3",
              letterSpacing: "0.5px",
            }}
          >
            Unrivaled services crafted to elevate your travel experience.
          </p>
        </div>

        <div className="relative z-20 w-full flex flex-wrap justify-center gap-6 md:gap-8 mt-4">
          <ServicesList />
        </div>
      </section>

      <section ref={galleryRef} className="w-full m-0 p-0">
        <ImagesGallery />
      </section>

      <section
        className="py-9 px-6 md:px-12 relative"
        style={{
          background:
            "linear-gradient(180deg, #00291F 0%, #004D2F 50%, #003223 100%)",
        }}
        id="tours-section"
      >
        <div className="text-center relative z-20 mb-8">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-6 text-center"
            style={headingStyle}
          >
            Explore <span style={{ color: "#00a86b" }}>Featured Tours</span>
          </h2>
          <p
            className="mt-2 text-base md:text-lg lg:text-xl max-w-2xl mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#e3f7e3",
              letterSpacing: "0.5px",
            }}
          >
            Embark on extraordinary journeys with our handpicked featured tours.
          </p>
        </div>
        <div className="relative z-20 w-full flex flex-wrap justify-center gap-6 md:gap-8 mt-4">
          <FeaturedTourList />
        </div>
      </section>

      <section
        className="flex flex-col justify-center items-center text-center px-6 md:px-12 py-14 relative"
        style={premiumBackground}
      >
        <div
          className="absolute top-0 left-0 w-full h-16 pointer-events-none"
          style={topFogStyle}
        ></div>
        <div className="absolute inset-0 z-0" style={fixedBgStyle}></div>
        <div className="absolute inset-0 z-0" style={overlayStyle}></div>

        <div className="relative z-20 max-w-6xl w-full">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-6 text-center"
            style={headingStyle}
          >
            Our <span style={{ color: "#00a86b" }}>Reviews</span>
          </h2>
          <p
            className="mt-2 text-base md:text-lg lg:text-xl max-w-2xl mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#e3f7e3",
              letterSpacing: "0.5px",
            }}
          >
            Hear from our travelers about their unforgettable experiences with
            WanderWay.
          </p>
          <Testimonials />
        </div>
      </section>

      <FaqList />
    </div>
  );
};

export default Home;
